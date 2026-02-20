// ─── API Service Layer (for backend integration) ──────────────────────────────
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Authentication endpoints
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  }

  async register(email, password, name) {
    const response = await fetch(`${this.baseURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return response.json();
  }

  async getUserProfile() {
    const response = await fetch(`${this.baseURL}/profile`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user profile');
    }
    
    return response.json();
  }

  // Complaint endpoints
  async getComplaints() {
    const response = await fetch(`${this.baseURL}/complaints`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    
    return response.json();
  }

  async saveComplaint(complaintData) {
    const response = await fetch(`${this.baseURL}/complaints`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(complaintData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save complaint');
    }
    
    return response.json();
  }

  async getComplaint(id) {
    const response = await fetch(`${this.baseURL}/complaints/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch complaint');
    }
    
    return response.json();
  }

  async getStats() {
    const response = await fetch(`${this.baseURL}/stats`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    return response.json();
  }

  // Legacy methods for compatibility
  async getComplaintAnalysis(complaintId) {
    return this.getComplaint(complaintId);
  }
}

export const apiService = new ApiService();
export default apiService;
