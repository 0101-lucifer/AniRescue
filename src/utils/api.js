import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
  // During development, it points to your local Node.js server.
  // In production, it will point to your Render.com backend.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the JWT token if the user is logged in
api.interceptors.request.use(
  (config) => {
    // Check local storage for the token (used by volunteers and NGOs)
    const token = localStorage.getItem('anirescue_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the token is expired/invalid, clear it and redirect to login
      console.warn('Unauthorized: Token expired or invalid.');
      localStorage.removeItem('anirescue_token');
      // window.location.href = '/login'; // Uncomment when login page is built
    }
    return Promise.reject(error);
  }
);

export default api;