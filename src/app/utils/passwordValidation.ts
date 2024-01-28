import { z } from "zod"

export const passwordValidation = z.string({ required_error: 'Senha é obrigatória.' }).refine(
  (value) => {
    const lowercaseRegex = /[a-z]/
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /[0-9]/
    const specialCharRegex = /[\W_]/

    return (
      lowercaseRegex.test(value) &&
      uppercaseRegex.test(value) &&
      numberRegex.test(value) &&
      specialCharRegex.test(value)
    )
  },
  {
    message:
      'Senha deve conter pelo menos 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial.',
  },
)