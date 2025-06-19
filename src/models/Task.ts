import { ProcurementData } from './ProcurementData';
import { DevelopmentData } from './DevelopmentData';
import { User } from './User';

export interface Task {
  id: number;
  taskType: string;
  status: number;
  isClosed: boolean;

  assignedUserId: number;
  assignedUser?: User;

  procurementData?: ProcurementData;
  developmentData?: DevelopmentData;
}
