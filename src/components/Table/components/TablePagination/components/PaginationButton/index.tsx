import { cn } from '@/lib/utils'

interface PaginationButtonProps {
    page: number
    disabled?: boolean
    onClick?: () => void
}

const PaginationButton = ({
    onClick,
    page,
    disabled,
}: PaginationButtonProps) => {
    return (
        <li className="min-w-[24px]">
            <button
                className={cn(
                    'h-7 w-full px-1.5 rounded-md text-sm hover:bg-slate-100',
                    disabled
                        ? 'bg-primary-500 hover:bg-primary-500 text-white'
                        : ''
                )}
                onClick={onClick}
                disabled={disabled}
            >
                {page}
            </button>
        </li>
    )
}

export default PaginationButton
