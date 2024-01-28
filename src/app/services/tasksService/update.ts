import { Task } from "../../entities/Task";
import { httpClient } from "../httpClient";

export interface UpdateTaskParams {
  title: string;
  description?: string;
}

export async function update(id: string, data: UpdateTaskParams) {
  return await httpClient.put<Task>(`/tasks/${id}`, data);
}
