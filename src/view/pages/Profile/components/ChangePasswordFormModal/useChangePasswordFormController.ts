import { RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { passwordValidation } from '../../../../../app/utils/passwordValidation'
import { usersService } from '../../../../../app/services/usersService'
import { requestError } from '../../../../../app/utils/requestError'

import { ChangePasswordFormModalRef } from '.'

const schema = z.object({
  oldPassword: z.string().min(1, 'Senha atual é obrigatória'),
  password: passwordValidation,
  passwordConfirmation: z.string({ required_error: 'Confirmação de senha obrigatória.' }),
})
.refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'As senhas precisam ser iguais.',
    path: ['passwordConfirmation'],
})

type FormData = z.infer<typeof schema>;

export function useChangePasswordFormController(ref: RefObject<ChangePasswordFormModalRef>) {
  const {
    watch,
    reset,
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => usersService.updatePassword(data),
  });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success('Senha alterada com sucesso.');
        ref.current?.close();
      },
      onError: (error) => requestError(error),
    })
  })

  return {
    errors,
    isPending,
    handleSubmit,
    register,
    reset,
    watch,
  }
}