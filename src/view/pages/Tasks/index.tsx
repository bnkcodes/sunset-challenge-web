import Skeleton from 'react-loading-skeleton'
import { PlusIcon } from '@radix-ui/react-icons'

import emptyBox from '../../../assets/svgs/empty-box.svg';
import magnifierQuestion from '../../../assets/svgs/magnifier-question.svg';

import { TaskCard } from "../../components/TaskCard";
import { Pagination } from "../../components/Pagination";
import { SearchBar } from "../../components/SearchBar";
import { Button } from '../../components/Button';

import { useTasksController } from "./useTasksController";
import { TaskDeleteAlert } from './components/TaskDeleteAlert';
import { TaskFormModal } from './components/TaskFormModal';
import { GoBack } from '../../components/GoBack';

export function Tasks() {
  const {
    items,
    pagination,
    isLoading,
    isFetching,
    isRefetching,
    taskFormModalRef,
    taskDeleteAlertRef,
    searchTerm,
    setSearchTerm,
    setParams,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useTasksController()

  const isNotFirstLoading = !isLoading;
  const isNotFetching = !isFetching && !isRefetching && !isLoading;
  const hasNoItems = items?.length === 0;

  const renderEmptyListMessage = isNotFetching && hasNoItems && !searchTerm;
  const renderNotFountMessage = isNotFetching && hasNoItems && searchTerm.length > 0;
 
  return (
    <div className="h-full bg-gray-50 overflow-y-auto p-4 pb-6 md:pt-10 md:pb-20">
      <TaskFormModal ref={taskFormModalRef} />
      <TaskDeleteAlert ref={taskDeleteAlertRef} />

      <div className='w-full max-w-3xl mx-auto flex flex-col gap-4 md:gap-8'>
        <GoBack title="Tarefas" />

        <div className="w-full flex items-center gap-2">
          <SearchBar
            placeholder="Pesquisar"
            className="w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button className='rounded-lg' onClick={handleCreate}>
            <PlusIcon className='w-6 h-6' />
          </Button>
        </div>
      </div>
    
      <div
        className='mx-auto max-w-2xl pt-8 pb-12 px-2 justify-center gap-3 grid grid-cols-1 relative'
      >
        {!isNotFirstLoading && 
          Array.from(Array(3).keys()).map(() => (
            <Skeleton key={Math.random()} className='w-full' height="150px" />
          )
        )}

        {renderEmptyListMessage && (
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-32">
            <img src={emptyBox} alt="Empty Box" className="w-52" />
            <p  className='text-gray-700 font-semibold'>Nenhuma tarefa cadastrada.</p>
          </div>
        )}

        {renderNotFountMessage && (
          <div className="w-full flex items-center justify-center gap-4 mt-32">
            <img src={magnifierQuestion} alt="Empty Box" className="w-24" />
            <p  className='text-gray-700 font-semibold'>Nenhuma tarefa encontrada.</p>
          </div>
        )}

        {isNotFirstLoading && 
          items?.map((list) => (
            <TaskCard
              key={list.id}
              id={list.id}
              title={list.title}
              description={list.description}
              isCompleted={list.isCompleted}
              createdAt={list.createdAt}
              onEdit={() => handleEdit(list)}
              onDelete={() => handleDelete(list)}
            />
        ))}
      </div>

      {items.length > 0 && isNotFirstLoading && (
        <Pagination
          currentPage={pagination?.page || 1}
          pageSize={pagination?.perPage || 8}
          count={pagination?.total || 0}
          setCurrentPage={(page) => setParams((prevParams) => ({ ...prevParams, page }))}
        />
      )}
    </div>
  )
}