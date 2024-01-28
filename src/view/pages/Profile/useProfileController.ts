import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IUpdateProfile } from "../../../app/services/usersService/update";
import { usersService } from "../../../app/services/usersService";
import { requestError } from "../../../app/utils/requestError";
import { useAuth } from "../../../app/hooks/useAuth";
import { masks } from "../../../app/utils/masks";

import { DeleteAccountAlertRef } from "./components/DeleteAccountAlert";
import { ChangePasswordFormModalRef } from "./components/ChangePasswordFormModal";

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  phone: z.string().optional(),
})

type FormData = z.infer<typeof schema>;

export function useProfileController() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const changePasswordModalRef = useRef<ChangePasswordFormModalRef>(null);
  const deleteAccountAlertRef = useRef<DeleteAccountAlertRef>(null);

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      ...user,
      phone: user?.phone ? masks.phone(user.phone) : undefined
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IUpdateProfile) => usersService.update(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', 'me'] }),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone ? masks.unmask(data.phone) : null,
    }

    await mutateAsync(payload, {
      onSuccess: () => toast.success('Perfil atualizado com sucesso.'),
      onError: (error) => requestError(error),
    });
  });

  function handleDelete() {
    deleteAccountAlertRef.current?.open();
  }

  function handleChangePassword() {
    changePasswordModalRef.current?.open();
  }

  return { 
    errors,
    isPending,
    deleteAccountAlertRef,
    changePasswordModalRef,
    register,
    handleSubmit,
    handleDelete,
    handleChangePassword,
  };
}