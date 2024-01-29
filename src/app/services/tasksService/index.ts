import { done } from "./done";
import { update } from "./update";
import { create } from "./create";
import { getAll } from "./getAll";
import { undone } from "./undone";
import { deleteTask } from "./delete";

export const tasksService = {
  done,
  getAll,
  create,
  update,
  undone,
  delete: deleteTask
}