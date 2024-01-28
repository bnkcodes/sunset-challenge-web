import { useRef } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { usersService } from "../../../../../app/services/usersService";

const imageSchema = z.object({
  file: z.any(),
})

type FormImageData = z.infer<typeof imageSchema>

export function useImageProfileUpload() {
  const queryClient = useQueryClient()

  const inputRef = useRef<HTMLInputElement>(null)

  const { handleSubmit, register, setValue } = useForm<FormImageData>({
    resolver: zodResolver(imageSchema)
  })

  const {
    mutate: uploadImageMutate,
    isPending: uploadImageIsPending,
  } = useMutation({
    mutationFn: async (payload: FormData) => usersService.uploadImage(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
  })

  const {
    mutate: deleteImageMutate,
    isPending: deleteImageIsPending,
  } = useMutation({
    mutationFn: async () => usersService.deleteImage(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
  })

  const errorMessage = (error: Error) => {
    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.message)
    }

    toast.error(error.message)
  }

  const onUpload = handleSubmit(async (data: FormImageData) => {
    const formData = new FormData()
    formData.append('file', data.file)

    uploadImageMutate(formData, {
      onSuccess: () => toast.success('Imagem atualizada com sucesso.'),
      onError: (error) => errorMessage(error),
    })
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue('file', e.target.files[0])
      onUpload()
    }
  }

  const handleDeleteImage = async () => {
    deleteImageMutate(undefined, {
      onError: (error) => errorMessage(error),
    })
  }
  
  return {
    inputRef,
    isPending: uploadImageIsPending || deleteImageIsPending,
    register,
    handleFileUpload,
    handleDeleteImage,
  };
}