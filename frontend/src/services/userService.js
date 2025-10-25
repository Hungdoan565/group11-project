import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const getUsers = async () => {
  const res = await axios.get(API_ENDPOINTS.users);
  return res.data;
};

export const createUser = async (payload) => {
  const res = await axios.post(API_ENDPOINTS.users, payload);
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await axios.put(API_ENDPOINTS.user(id), payload);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(API_ENDPOINTS.user(id));
  return res.data;
};
