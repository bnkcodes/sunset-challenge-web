import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'

import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'

import { useDeleteAccountAlertController } from './useDeleteAccountAlertController'

export interface DeleteAccountAlertRef {
  open: () => void;
  close: () => void;
}

export const DeleteAccountAlert = forwardRef((_, ref: ForwardedRef<DeleteAccountAlertRef>) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    isPending,
    handleDelete,
  } = useDeleteAccountAlertController()

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }))

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Content>
        <Dialog.Body>
          <img src="/error.gif" />

          <Dialog.Title>Deseja excluir sua conta?</Dialog.Title>

          <Dialog.Description>
            Ao excluir, todas as informações relacionadas a sua conta serão perdidas e essa ação não poderá ser desfeita.
          </Dialog.Description>
        </Dialog.Body>

        <Dialog.Footer>
          <Dialog.Cancel>Cancelar</Dialog.Cancel>
          <Dialog.Submit
            className="flex items-center justify-center"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
          >
            {isPending ? <Spinner className='w-6 h-6' /> : 'Excluir'}
          </Dialog.Submit>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
})