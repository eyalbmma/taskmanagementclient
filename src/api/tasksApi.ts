import axiosInstance from './axiosInstance';
import { ProcurementData } from '../models/ProcurementData';
import { DevelopmentData } from '../models/DevelopmentData';
import { Task } from '../models/Task';

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get('/api/tasks');
  return response.data;
};

export const fetchTasksForUser = async (userId: number): Promise<Task[]> => {
  const response = await axiosInstance.get(`/api/users/${userId}/tasks/simple`);
  return response.data;
};

export const createTask = async (taskType: string, assignedUserId: number) => {
  const response = await axiosInstance.post('/api/tasks', {
    taskType,
    assignedUserId,
  });
  return response.data;
};
export const changeTaskStatus = async (
  taskId: number,
  nextStatus: number,
  newUserId: number
): Promise<void> => {
  await axiosInstance.post(`/api/tasks/${taskId}/change-status`, null, {
    params: {
      nextStatus,
      newUserId,
    },
  });
};



// סגירת משימה
export const closeTask = async (taskId: number): Promise<void> => {
  await axiosInstance.post(`/api/tasks/${taskId}/close`);
};

// שליפת משימה בודדת לפי מזהה
export const getTaskById = async (taskId: number): Promise<Task> => {
  const response = await axiosInstance.get<Task>(`/api/tasks/${taskId}`);
  return response.data;
};

// שמירת פרטי רכש
export const saveProcurementData = async (
  taskId: number,
  data: ProcurementData
): Promise<void> => {
  await axiosInstance.put(`/api/tasks/${taskId}/data/procurement`, data);
};

// שמירת פרטי פיתוח
export const saveDevelopmentData = async (
  taskId: number,
  data: DevelopmentData
): Promise<void> => {
  await axiosInstance.put(`/api/tasks/${taskId}/data/development`, data);
};