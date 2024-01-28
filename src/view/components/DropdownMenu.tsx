import * as RDXDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RDXDropdownMenu.Root>{children}</RDXDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RDXDropdownMenu.Trigger className="outline-none min-w-fit z-10" asChild>
      {children}
    </RDXDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RDXDropdownMenu.Portal>
      <RDXDropdownMenu.Content
        sideOffset={2}
        className={cn(
          "rounded-md p-2 z-[99] border-[1px] border-gray-200 bg-white",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RDXDropdownMenu.Content>
    </RDXDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RDXDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] z-[99] outline-none flex items-center py-2 px-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-md transition-colors",
        "cursor-pointer",
        className
      )}
    >
      {children}
    </RDXDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};