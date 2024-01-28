import { httpClient } from "../httpClient";

export interface IUpdatePassword {
  oldPassword: string
  password: string
  passwordConfirmation: string
}

export async function updatePassword(payload: IUpdatePassword) {
  await httpClient.patch<void>('/users/me/update-password', payload);
}
