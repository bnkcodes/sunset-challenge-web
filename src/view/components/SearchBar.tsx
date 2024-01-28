import { ComponentProps, forwardRef } from "react";
import { MagnifyingGlassIcon} from '@radix-ui/react-icons'

import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {}

export const SearchBar = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...props }, ref) => {
    return (
      <div 
        className={cn(
          "peer h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 text-gray-800 outline-none transition-all focus:border-gray-800 flex items-center gap-2",
          className,
        )}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />

        <input
          {...props}
          ref={ref}
          placeholder={placeholder}
          className="flex-1  outline-none "
        />
      </div>
    );
  },
);
