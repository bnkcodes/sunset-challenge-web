import notFoundIlustrationImg from '../../../assets/images/not-found.png'
import { Button } from '../../components/Button'

import { useNotFoundController } from "./useNotFoundController";

export function NotFound () {
  const { handleButtonClick } = useNotFoundController();

  return (
    <div className="w-full h-full flex items-center justify-center bg-red-300 gap-44">
      <div className='flex items-center justify-center flex-col gap-8 text-white'>
        <h1 className='text-7xl font-bold'>
          Oops!
        </h1>

        <p className="text-xl font-semibold">
          Você está perdido
        </p>

        <Button 
          onClick={handleButtonClick}
          className="bg-red-500 mt-8 hover:bg-red-600"
        >
          Voltar para a página inicial
        </Button>
      </div>

      <img src={notFoundIlustrationImg} className="h-[360px]" />
    </div>
  )
}