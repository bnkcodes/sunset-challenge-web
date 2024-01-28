import { httpClient } from "../httpClient";

import { User } from "../../entities/User";

export interface IUpdateProfile {
  name: string
  email: string
  phone: string | null
}

export async function update(payload: IUpdateProfile) {
  const { data } = await httpClient.put<User>('/users/me', payload);

  return data;
}
