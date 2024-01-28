import { List } from "../../entities/List";
import { Pagonation } from "../../types/Pagination";
import { httpClient } from "../httpClient";

interface GetAllListsProps {
  name?: string;
  page?: number;
  perPage?: number;
  orderBy?: string;
}

export interface GetAllListsResponse {
  items: List[];
  pagination: Pagonation
}

export async function getAll({ name, page, perPage }: GetAllListsProps) {
  const { data } = await httpClient.get<GetAllListsResponse>('/columns', {
    params: {
      name,
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
