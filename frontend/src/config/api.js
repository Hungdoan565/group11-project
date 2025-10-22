export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  users: `${API_URL}/users`,
  user: (id) => `${API_URL}/users/${id}`,
};
