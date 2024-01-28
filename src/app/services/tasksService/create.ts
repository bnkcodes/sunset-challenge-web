import { List } from "../../entities/List";
import { httpClient } from "../httpClient";

export interface CreateTaskParams {
  title: string;
  columnId: string;
  description?: string;
}

export async function create(data: CreateTaskParams) {
  await httpClient.post<List>('/tasks', data);
}
