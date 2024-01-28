import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from 'lodash.debounce'

import { tasksService } from "../../../app/services/tasksService";

import { TaskDeleteAlertRef, TaskDeleteAlertData } from "./components/TaskDeleteAlert";
import { TaskFormModalRef, TaskFormModalData } from "./components/TaskFormModal";

export function useTasksController() {
  const { id: columnId } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState({
    page: 1,
    title: '',
    columnId: columnId as string
   });

  const taskDeleteAlertRef = useRef<TaskDeleteAlertRef>(null);
  const taskFormModalRef = useRef<TaskFormModalRef>(null);

  const { isFetching, data, isLoading, isRefetching } = useQuery({
    queryKey: ['tasks', params],
    queryFn: async () => tasksService.getAll(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  function handleCreate() {
    taskFormModalRef.current?.open();
  }

  function handleEdit(taskData: TaskFormModalData) {
    taskFormModalRef.current?.open(taskData);
  }

  function handleDelete(taskData: TaskDeleteAlertData) {
    taskDeleteAlertRef.current?.open(taskData);
  }

  useEffect(() => {
    const debouncedSave = debounce(() => {
      setParams((prevState) => ({ ...prevState, page: 1, title: searchTerm }))
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
    taskDeleteAlertRef,
    taskFormModalRef,
    searchTerm,
    handleCreate,
    handleEdit,
    handleDelete,
    setSearchTerm,
    setParams,
  };
}