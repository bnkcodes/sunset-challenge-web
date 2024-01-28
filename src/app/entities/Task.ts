export interface Task {
  id: string;
  columnId?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string;
}