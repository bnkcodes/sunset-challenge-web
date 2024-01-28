import { httpClient } from "../httpClient";

import { User } from "../../entities/User";

export async function uploadImage(payload: FormData) {
  const { data } = await httpClient.patch<User>('/users/me/upload-image', payload);

  return data;
}

