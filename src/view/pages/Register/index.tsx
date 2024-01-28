import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";
import PasswordChecker from "../../components/PasswordChecker";

export function Register() {
  const {
    handleSubmit,
    register,
    watch,
    errors,
    isPending,
  } = useRegisterController();

  const password = watch('password');

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>

          <Link
            to="/login"
            className="tracking-[-0.5px] font-medium text-red-500 hover:text-red-700 "
          >
            Fazer Login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}

        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          type="password"
          placeholder="Confirmar senha"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <PasswordChecker password={password ?? ''} />

        <Button type="submit" className="mt-4" isLoading={isPending}>
          Criar conta
        </Button>
      </form>
    </div>
  )
}