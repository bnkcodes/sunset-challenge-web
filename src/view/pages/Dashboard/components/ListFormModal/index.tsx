import { ForwardedRef, RefObject, forwardRef, useImperativeHandle, useState } from 'react'
import { SliderPicker } from 'react-color';

import { Dialog } from '../../../../components/Dialog'
import { Spinner } from '../../../../components/Spinner'

import { useListFormModalController } from './useListFormModalController'
import { Input } from '../../../../components/Input'

export interface ListFormModalData {
  id: string
  name: string
  color: string
}

export interface ListFormModalRef {
  open: (data?: ListFormModalData) => void;
  close: () => void;
  getItemData: () => ListFormModalData | null;
}

export const ListFormModal = forwardRef((_, ref: ForwardedRef<ListFormModalRef>) => {
  const [itemData, setItemData] = useState<ListFormModalData | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    errors,
    isPending,
    colorSelected,
    reset,
    register,
    handleSubmit,
    setColoSelected
  } = useListFormModalController(
    ref as RefObject<ListFormModalRef>
  )

  function handleClose() {
    setIsOpen(false);
    setItemData(null);
    reset({ name: '' });
  }

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) {
        reset(data);
        setItemData(data);
        setColoSelected(data.color);
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
          <Dialog.Title>{itemData?.id ? 'Editar' : 'Criar'} lista</Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-6 h-fit w-full"
          >
            <Input
              placeholder='Nome'
              error={errors.name?.message}
              {...register('name')}
            />

            <SliderPicker
              color={colorSelected}
              onChangeComplete={(color) => setColoSelected(color.hex)}
              className='mt-6'
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