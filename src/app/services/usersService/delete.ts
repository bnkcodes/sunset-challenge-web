import { httpClient } from "../httpClient";

export async function deleteProfile() {
  await httpClient.delete<void>('/users/me');
}
