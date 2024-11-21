import { cn } from '@/lib/utils'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PaginationButton from './components/PaginationButton'

interface TablePaginationProps {
    totalPages: number
    totalItems: number
    selectedPage: number
    onPageChange: (page: number) => void
}

const TablePagination = ({
    totalPages,
    totalItems,
    selectedPage,
    onPageChange,
}: TablePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(selectedPage)

    const handleClick = (page: number) => {
        setCurrentPage(page)
        onPageChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = []
        const totalVisiblePages = 5

        if (totalPages === 0) {
            pageNumbers.push(<PaginationButton page={1} disabled />)
        } else if (totalPages <= totalVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(
                    <PaginationButton
                        key={i}
                        disabled={i === currentPage}
                        page={i + 1}
                        onClick={() => handleClick(i)}
                    />
                )
            }
        } else {
            let leftOffset = Math.max(
                0,
                currentPage - Math.floor(totalVisiblePages / 2)
            )
            let rightOffset = leftOffset + totalVisiblePages - 1
            if (rightOffset >= totalPages) {
                rightOffset = totalPages - 1
                leftOffset = Math.max(0, rightOffset - totalVisiblePages + 1)
            }
            for (let i = leftOffset; i <= rightOffset; i++) {
                pageNumbers.push(
                    <PaginationButton
                        key={i}
                        disabled={i === currentPage}
                        page={i + 1}
                        onClick={() => handleClick(i)}
                    />
                )
            }
        }

        return pageNumbers
    }

    useEffect(() => {
        if (totalPages !== 0) {
            if (selectedPage >= totalPages) {
                setCurrentPage(0)
                onPageChange(0)
            } else {
                setCurrentPage(selectedPage)
            }
        }
    }, [selectedPage, totalPages, onPageChange])

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-neutral-500/90">
                    <span className="font-semibold">{totalItems}</span>{' '}
                    registros
                </p>
            </div>
            <div className="flex items-center p-2">
                <button
                    className={cn(
                        'text-neutral-500 h-7 w-[24px] flex items-center justify-center',
                        currentPage === 0
                            ? 'text-neutral-400'
                            : 'hover:bg-neutral-100'
                    )}
                    onClick={() => handleClick(0)}
                    disabled={currentPage === 0}
                >
                    <ChevronsLeft size={18} strokeWidth={2} />
                </button>
                <button
                    className={cn(
                        'text-neutral-500  h-7 w-[24px] flex items-center justify-center',
                        currentPage === 0
                            ? 'text-neutral-400'
                            : 'hover:bg-neutral-100'
                    )}
                    onClick={() => handleClick(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <ul className="flex items-center">{renderPageNumbers()}</ul>
                <button
                    className={cn(
                        'text-neutral-500  h-7 w-[24px] flex items-center justify-center',
                        currentPage >= totalPages - 1
                            ? 'text-neutral-400'
                            : 'hover:bg-neutral-100'
                    )}
                    onClick={() =>
                        handleClick(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage >= totalPages - 1}
                >
                    <ChevronRight size={16} />
                </button>
                <button
                    className={cn(
                        'text-neutral-500  h-7 w-[24px] flex items-center justify-center',
                        currentPage >= totalPages - 1
                            ? 'text-neutral-400'
                            : 'hover:bg-neutral-100'
                    )}
                    onClick={() => handleClick(totalPages - 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    <ChevronsRight size={18} strokeWidth={2} />
                </button>
            </div>
        </div>
    )
}

export default TablePagination
