import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";

import { useAuth } from "../../app/hooks/useAuth";
import { getStringInitials } from "../../app/utils/getStringInitials";
import { useNavigate } from "react-router-dom";
import { imagePath } from "../../app/utils/imagePath";

export function UserMenu() {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const hasImage = user?.avatarUrl;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-red-200 rounded-full w-12 h-12 flex items-center justify-center border border-red-300 cursor-pointer hover:border-red-400 transition-all">
          {!hasImage && (
            <span className="text-sm tracking-[-0.5px] text-red-700 font-medium">
              {getStringInitials(user?.name)}
            </span>
          )}

          {hasImage && (
            <img
              src={imagePath(user?.avatarUrl)}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-fit">
      <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={() => navigate('/profile')}
        >
          Perfil
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex items-center justify-between gap-4"
          onSelect={signout}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}