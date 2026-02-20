const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./rail_complaints.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Complaints table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaints (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      category TEXT NOT NULL,
      final_category TEXT,
      severity TEXT NOT NULL,
      priority_flag TEXT,
      confidence REAL,
      confidence_category REAL,
      confidence_severity REAL,
      location TEXT,
      coordinates TEXT,
      zone TEXT,
      trainNo TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      aiAnalysis TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Auth Routes
app.post('/api/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim()
], validateRequest, async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (row) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password and create user
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing password' });
        }

        db.run(
          'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
          [email, hashedPassword, name],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Error creating user' });
            }
            res.status(201).json({ 
              message: 'User created successfully',
              userId: this.lastID 
            });
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], validateRequest, (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing password' });
      }
      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    });
  });
});

// Complaint Routes (protected)
app.get('/api/complaints', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  
  db.all(
    'SELECT * FROM complaints WHERE user_id = ? ORDER BY timestamp DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Parse aiAnalysis from JSON string
      const complaints = rows.map(row => ({
        ...row,
        aiAnalysis: row.aiAnalysis ? JSON.parse(row.aiAnalysis) : null,
        coordinates: row.coordinates ? JSON.parse(row.coordinates) : null
      }));
      
      res.json(complaints);
    }
  );
});

app.post('/api/complaints', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const complaintData = {
    ...req.body,
    user_id: userId,
    coordinates: req.body.coordinates ? JSON.stringify(req.body.coordinates) : null,
    aiAnalysis: req.body.aiAnalysis ? JSON.stringify(req.body.aiAnalysis) : null
  };

  db.run(
    `INSERT INTO complaints (
      id, user_id, text, category, final_category, severity, priority_flag,
      confidence, confidence_category, confidence_severity, location, coordinates,
      zone, trainNo, timestamp, aiAnalysis
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      complaintData.id,
      complaintData.user_id,
      complaintData.text,
      complaintData.category,
      complaintData.final_category,
      complaintData.severity,
      complaintData.priority_flag,
      complaintData.confidence,
      complaintData.confidence_category,
      complaintData.confidence_severity,
      complaintData.location,
      complaintData.coordinates,
      complaintData.zone,
      complaintData.trainNo,
      complaintData.timestamp,
      complaintData.aiAnalysis
    ],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error saving complaint' });
      }
      res.status(201).json({ 
        message: 'Complaint saved successfully',
        complaintId: complaintData.id 
      });
    }
  );
});

app.get('/api/complaints/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const complaintId = req.params.id;

  db.get(
    'SELECT * FROM complaints WHERE id = ? AND user_id = ?',
    [complaintId, userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Complaint not found' });
      }

      const complaint = {
        ...row,
        aiAnalysis: row.aiAnalysis ? JSON.parse(row.aiAnalysis) : null,
        coordinates: row.coordinates ? JSON.parse(row.coordinates) : null
      };

      res.json(complaint);
    }
  );
});

// Get user stats
app.get('/api/stats', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  db.all(
    `SELECT 
      COUNT(*) as totalComplaints,
      COUNT(CASE WHEN severity = 'High' THEN 1 END) as highSeverity,
      COUNT(CASE WHEN severity = 'Medium' THEN 1 END) as mediumSeverity,
      COUNT(CASE WHEN severity = 'Low' THEN 1 END) as lowSeverity,
      COUNT(CASE WHEN DATE(timestamp) = DATE('now') THEN 1 END) as todayComplaints
    FROM complaints WHERE user_id = ?`,
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(row[0]);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
