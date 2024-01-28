import { httpClient } from "../httpClient";

export async function deleteTask(id: string) {
  await httpClient.delete(`/tasks/${id}`);
}
