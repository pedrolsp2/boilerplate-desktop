import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

type TableContainerProps = HTMLAttributes<HTMLDivElement>

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                {...props}
                ref={ref}
                className={cn(
                    'relative flex-1 flex flex-col w-full border rounded-xl overflow-auto shadow-md',
                    className
                )}
            >
                {children}
            </div>
        )
    }
)

export default TableContainer
