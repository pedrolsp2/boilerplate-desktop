/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Cell, flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getCommonPinningStyles } from '../../utils';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TypographyP } from '@/components/ui/typography';
import { useTableContext } from '../../contexts/TableContext';

type CellProps<TData> = {
  cell: Cell<TData, any>;
  className?: string;
};

const TableCell = <T,>({ cell, ...props }: CellProps<T>) => {
  const context = useTableContext<T>();

  if (!context.table)
    throw new Error('TableCell must be used inside TableContext');

  const { table } = context;

  const columnOrder = useMemo(
    () => table.getState().columnOrder,
    [table.getState()]
  );

  return (
    <SortableContext
      id={cell.id}
      items={columnOrder}
      strategy={horizontalListSortingStrategy}
    >
      <TableCellRenderer cell={cell} {...props} />
    </SortableContext>
  );
};

type ExpandedContainerProps = {
  children: ReactNode;
};

const ExpandedContainer = ({ children }: ExpandedContainerProps) => {
  return (
    <div className="flex items-center overflow-hidden text-primary">
      {children}
    </div>
  );
};

const TableCellRenderer = <T,>({ cell, className }: CellProps<T>) => {
  const context = useTableContext<T>();

  if (!context.table)
    throw new Error('TableCellRenderer must be used inside TableContext');

  const { table } = context;

  const initialValue = cell.getValue();
  const [value, setValue] = useState(initialValue || '');
  const [isEditing, setIsEditing] = useState(false);

  const isGrouped = cell.column.columnDef?.meta?.row?.isGrouped;
  const isCellEditable = cell.column?.columnDef?.meta?.enableColumnEditable;
  const tableRowLayout = table.options.meta?.layout || 'default';
  const cellClassName =
    cell.column.columnDef.meta?.cell?.className ||
    table.options.meta?.cell?.className;

  const isSelected =
    cell.row.getIsSelected() ||
    cell.row.getParentRows().some((parent) => parent.getIsSelected());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const formatterFn = cell.column.columnDef.meta?.cell?.formatterFn;

  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
    paddingLeft: isGrouped ? `${cell.row.depth * 2}rem` : undefined,
  };

  const onBlur = useCallback(() => {
    if (table.options.meta?.updateData) {
      table.options.meta.updateData(
        cell.row.id,
        cell.column.id as keyof T,
        value,
        cell.column.columnDef
      );
    }
  }, [cell, value, table]);

  useEffect(() => {
    if (isCellEditable) setValue(initialValue || '');
  }, [initialValue, isCellEditable]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleClick = useCallback(() => {
    if (isCellEditable) setIsEditing(true);
  }, [isCellEditable]);

  const handleFocus = useCallback(() => {
    if (isCellEditable) setIsEditing(true);
  }, [isCellEditable]);

  const renderContent = (): ReactNode => {
    if (cell.getIsPlaceholder()) {
      return null;
    }

    if (isGrouped) {
      const toggle = cell.row.getToggleExpandedHandler();

      if (cell.row.depth !== 0 && !cell.row.getCanExpand())
        return (
          <ExpandedContainer>
            <div className="px-2">
              <CornerDownRight className="text-muted-foreground" size={12} />
            </div>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </ExpandedContainer>
        );

      return (
        <ExpandedContainer>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className={cn(
              'px-2 cursor-pointer',
              isGrouped && cell.row.depth === 0 ? 'text-primary' : ''
            )}
          >
            {cell.row.getIsExpanded() ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </ExpandedContainer>
      );
    }

    if (cell.getIsGrouped()) {
      const toggle = cell.row.getToggleExpandedHandler();

      if (cell.row.depth !== 0 && !cell.row.getCanExpand())
        return (
          <ExpandedContainer>
            <CornerDownRight className="text-muted-foreground" size={12} />
          </ExpandedContainer>
        );

      return (
        <ExpandedContainer>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className={cn('cursor-pointer mr-2 text-primary')}
          >
            {cell.row.getIsExpanded() ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </ExpandedContainer>
      );
    }

    if (cell.getIsAggregated()) {
      return flexRender(
        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
        cell.getContext()
      );
    }

    if (isCellEditable) {
      const editableColumnType =
        cell.column?.columnDef?.meta?.editableColumnType;

      return (
        <input
          ref={inputRef}
          className="w-full h-full px-2 py-1 text-xs bg-transparent border text-foreground"
          value={value as string}
          type={editableColumnType || 'text'}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            onBlur();
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onBlur();
            }
          }}
        />
      );
    }

    return formatterFn ? (
      <TypographyP
        className={cn(
          'overflow-hidden text-xs whitespace-nowrap text-ellipsis text-foreground',
          cellClassName
        )}
      >
        {formatterFn({ row: cell.row, value: cell.getValue() })}
      </TypographyP>
    ) : (
      flexRender(cell.column.columnDef.cell, cell.getContext())
    );
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex whitespace-nowrap overflow-hidden text-foreground min-w-0 border-r first-of-type:border-l border-b items-center py-1.5 px-4 w-full text-xs group-odd:bg-background group-even:bg-neutral-50 group-hover:group-even:bg-neutral-200 group-hover:border-white group-hover:group-odd:bg-neutral-200 dark:group-even:bg-zinc-900 dark:group-odd:bg-neutral-800 dark:group-hover:group-even:bg-zinc-700 dark:group-hover:group-odd:bg-zinc-600 dark:group-hover:border-accent',
        tableRowLayout === 'stretch' && 'last-of-type:flex-1',
        cell.column.getIsPinned() && 'bg-background',
        cell.getIsGrouped() || cell.getIsAggregated()
          ? 'group-odd:bg-slate-50 group-even:bg-slate-50 group-hover:group-odd:bg-slate-200 group-hover:group-even:bg-slate-200 dark:group-odd:bg-zinc-900 dark:group-even:bg-zinc-900 dark:group-hover:group-even:bg-zinc-700 dark:group-hover:group-odd:bg-zinc-700'
          : '',
        isSelected &&
          'group-odd:bg-slate-100 group-even:bg-slate-100 group-hover:group-even:bg-slate-200 group-hover:group-odd:bg-slate-200 dark:group-odd:bg-zinc-700 dark:group-even:bg-zinc-700 dark:group-hover:group-even:bg-zinc-600 dark:group-hover:group-odd:bg-zinc-600 ',
        cellClassName,
        className
      )}
      onClick={handleClick}
      tabIndex={0}
      onFocus={handleFocus}
      autoFocus
      style={{
        ...style,
        ...getCommonPinningStyles(cell.column, cell.column.getSize()),
      }}
    >
      {renderContent()}
    </div>
  );
};

export default TableCell;
