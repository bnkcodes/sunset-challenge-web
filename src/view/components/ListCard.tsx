import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClockIcon } from "@radix-ui/react-icons";

import { cn } from '../../app/utils/cn';
import { List } from '../../app/entities/List';

import { ListMenu } from './ListMenu';
import { useNavigate } from "react-router-dom";

interface ListCardProps extends List {
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function ListCard({
  id,
  name,
  color,
  createdAt,
  disabled,
  onEdit: handleEdit,
  onDelete: handleDelete
}: ListCardProps) {
  const navigate = useNavigate();
  
  return (
    <div
      className={cn(
        "min-w-[300px] h-[200px] p-3 bg-white shadow roundedcursor-pointer transition-all flex flex-col justify-between gap-10 relative z-0 border-[1px] rounded-md cursor-pointer hover:transform hover:scale-105",
        disabled && "cursor-not-allowed opacity-50 bg-gray-100 hover:bg-gray-100"
      )}
      style={{ borderColor: color, backgroundColor: color + '10' }}
    >
      <div
        className="absolute inset-0 rounded-md z-10"
        onClick={() => navigate(`/list/${id}`)}
      />

      <div className="flex w-full justify-between gap-4">
        <p className="text-gray-800 font-semibold break-all text-left">
          {name}
        </p>

        <ListMenu
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <div className='flex items-center gap-2'>
        <ClockIcon className='w-4 h-4 text-gray-500' />

        <p className='text-gray-500 text-sm font-light'>
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
            locale: ptBR
          })}
        </p>
      </div>
    </div>
  )
}