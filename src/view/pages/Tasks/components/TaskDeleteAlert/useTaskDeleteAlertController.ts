import { RefObject } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { requestError } from '../../../../../app/utils/requestError'
import { tasksService } from '../../../../../app/services/tasksService'

import { TaskDeleteAlertRef } from '.'

export function useTaskDeleteAlertController(ref: RefObject<TaskDeleteAlertRef>) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => tasksService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  })

  function handleDelete(id: string) {
    mutate(id, {
      onSuccess: () => {
        ref.current?.close()
        toast.success('Tarefa deletada com sucesso')
      },
      onError: (error) => requestError(error),
    })
  }

  return { handleDelete, isPending }
}