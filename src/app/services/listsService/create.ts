import { List } from "../../entities/List";
import { httpClient } from "../httpClient";

export interface CreateParams {
  name: string;
  color?: string;
}

export async function create(data: CreateParams) {
  await httpClient.post<List>('/lists/', data);
}
