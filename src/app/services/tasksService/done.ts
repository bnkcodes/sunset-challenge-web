import { Task } from "../../entities/Task";
import { httpClient } from "../httpClient";

export async function done(id: string) {
  return await httpClient.patch<Task>(`/tasks/${id}/done`);
}
