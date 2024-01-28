import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClockIcon } from "@radix-ui/react-icons";

import { cn } from '../../app/utils/cn';
import { Task } from "../../app/entities/Task";

import { ListMenu } from './ListMenu';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../../app/services/tasksService";
import { requestError } from "../../app/utils/requestError";
import { Spinner } from "./Spinner";

interface TaskCardProps extends Partial<Task> {
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({
  id,
  title,
  description,
  isCompleted,
  createdAt,
  disabled,
  onEdit: handleEdit,
  onDelete: handleDelete
}: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(isCompleted ?? false);

  const {
    mutate: uncheckMutate,
    isPending: isUncheckPending
  } = useMutation({
    mutationFn: () => tasksService.uncheck(id as string),
    onError: (error) => requestError(error)
  });

  const {
    mutate: doneMutate,
    isPending: isDonePending
  } = useMutation({
    mutationFn: () => tasksService.done(id as string),
    onError: (error) => requestError(error)
  });

  function handleChangeStatus(isCompleted: boolean) {
    const type = isCompleted ? 'uncheck' : 'done';
    
    const actions = {
      uncheck: () => uncheckMutate(),
      done: () => doneMutate(),
    }

    actions[type]()
  }

  const isPending = isUncheckPending || isDonePending;

  return (
    <div
      id={`${id}-${isCompleted ? 'completed' : 'incompleted'}`}
      className={cn(
        "min-w-[300px] h-[150px] p-3 bg-white shadow transition-all flex flex-col justify-between gap-0 relative z-0 border-[1px] rounded-md",
        disabled && "cursor-not-allowed opacity-50 bg-gray-100 hover:bg-gray-100",
        isChecked && "bg-green-100 border-green-500"
      )}
    >
      <div className="flex w-full justify-between gap-1">
        <div className="flex items-center gap-3">
          {isPending && (
            <Spinner className='w-5 h-5' />
          )}

          {!isPending && (
            <input
              id="link-checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                handleChangeStatus(isChecked)
                setIsChecked(e.target.checked)
              }}
              className="h-4 w-4 rounded-lg text-sm accent-green-500 focus:ring-2 focus:ring-green-500 cursor-pointer"
            />
          )}
          
          <label
            htmlFor="link-checkbox"
            className="text-gray-800 font-semibold break-all text-left text-base"
          >
            {title}
          </label>
        </div>
    
        <ListMenu
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <p className="text-sm text-gray-700">{description}</p>

      <div className='flex items-center gap-2'>
        <ClockIcon className='w-4 h-4 text-gray-500' />

        <p className='text-gray-500 text-sm font-light'>
          {formatDistance(new Date(createdAt as string), new Date(), {
            addSuffix: true,
            locale: ptBR
          })}
        </p>
      </div>
    </div>
  )
}