import { ForwardedRef, RefObject, forwardRef, useImperativeHandle, useState } from 'react'

import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'

import { useTaskDeleteAlertController } from './useTaskDeleteAlertController'

export interface TaskDeleteAlertData {
  id: string
  title: string
}

export interface TaskDeleteAlertRef {
  open: (data?: TaskDeleteAlertData) => void;
  close: () => void;
  getItemData: () => TaskDeleteAlertData | null;
}

export const TaskDeleteAlert = forwardRef((_, ref: ForwardedRef<TaskDeleteAlertRef>) => {
  const [itemData, setItemData] = useState<TaskDeleteAlertData | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { handleDelete, isPending } = useTaskDeleteAlertController(
    ref as RefObject<TaskDeleteAlertRef>
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

          <Dialog.Title>Deseja excluir a tarefa "{itemData?.title}"?</Dialog.Title>

          <Dialog.Description>
            Ao deletar, essa ação não podera ser desfeita.
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