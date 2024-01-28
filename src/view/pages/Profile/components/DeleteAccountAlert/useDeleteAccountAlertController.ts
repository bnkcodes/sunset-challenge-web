import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { usersService } from '../../../../../app/services/usersService'
import { requestError } from '../../../../../app/utils/requestError'
import { useAuth } from '../../../../../app/hooks/useAuth'

export function useDeleteAccountAlertController() {
  const { signout } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => usersService.deleteProfile(),
  })

  function handleDelete() {
    mutate(undefined, {
      onSuccess: () => {
        signout()
        toast.success('Sua conta foi excluída com sucesso.')
      },
      onError: (error) => requestError(error),
    })
  }

  return { handleDelete, isPending }
}