import { ForwardedRef, RefObject, forwardRef, useImperativeHandle, useState } from 'react'

import { Input } from '../../../../components/Input'
import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'
import PasswordChecker from '../../../../components/PasswordChecker';

import { useChangePasswordFormController } from './useChangePasswordFormController'

export interface ChangePasswordFormModalRef {
  open: () => void;
  close: () => void;
}

export const ChangePasswordFormModal = forwardRef((_, ref: ForwardedRef<ChangePasswordFormModalRef>) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    errors,
    isPending,
    watch,
    reset,
    register,
    handleSubmit,
  } = useChangePasswordFormController(
    ref as RefObject<ChangePasswordFormModalRef>
  )

  function handleClose() {
    setIsOpen(false);
    reset();
  }

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => handleClose(),
  }))

  const password = watch('password');

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content >
        <Dialog.Body className='justify-start items-start pt-0'>
          <Dialog.Title>Alterar senha</Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 w-full"
          >
            <Input
              type="password"
              placeholder="Senha atual"
              error={errors.oldPassword?.message}
              {...register('oldPassword')}
            />

            <Input
              type="password"
              placeholder="Nova senha"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              type="password"
              placeholder="Confirmar senha"
              error={errors.passwordConfirmation?.message}
              {...register('passwordConfirmation')}
            />

            <PasswordChecker
              password={password ?? ''}
              className='mt-4'
            />

            <Dialog.Footer>
              <Dialog.Cancel>Cancelar</Dialog.Cancel>
              <Dialog.Submit
                type='submit'
                className="flex items-center justify-center bg-green-500 hover:bg-green-600"
                disabled={isPending}
              >
                {isPending ? <Spinner className='w-6 h-6' /> : 'Salvar'}
              </Dialog.Submit>
            </Dialog.Footer>
          </form>
        </Dialog.Body> 
      </Dialog.Content>
    </Dialog.Root>
  )
})