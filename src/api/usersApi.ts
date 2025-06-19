import axiosInstance from './axiosInstance';
import { User } from '../models/User';

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
};

export const fetchUserTasks = async (userId: number) => {
  const response = await axiosInstance.get(`/api/users/${userId}/tasks`);
  return response.data;
};
