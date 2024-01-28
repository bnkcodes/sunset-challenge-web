import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { DropdownMenu } from "./DropdownMenu";

interface ListMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ListMenu({ onEdit, onDelete }: ListMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsVerticalIcon className="w-4 h-4 hover:text-red-600 transition-all" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32" >
        <DropdownMenu.Item
          onSelect={() => onEdit()}
          className="flex items-center justify-between"
        >
          Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => onDelete()}
          className="flex items-center justify-between"
        >
          Excluir
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}