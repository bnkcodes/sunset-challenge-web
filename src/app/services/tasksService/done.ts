import { Task } from "../../entities/Task";
import { httpClient } from "../httpClient";

export async function done(id: string) {
  const { data } = await httpClient.patch<Task | void>(`/tasks/${id}/done`);
  
  return data;
}
