import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const loadTokenFromStorage = () => {
  const token = localStorage.getItem('token');
  if (token) setAuthToken(token);
  return token;
};

export const signup = async (payload) => {
  const res = await axios.post(API_ENDPOINTS.signup, payload);
  const { token, user } = res.data;
  setAuthToken(token);
  return { token, user };
};

export const login = async (payload) => {
  const res = await axios.post(API_ENDPOINTS.login, payload);
  const { token, user } = res.data;
  setAuthToken(token);
  return { token, user };
};

export const logout = async () => {
  try { await axios.post(API_ENDPOINTS.logout); } catch (_) {}
  setAuthToken(null);
};

export const getProfile = async () => {
  const res = await axios.get(API_ENDPOINTS.profile);
  return res.data;
};

export const updateProfile = async (payload) => {
  const res = await axios.put(API_ENDPOINTS.profile, payload);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(API_ENDPOINTS.forgotPassword, { email });
  return res.data; // { message, resetToken }
};

export const resetPassword = async (token, password) => {
  const res = await axios.post(API_ENDPOINTS.resetPassword, { token, password });
  return res.data;
};

export const uploadAvatar = async (file) => {
  const fd = new FormData();
  fd.append('avatar', file);
  const res = await axios.post(API_ENDPOINTS.uploadAvatar, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data; // { url }
};
