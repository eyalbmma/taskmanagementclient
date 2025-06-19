import { Task } from './Task';

export interface User {
  id: number;
  fullName: string;
  assignedTasks?: Task[];
}
