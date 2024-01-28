import { done } from "./done";
import { update } from "./update";
import { create } from "./create";
import { getAll } from "./getAll";
import { uncheck } from "./uncheck";
import { deleteTask } from "./delete";

export const tasksService = {
  done,
  getAll,
  create,
  update,
  uncheck,
  delete: deleteTask
}