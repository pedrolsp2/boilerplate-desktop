import { cn } from '@/lib/utils'
import {
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { HTMLAttributes, useMemo } from 'react'
import { useTableContext } from '../../contexts/TableContext'
import { HeaderGroup } from '@tanstack/react-table'

type TableHeaderGroupProps<T> = {
    headerGroup: HeaderGroup<T>
} & HTMLAttributes<HTMLDivElement>

const TableHeaderGroup = <T,>({
    className,
    children,
    headerGroup,
    ...props
}: TableHeaderGroupProps<T>) => {
    const context = useTableContext()

    if (!context.table)
        throw new Error('TableHeaderGroup must be used inside TableContext')

    const { table } = context

    const columnOrder = useMemo(
        () => table.getState().columnOrder,
        [table.getState()]
    )

    return (
        <div {...props} className={cn('flex', className)}>
            <SortableContext
                id={headerGroup.id}
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </div>
    )
}

export default TableHeaderGroup
