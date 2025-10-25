export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Users (admin)
  users: `${API_URL}/users`,
  user: (id) => `${API_URL}/users/${id}`,
  
  // Auth
  signup: `${API_URL}/auth/signup`,
  login: `${API_URL}/auth/login`,
  logout: `${API_URL}/auth/logout`,
  forgotPassword: `${API_URL}/auth/forgot-password`,
  resetPassword: `${API_URL}/auth/reset-password`,

  // Profile
  profile: `${API_URL}/profile`,

  // Upload
  uploadAvatar: `${API_URL}/upload/avatar`,
};
