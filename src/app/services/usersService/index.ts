import { me } from "./me";
import { uploadImage } from "./uploadImage";
import { deleteImage } from "./deleteImage";
import { update } from "./update";
import { updatePassword } from "./updatePassword"
import { deleteProfile } from "./delete";

export const usersService = {
  me,
  update,
  deleteProfile,
  uploadImage,
  updatePassword,
  deleteImage
}