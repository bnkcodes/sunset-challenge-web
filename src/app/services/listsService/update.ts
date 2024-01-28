import { List } from "../../entities/List";
import { httpClient } from "../httpClient";

export interface UpdateParams {
  name: string;
  color?: string;
}

export async function update(id: string, data: UpdateParams) {
  await httpClient.put<List>(`/columns/${id}`, data);
}
