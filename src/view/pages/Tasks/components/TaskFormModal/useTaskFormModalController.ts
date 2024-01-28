import { RefObject } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { requestError } from '../../../../../app/utils/requestError'
import { tasksService } from '../../../../../app/services/tasksService'
import { CreateTaskParams } from '../../../../../app/services/tasksService/create'
import { UpdateTaskParams } from '../../../../../app/services/tasksService/update'

import { TaskFormModalRef } from '.'

const schema = z.object({
  title: z.string().min(1, 'Titulo é obrigatório'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>;

interface UpdateListMutation {
  id: string;
  data: UpdateTaskParams;
}

export function useTaskFormModalController(ref: RefObject<TaskFormModalRef>) {
  const { id: columnId } = useParams();

  const queryClient = useQueryClient()
  
  const {
    reset,
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });

  const {
    mutate: createMutate,
    isPending: createIsPending
  } = useMutation({
    mutationFn: async (data: CreateTaskParams) => tasksService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const {
    mutate: updateMutate,
    isPending: updateIsPending
  } = useMutation({
    mutationFn: async (payload: UpdateListMutation) => {
      return tasksService.update(payload.id, payload.data)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    const itemId = ref.current?.getItemData()?.id;

    const type = itemId ? 'edit' : 'create';
    
    const actions = {
      create: () => createMutate({ ...formData, columnId: columnId as string }, {
        onSuccess: () => {
          toast.success('Tarefa editada com sucesso.');
          ref.current?.close();
        },

        onError: (error) => requestError(error),
      }),
      
      edit: () => updateMutate({
        id: itemId as string,
        data: formData
      }, {
        onSuccess: () => {
          toast.success('Tarefa editada com sucesso.');
          ref.current?.close();
        },

        onError: (error) => requestError(error),
      }),
    }

    actions[type]()
  })

  return {
    errors,
    isPending: createIsPending || updateIsPending,
    handleSubmit,
    register,
    reset,
  }
}