import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface TextareaProps extends ComponentProps<"textarea"> {
  name: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <textarea
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          rows={5}
          placeholder=" "
          className={cn(
            "peer w-full rounded-lg border border-gray-500 bg-white px-3 pt-5 text-gray-800 outline-none transition-all placeholder-shown:pt-[13px] focus:border-gray-800",
            error && "!border-red-900",
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-500">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
