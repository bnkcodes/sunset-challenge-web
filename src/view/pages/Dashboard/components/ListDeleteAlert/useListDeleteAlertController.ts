import { RefObject } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { listsService } from '../../../../../app/services/listsService'
import { requestError } from '../../../../../app/utils/requestError'

import { ListDeleteAlertRef } from '.'

export function useListDeleteAlertController(ref: RefObject<ListDeleteAlertRef>) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => listsService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists'] }),
  })

  function handleDelete(id: string) {
    mutate(id, {
      onSuccess: () => {
        ref.current?.close()
        toast.success('Lista deletada com sucesso')
      },
      onError: (error) => requestError(error),
    })
  }

  return { handleDelete, isPending }
}