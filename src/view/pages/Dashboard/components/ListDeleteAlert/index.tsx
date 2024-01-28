import { ForwardedRef, RefObject, forwardRef, useImperativeHandle, useState } from 'react'

import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'

import { useListDeleteAlertController } from './useListDeleteAlertController'

export interface ListDeleteAlertData {
  id: string
  name: string
}

export interface ListDeleteAlertRef {
  open: (data?: ListDeleteAlertData) => void;
  close: () => void;
  getItemData: () => ListDeleteAlertData | null;
}

export const ListDeleteAlert = forwardRef((_, ref: ForwardedRef<ListDeleteAlertRef>) => {
  const [itemData, setItemData] = useState<ListDeleteAlertData | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { handleDelete, isPending } = useListDeleteAlertController(
    ref as RefObject<ListDeleteAlertRef>
  )

  function handleClose() {
    setIsOpen(false);
    setItemData(null);
  }

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) setItemData(data);
      setIsOpen(true);
    },
    close: () => handleClose(),
    getItemData: () => itemData,
  }))

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content>
        <Dialog.Body>
          <img src="/error.gif" />

          <Dialog.Title>Deseja excluir a lista "{itemData?.name}"?</Dialog.Title>

          <Dialog.Description>
            Ao excluir, todas as informações relacionadas a esta lista serão perdidas.
          </Dialog.Description>
        </Dialog.Body>

        <Dialog.Footer>
          <Dialog.Cancel>Cancelar</Dialog.Cancel>
          <Dialog.Submit
            className="flex items-center justify-center"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()
              handleDelete(itemData?.id as string)
            }}
          >
            {isPending ? <Spinner className='w-6 h-6' /> : 'Excluir'}
          </Dialog.Submit>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
})