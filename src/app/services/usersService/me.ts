import { httpClient } from "../httpClient";

import { User } from "../../entities/User";

export async function me() {
  const { data } = await httpClient.get<User>('/users/me');

  return data;
}
