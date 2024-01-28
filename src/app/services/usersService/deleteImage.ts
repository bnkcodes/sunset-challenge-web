import { httpClient } from "../httpClient";

import { User } from "../../entities/User";

export async function deleteImage() {
  const { data } = await httpClient.patch<User>('/users/me/delete-image');

  return data;
}

