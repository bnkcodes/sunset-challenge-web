export interface Task {
  id: string;
  listId?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string;
}