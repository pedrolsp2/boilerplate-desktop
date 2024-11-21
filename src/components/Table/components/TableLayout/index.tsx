import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { useTableContext } from '../../contexts/TableContext'

type TableLayoutProps = HTMLAttributes<HTMLDivElement>

const TableLayout = ({
    children,
    className,
    style,
    ...props
}: TableLayoutProps) => {
    const context = useTableContext()

    if (!context.table)
        throw new Error('TableLayout must be used inside TableContext')

    const { table } = context

    return (
        <div
            {...props}
            className={cn('flex flex-1 flex-col min-w-full', className)}
            style={{
                width: table.getTotalSize(),
                ...style,
            }}
        >
            {children}
        </div>
    )
}

export default TableLayout
