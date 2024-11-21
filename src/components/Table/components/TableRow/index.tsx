import { HTMLAttributes, forwardRef } from 'react'
import { useTableContext } from '../../contexts/TableContext'
import { cn } from '@/lib/utils'

type TableRowProps = HTMLAttributes<HTMLDivElement>

const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
    ({ className, children, ...props }, ref) => {
        const context = useTableContext()

        if (!context.table)
            throw new Error('TableLayout must be used inside TableContext')

        const { table } = context

        return (
            // tr
            <div
                ref={ref}
                {...props}
                className={cn(
                    'flex w-full group',
                    table.options.meta?.row?.className,
                    className
                )}
            >
                {children}
            </div>
        )
    }
)

export default TableRow
