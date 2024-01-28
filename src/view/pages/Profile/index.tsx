
import { masks } from "../../../app/utils/masks";

import { Button } from '../../components/Button';
import { GoBack } from '../../components/GoBack';
import { Input } from '../../components/Input';
import { Spinner } from "../../components/Spinner";
import { ChangePasswordFormModal } from "./components/ChangePasswordFormModal";
import { DeleteAccountAlert } from "./components/DeleteAccountAlert";
import ImageProfileUpload from './components/ImagineProfileUpload';

import { useProfileController } from "./useProfileController";

export function Profile() {
  const {
    errors,
    isPending,
    deleteAccountAlertRef,
    changePasswordModalRef,
    register,
    handleSubmit,
    handleDelete,
    handleChangePassword
  } = useProfileController()
 
  return (
    <div className="h-full bg-gray-50 overflow-y-auto px-4 pb-24 pt-10 md:pb-20">
      <ChangePasswordFormModal ref={changePasswordModalRef} />
      <DeleteAccountAlert ref={deleteAccountAlertRef} />

      <div className='max-w-2xl mx-auto mb-7'>
        <GoBack title="Meu perfil" />
      </div>

      <div
        className="bg-gray-50 shadow border-2 w-full max-w-2xl mx-auto flex flex-col gap-12 p-8 rounded-lg"
      >
        <ImageProfileUpload />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            {...register('name')}
            placeholder="Nome"
            error={errors.name?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <Input
              {...register('email')}
              placeholder="E-mail"
              error={errors.email?.message}
            />

            <Input
              {...register('phone')}
              placeholder="Telefone"
              className="min-w-full"
              error={errors.phone?.message}
              onChange={(e) => {
                e.target.value = masks.phone(e.target.value)
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleChangePassword}
            className="text-blue-500 mr-auto"
          >
            Alterar senha
          </button>

          <div className='flex flex-col-reverse gap-2 md:flex-row items-center justify-end md:gap-5 mt-8'>
            <Button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-transparent border-gray-400 border-2 text-gray-700 hover:border-red-400 hover:bg-red-400 hover:text-white max-md:w-full"
            >
              Deletar conta
            </Button>

            <Button
              type="submit"
              isLoading={isPending}
              className="min-w-[100px] rounded-lg bg-green-500 hover:bg-green-600 max-md:w-full"
            >
              {isPending ? <Spinner className="w-6 h-6" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}