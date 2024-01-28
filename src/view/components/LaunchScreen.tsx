import { Transition } from '@headlessui/react'

import logoImg from '../../assets/images/logo.png';
import { Spinner } from "./Spinner";

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-gray-50 fixed top-0 left-0 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <img src={logoImg} alt="Sunset" className="h-20" />
          <Spinner className="text-red-200 fill-red-400" />
        </div>
      </div>
    </Transition>
  );
}