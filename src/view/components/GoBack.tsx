import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "../../assets/icons";

import { cn } from "../../app/utils/cn";

interface GoBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function GoBack({ title, className, ...props }: GoBackProps) {
  const navigate = useNavigate();

  return (
    <button 
      {...props}
      onClick={() => navigate(-1)}
      className={cn("flex items-center gap-4", className)}
    >
      <ArrowLeftIcon className="w-5 h-5 text-gray-800" />
      <p className="text-2xl md:text-3xl text-gray-800 font-bold">{title || 'Voltar'}</p>
    </button>
  )
}