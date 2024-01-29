import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { passwordValidation } from "../../../app/utils/passwordValidation";
import { SignupParams } from "../../../app/services/authService/signup";
import { authService } from "../../../app/services/authService";
import { useAuth } from "../../../app/hooks/useAuth";
import { requestError } from "../../../app/utils/requestError";

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: passwordValidation,
  passwordConfirmation: z.string({ required_error: 'Confirmação de senha obrigatória.' }),
})
.refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'As senhas precisam ser iguais.',
    path: ['passwordConfirmation'],
})

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    mutate(data, {
      onSuccess: ({ accessToken }) => signin(accessToken),
      onError: (error) => requestError(error)
    });
  })

  return { handleSubmit, register, watch, errors, isPending };
}