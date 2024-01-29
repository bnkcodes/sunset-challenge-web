import Skeleton from 'react-loading-skeleton'
import { PlusIcon } from '@radix-ui/react-icons'

import emptyBox from '../../../assets/svgs/empty-box.svg';
import magnifierQuestion from '../../../assets/svgs/magnifier-question.svg';

import { ListCard } from "../../components/ListCard";
import { Pagination } from "../../components/Pagination";
import { SearchBar } from "../../components/SearchBar";
import { Spinner } from '../../components/Spinner';
import { ListDeleteAlert } from './components/ListDeleteAlert';

import { useDashboardController } from "./useDashboardController";
import { ListFormModal } from './components/ListFormModal';
import { Button } from '../../components/Button';

export function Dashboard() {
  const {
    items,
    pagination,
    isLoading,
    isFetching,
    isRefetching,
    listFormModalRef,
    listDeleteAlertRef,
    searchTerm,
    setSearchTerm,
    setParams,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useDashboardController()

  const isFirstLoading = isLoading;
  const isNotFetching = !isFetching && !isRefetching && !isLoading;
  const hasNoItems = items.length === 0;

  const renderEmptyListMessage = isNotFetching && hasNoItems && !searchTerm;
  const renderNotFountMessage = isNotFetching && hasNoItems && searchTerm.length > 0;
 
  return (
    <div className="h-full bg-gray-50 overflow-y-auto p-4 pb-6 md:pt-10 md:pb-20">
      <ListFormModal ref={listFormModalRef} />
      <ListDeleteAlert ref={listDeleteAlertRef} />

      <div className='w-full max-w-5xl mx-auto'>
        <h1 className='text-2xl md:text-3xl text-gray-800 font-bold mb-4 md:mb-10'>Minhas listas</h1>

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
        className='mx-auto max-w-5xl pt-8 pb-12 px-2 justify-center gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative'
      >
        {isFetching && (
          <div
            className="absolute inset-0 w-full h-full z-40 bg-gray-50 bg-opacity-40 flex items-center justify-center"
          >
            <Spinner />
          </div>
        )}
    
        {isFirstLoading && 
          Array.from(Array(9).keys()).map(() => (
            <Skeleton key={Math.random()} className='w-full' height="200px" />
        ))}

        {renderEmptyListMessage && (
          <div className="absolute top-16 inset-0 w-full h-full flex flex-col items-center justify-center gap-4 mt-32">
            <img src={emptyBox} alt="Empty Box" className="w-52" />
            <p  className='text-gray-700 font-semibold'>Nenhuma lista cadastrada.</p>
          </div>
        )}

        {renderNotFountMessage && (
          <div className="absolute top-16 inset-0 w-full h-full flex items-center justify-center gap-4 mt-32">
            <img src={magnifierQuestion} alt="Empty Box" className="w-24" />
            <p  className='text-gray-700 font-semibold'>Nenhuma lista encontrada.</p>
          </div>
        )}

        {!isFirstLoading && 
          items?.map((list) => (
            <ListCard
              key={list.id}
              id={list.id}
              name={list.name}
              color={list.color}
              createdAt={list.createdAt}
              onEdit={() => handleEdit(list)}
              onDelete={() => handleDelete(list)}
            />
        ))}
      </div>

      {items.length > 0 && !isFirstLoading && (
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