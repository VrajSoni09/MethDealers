# Rail Complaint System - Database Integration

This document explains how to set up and run the Rail Complaint System with database integration and user authentication.

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
cd c:\HACK\rail-complaint-system
npm install --prefix . --save
```

### 2. Install Backend Server Dependencies
```bash
npm install express cors sqlite3 bcryptjs jsonwebtoken express-validator
npm install --save-dev nodemon
```

Or use the provided package file:
```bash
cp package-server.json package.json
npm install
```

### 3. Start Backend Server
```bash
node server.js
```

The server will start on `http://localhost:5000` and create a SQLite database file `rail_complaints.db`.

### 4. Start Frontend
```bash
npm start
```

The frontend will start on `http://localhost:3001` and connect to the backend API.

## 📁 Database Structure

### Users Table
- `id` - Primary key
- `email` - User email (unique)
- `password` - Hashed password
- `name` - User name
- `created_at` - Registration timestamp

### Complaints Table
- `id` - Complaint ID (string)
- `user_id` - Foreign key to users table
- `text` - Complaint text
- `category` - Predicted category
- `final_category` - Final AI category
- `severity` - Severity level
- `priority_flag` - Priority (HIGH/MEDIUM/LOW)
- `confidence` - Overall confidence
- `confidence_category` - Category confidence
- `confidence_severity` - Severity confidence
- `location` - Location text
- `coordinates` - GPS coordinates (JSON)
- `zone` - Railway zone
- `trainNo` - Train number
- `timestamp` - Creation timestamp
- `aiAnalysis` - Full AI response (JSON)

## 🔐 Authentication System

### User Registration
- **Endpoint**: `POST /api/register`
- **Required Fields**: `email`, `password`, `name`
- **Password Requirements**: Minimum 6 characters
- **Response**: User ID and success message

### User Login
- **Endpoint**: `POST /api/login`
- **Required Fields**: `email`, `password`
- **Response**: JWT token and user data
- **Token Expiry**: 24 hours

### Protected Routes
All API endpoints require JWT token in `Authorization: Bearer <token>` header.

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Complaints (Protected)
- `GET /api/complaints` - Get user's complaints
- `POST /api/complaints` - Save new complaint
- `GET /api/complaints/:id` - Get specific complaint
- `GET /api/stats` - Get user statistics

## 🔄 Data Flow

### 1. User Registration/Login
```
User → Login Page → API → JWT Token → Local Storage
```

### 2. Complaint Submission
```
Input Page → AI API → Database → Output Page
```

### 3. Data Retrieval
```
Dashboard/Complaints Page → API → Database → Display
```

## 🛡️ Security Features

### Password Security
- Passwords hashed with bcryptjs (salt rounds: 10)
- Minimum password length: 6 characters

### JWT Authentication
- Secure token generation
- 24-hour token expiry
- Token verification on all protected routes

### Data Isolation
- Each user can only access their own complaints
- User ID filtering on all database queries
- No cross-user data access

## 🔧 Configuration

### Environment Variables
```bash
# Backend
JWT_SECRET=your-secret-key-change-in-production

# Frontend (optional)
REACT_APP_API_URL=http://localhost:5000/api
```

### Default Configuration
- **Backend Port**: 5000
- **Frontend Port**: 3001
- **Database**: SQLite (rail_complaints.db)
- **CORS**: Enabled for frontend

## 🚨 Troubleshooting

### Common Issues

#### 1. Backend Won't Start
```bash
# Check if Node.js is installed
node --version

# Install missing dependencies
npm install

# Check port availability
netstat -an | findstr :5000
```

#### 2. Database Connection Error
```bash
# Check database file permissions
ls -la rail_complaints.db

# Recreate database
rm rail_complaints.db
node server.js
```

#### 3. Frontend Can't Connect to Backend
```bash
# Check if backend is running
curl http://localhost:5000/api

# Check CORS settings
# Verify backend allows frontend origin
```

#### 4. Login Issues
```bash
# Check user exists in database
sqlite3 rail_complaints.db "SELECT * FROM users WHERE email='test@example.com'"

# Verify JWT secret matches
# Check console for token verification errors
```

## 📝️ Development Notes

### Database Migrations
The database is automatically created on first server start. Tables are created with `IF NOT EXISTS` to prevent errors.

### API Error Handling
- All endpoints return proper HTTP status codes
- Error messages include descriptive details
- Frontend handles authentication failures gracefully

### Fallback Behavior
- If API fails, frontend falls back to localStorage
- Mock data provided for demonstration purposes
- Graceful degradation of functionality

## 🔄 Migration from localStorage

### Existing Data
The system maintains backward compatibility:
1. New data goes to database
2. Old localStorage data still accessible
3. Gradual migration of existing users
4. Fallback to localStorage if API unavailable

### Data Sync
- Complaints submitted via API are stored in database
- Dashboard loads from database API
- Output page fetches from database
- User-specific data isolation maintained

## 🎯 Next Steps

### Production Deployment
1. Change JWT_SECRET to a secure random string
2. Use HTTPS in production
3. Set up proper database backups
4. Configure environment variables
5. Set up monitoring and logging

### Features to Add
- Email verification for registration
- Password reset functionality
- User profile management
- Admin dashboard
- Export functionality
- Advanced filtering and search
