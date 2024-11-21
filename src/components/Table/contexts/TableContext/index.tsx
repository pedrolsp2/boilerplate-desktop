/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useCallback, useMemo } from 'react';
import { Table } from '@tanstack/react-table';
import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export type TableContextType<T> = {
  table: Table<T> | null;
};

type TableContextProps<T> = {
  children: React.ReactNode;
  table: Table<T> | null;
};

const TableContext = createContext<TableContextType<any>>({ table: null });
TableContext.displayName = 'TableContext';

export const TableContextProvider = <T,>({
  children,
  table,
}: TableContextProps<T>) => {
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        table?.setColumnOrder((order) => {
          const oldIndex = order.indexOf(active.id as string);
          const newIndex = order.indexOf(over.id as string);
          return arrayMove(order, oldIndex, newIndex);
        });
      }
    },
    [table]
  );

  useDndMonitor({
    onDragEnd: handleDragEnd,
  });

  const contextValue = useMemo(() => ({ table }), [table]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = <T,>() =>
  useContext(TableContext) as TableContextType<T>;
