import { RefObject, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { requestError } from '../../../../../app/utils/requestError'
import { listsService } from '../../../../../app/services/listsService'
import { CreateParams } from '../../../../../app/services/listsService/create'
import { UpdateParams } from '../../../../../app/services/listsService/update'

import { ListFormModalRef } from '.'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  color: z.string().optional(),
})

type FormData = z.infer<typeof schema>;

interface UpdateListMutation {
  id: string;
  data: UpdateParams;
}

export function useListFormModalController(ref: RefObject<ListFormModalRef>) {
  const [colorSelected, setColoSelected] = useState<string>();

  const queryClient = useQueryClient()
  
  const {
    reset,
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });

  const {
    mutate: createMutate,
    isPending: createIsPending
  } = useMutation({
    mutationFn: async (data: CreateParams) => listsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists'] })
  });

  const {
    mutate: updateMutate,
    isPending: updateIsPending
  } = useMutation({
    mutationFn: async (payload: UpdateListMutation) => {
      return listsService.update(payload.id, payload.data)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists'] })
  });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    const itemId = ref.current?.getItemData()?.id;

    const type = itemId ? 'edit' : 'create';

    const payload = {
      name: formData.name,
      color: colorSelected,
    }
    
    const actions = {
      create: () => createMutate(payload, {
        onSuccess: () => {
          toast.success('Lista editada com sucesso.');
          ref.current?.close();
        },
        onError: (error) => requestError(error),
      }),
      
      edit: () => updateMutate({
        id: itemId as string,
        data: payload
      }, {
        onSuccess: () => {
          toast.success('Lista editada com sucesso.');
          ref.current?.close();
        },
        onError: (error) => requestError(error),
      }),
    }

    actions[type]()
  })

  return {
    errors,
    isPending: createIsPending || updateIsPending,
    colorSelected,
    setColoSelected,
    handleSubmit,
    register,
    reset,
  }
}