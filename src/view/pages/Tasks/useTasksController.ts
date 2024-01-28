import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { QueryClient, keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import debounce from 'lodash.debounce'

import { tasksService } from "../../../app/services/tasksService";
import { requestError } from "../../../app/utils/requestError";
import { Task } from "../../../app/entities/Task";

import { TaskDeleteAlertRef, TaskDeleteAlertData } from "./components/TaskDeleteAlert";
import { TaskFormModalRef, TaskFormModalData } from "./components/TaskFormModal";

export function useTasksController() {
  const { id: columnId } = useParams();

  const queryClient = new QueryClient();

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
  });

  const { mutate: uncheckMutate } = useMutation({
    mutationFn: async (id: string) => tasksService.uncheck(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', params] }),
  });

  const { mutate: doneMutate } = useMutation({
    mutationFn: async (id: string) => tasksService.done(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', params] }),
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

  function handleChangeStatus({ id, isCompleted }: Partial<Task>) {
    const type = isCompleted ? 'uncheck' : 'done';
    
    const actions = {
      uncheck: () => uncheckMutate(id as string, {
        onError: (error) => requestError(error)
      }),

      done: () => doneMutate(id as string, {
        onError: (error) => requestError(error)
      }),
    }

    actions[type]()
  }

  useEffect(() => {
    const debouncedSave = debounce(() => {
      setParams((prevState) => ({ ...prevState, page: 1, name: searchTerm }))
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
    handleChangeStatus,
    handleDelete,
    setSearchTerm,
    setParams,
  };
}