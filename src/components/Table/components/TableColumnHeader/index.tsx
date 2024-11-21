/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Header, Table, flexRender } from '@tanstack/react-table';
import HeaderActions from './components/HeaderActions';
import { CSSProperties } from 'react';
import { ArrowDown, ArrowUp, FilterIcon, GripVertical } from 'lucide-react';
import { getCommonPinningStyles } from '../../utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTableContext } from '../../contexts/TableContext';
import { ClassValue } from 'clsx';
import { Filter } from '../Filter';
interface TableColumnHeaderProps<TData> {
  header: Header<TData, any>;
  className?: ClassValue;
}

const TableColumnHeader = <T,>({
  header,
  className,
}: TableColumnHeaderProps<T>) => {
  const context = useTableContext();

  if (!context.table)
    throw new Error('TableHeaderGroup must be used inside TableContext');

  const { table } = context;

  const enableReorder =
    header.column.columnDef.meta?.enableColumnOrdering ?? true;

  const enableMenu = header.column.columnDef.meta?.enableMenu ?? true;

  const layout = table.options.meta?.layout ?? 'default';

  const canSort = header.column.getCanSort();

  const headerClassName =
    header.column.columnDef.meta?.header?.className ||
    table.options.meta?.header?.className;

  const { attributes, isDragging, listeners, transform } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    width: header.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  const renderContent = () => {
    if (header.isPlaceholder) return null;

    if (enableMenu)
      return <HeaderActions table={table as Table<T>} header={header} />;

    return flexRender(header.column.columnDef.header, header.getContext());
  };

  return (
    <div
      key={header.id}
      style={{
        ...style,
        ...getCommonPinningStyles(header.column, header.getSize()),
      }}
      className={cn(
        'text-foreground relative group p-1 text-xs font-semibold items-center px-2 border-b space-y-1 border-r h-auto bg-background overflow-hidden',
        layout === 'stretch' ? 'last-of-type:flex-1 last:border-r-0' : '',
        canSort && 'cursor-pointer select-none',
        headerClassName,
        className
      )}
    >
      <div className="flex items-center">
        {enableReorder && !header.isPlaceholder ? (
          <button
            {...attributes}
            {...listeners}
            disabled={!!header.column.getIsPinned()}
          >
            <GripVertical size={14} className="text-foreground" />
          </button>
        ) : null}
        {renderContent()}
        {header.column.getIsFiltered() && !header.isPlaceholder ? (
          <button className="w-4 h-4">
            <FilterIcon size={14} className="text-neutral-500" />
          </button>
        ) : null}
        {header.column.getCanSort() && !header.isPlaceholder
          ? {
              asc: <ArrowUp size={14} className="text-neutral-500" />,
              desc: <ArrowDown size={14} className="text-neutral-500" />,
            }[header.column.getIsSorted() as string]
          : null}
        {header.column.getCanResize() && !header.isPlaceholder ? (
          <div
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className={`absolute right-0 top-1/2 -translate-y-1/2 h-1/2 rounded-md w-[4px] cursor-col-resize select-none hover:bg-primary-200 touch-none ${
              header.column.getIsResizing()
                ? 'bg-primary-500'
                : 'group-hover:bg-neutral-300'
            }`}
          />
        ) : null}
      </div>

      {header.column.getCanFilter() && !header.isPlaceholder ? (
        <Filter column={header.column} />
      ) : null}
    </div>
  );
};

export default TableColumnHeader;
