import { useEffect, useRef, useState } from "react";
import debounce from 'lodash.debounce'
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listsService } from "../../../app/services/listsService";

import { ListDeleteAlertRef, ListDeleteAlertData } from "./components/ListDeleteAlert";
import { ListFormModalRef, ListFormModalData } from "./components/ListFormModal";

export function useDashboardController() {
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState({ page: 1, name: '' });

  const listDeleteAlertRef = useRef<ListDeleteAlertRef>(null);
  const listFormModalRef = useRef<ListFormModalRef>(null);

  const { isFetching, data, isLoading, isRefetching } = useQuery({
    queryKey: ['lists', params],
    queryFn: async () => listsService.getAll(params),
    placeholderData: keepPreviousData,
    retry: 2,
  });

  function handleCreate() {
    listFormModalRef.current?.open();
  }

  function handleEdit(listData: ListFormModalData) {
    listFormModalRef.current?.open(listData);
  }

  function handleDelete(listData: ListDeleteAlertData) {
    listDeleteAlertRef.current?.open(listData);
  }

  useEffect(() => {
    const debouncedSave = debounce(() => {
      setParams({ page: 1, name: searchTerm })
    }, 500)

    debouncedSave()

    return debouncedSave.cancel
  }, [searchTerm])

  return { 
    items: data?.items || [],
    pagination: {
      total: data?.pagination.total || 0,
      perPage: data?.pagination.perPage || 8,
      page: params.page,
    },
    isRefetching,
    isFetching,
    isLoading,
    listDeleteAlertRef,
    listFormModalRef,
    searchTerm,
    handleCreate,
    handleEdit,
    handleDelete,
    setSearchTerm,
    setParams,
  };
}