import { getAll } from "./getAll";
import { create } from "./create";
import { update } from "./update";
import { deleteList } from "./delete";

export const listsService = {
  getAll,
  create,
  update,
  delete: deleteList
}