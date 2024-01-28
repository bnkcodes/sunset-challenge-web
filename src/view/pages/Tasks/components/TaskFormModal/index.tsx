import { ForwardedRef, RefObject, forwardRef, useImperativeHandle, useState } from 'react'

import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'

import { useTaskFormModalController } from './useTaskFormModalController'
import { Input } from '../../../../components/Input'
import { Textarea } from '../../../../components/Textarea'

export interface TaskFormModalData {
  id?: string
  title: string
  description: string
}

export interface TaskFormModalRef {
  open: (data?: TaskFormModalData) => void;
  close: () => void;
  getItemData: () => TaskFormModalData | null;
}

export const TaskFormModal = forwardRef((_, ref: ForwardedRef<TaskFormModalRef>) => {
  const [itemData, setItemData] = useState<TaskFormModalData | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    errors,
    isPending,
    reset,
    register,
    handleSubmit,
  } = useTaskFormModalController(
    ref as RefObject<TaskFormModalRef>
  )

  function handleClose() {
    setIsOpen(false);
    setItemData(null);
    reset({ title: '', description: '' });
  }

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) {
        reset(data);
        setItemData(data);
      }
      setIsOpen(true);
    },
    close: () => handleClose(),
    getItemData: () => itemData,
  }))

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content>
        <Dialog.Body className='justify-start items-start pt-0'>
          <Dialog.Title>{itemData?.id ? 'Editar' : 'Criar'} tarefa</Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-1 h-fit w-full flex flex-col gap-6"
          >
            <Input
              placeholder='Titulo'
              error={errors.title?.message}
              {...register('title')}
            />
            
            <Textarea
              placeholder='Descrição'
              error={errors.description?.message}
              {...register('description')}
            />

            <Dialog.Footer className='mt-2'>
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