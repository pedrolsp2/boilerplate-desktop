import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

type TableHeaderProps = HTMLAttributes<HTMLDivElement>

const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className={cn('sticky top-0 z-10 bg-background', className)}
            />
        )
    }
)

export default TableHeader
