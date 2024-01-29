import { Task } from "../../entities/Task";
import { httpClient } from "../httpClient";

export async function undone(id: string) {
  const { data } = await httpClient.patch<Task | void>(`/tasks/${id}/undone`);
  
  return data
}
