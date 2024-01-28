import { Pagination as ArkPagination } from '@ark-ui/react'

import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons'

type PaginationTableProps = {
  count: number
  pageSize: number
  currentPage: number
  setCurrentPage: (value: number) => void
}

export function Pagination({
  count,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationTableProps) {
  return (
    <ArkPagination.Root
      page={currentPage}
      onPageChange={(details) => setCurrentPage(details.page)}
      count={count}
      pageSize={pageSize}
      siblingCount={3}
    >
      {({ pages }) => (
        <div className="flex flex-row items-center justify-center space-x-1 text-brand-black lg:space-x-3">
          <ArkPagination.PrevTrigger className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border-[1px] border-[#D1D6D5]">
            <ArrowLeftIcon className="fill-brand-black" />
          </ArkPagination.PrevTrigger>
          {pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item
                className="flex h-[30px] w-[30px] items-center justify-center rounded-lg data-[selected]:bg-gray-300"
                key={index}
                {...page}
              >
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis
                className="flex h-[30px] w-[30px] items-center justify-center rounded-lg"
                key={index}
                index={index}
              >
                &#8230;
              </ArkPagination.Ellipsis>
            ),
          )}
          <ArkPagination.NextTrigger className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border-[1px] border-[#D1D6D5]">
            <ArrowRightIcon className="fill-brand-black" />
          </ArkPagination.NextTrigger>
        </div>
      )}
    </ArkPagination.Root>
  )
}