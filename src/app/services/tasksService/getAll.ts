import { Task } from "../../entities/Task";
import { Pagonation } from "../../types/Pagination";
import { httpClient } from "../httpClient";

interface GetAllTasksProps {
  title?: string;
  listId: string;
  page?: number;
  perPage?: number;
  orderBy?: string;
}

export interface GetAllTasksResponse {
  items: Task[];
  pagination: Pagonation
}

export async function getAll({ title, listId, page, perPage }: GetAllTasksProps) {
  const { data } = await httpClient.get<GetAllTasksResponse>('/tasks', {
    params: {
      listId,
      title,
      page,
      perPage
    }
  });
  
  return {
    items: data.items || [],
    pagination: {
      perPage: data.pagination.perPage || 12,
      page: data.pagination.page || 1,
      total: data.pagination.total || 0, 
    },
  };
}
