import { Task } from "../../entities/Task";
import { httpClient } from "../httpClient";

export async function uncheck(id: string) {
  const { data } = await httpClient.patch<Task | void>(`/tasks/${id}/uncheck`);
  
  return data
}
