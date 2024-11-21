import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

type TableBodyProps = HTMLAttributes<HTMLDivElement>

const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div {...props} className={cn('relative', className)} ref={ref}>
                {children}
            </div>
        )
    }
)

export default TableBody
