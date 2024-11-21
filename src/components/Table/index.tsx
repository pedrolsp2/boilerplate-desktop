/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useCallback } from 'react';
import {
  useReactTable,
  Cell,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  getGroupedRowModel,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { TableCustomData, TableProps } from './type';
import { TableContextProvider } from './contexts/TableContext';
import { useTableState } from './hooks/useTableState';
import TablePagination from './components/TablePagination';
import TableSettings from './components/TableSettings';
import TopMessage from '../TopMessage';
import TableContainer from './components/TableContainer';
import TableLayout from './components/TableLayout';
import TableHeader from './components/TableHeader';
import TableHeaderGroup from './components/TableHeaderGroup';
import TableColumnHeader from './components/TableColumnHeader';
import TableBody from './components/TableBody';
import TableRow from './components/TableRow';
import TableCell from './components/TableCell';
import SelectionColumn from './components/SelectionColumn';
import TableDndContext from './contexts/TableDndContext';
import { useSidebar } from '../ui/sidebar';

const Table = <T extends TableCustomData<T>>({
  columns,
  data,
  isError,
  errorMessage,
  defaultColumn,
  isFetching,
  isLoading,
  pagination,
  virtualizeRows = true,
  tableHeader,
  tableActions,
  tableState,
  meta,
  enableMultiRowSelection = true,
  enableRowSelection,
  className,
  rowStimateSize = 35,
  shouldRenderCheckbox = true,
  persist,
  expandAllRows,
  getRowId,
  onRowClick,
  getTableInstance,
  onPaginationChange,
  onColumnFiltersChange,
  onTableStateChange,
  onExpandedStateChange,
  onRowSelectionChange,
  onColumnOrderStateChange,
  onColumnVisibilityStateChange,
  onColumnPinningStateChange,
  onSortingStateChange,
  onColumnSizingChange,
  onGroupingStateChange,
}: TableProps<T>) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { open } = useSidebar();

  const {
    state,
    handleColumnFiltersChange,
    handleColumnOrderChange,
    handleColumnPinningStateChange,
    handleSortingStateChange,
    handleStateChange,
    handleColumnVisibilityChange,
    handleExpandedChange,
    handlePaginationChange,
    handleRowSelectionChange,
    handleColumnSizingStateChange,
    handleGroupingStateChange,
  } = useTableState({
    persist,
    ...tableState,
    onColumnFiltersChange,
    onTableStateChange,
    onExpandedStateChange,
    onRowSelectionChange,
    onColumnOrderStateChange,
    onColumnVisibilityStateChange,
    onColumnPinningStateChange,
    onSortingStateChange,
    onColumnSizingChange,
    onGroupingStateChange,
  });

  const columnsMemo = useMemo(() => {
    if (enableRowSelection && shouldRenderCheckbox) {
      return [
        SelectionColumn<T, any>({
          pagination: Boolean(state.pagination),
        }),
        ...columns,
      ];
    }
    return columns;
  }, [
    columns,
    tableState?.rowSelection,
    shouldRenderCheckbox,
    state.pagination,
  ]);

  const getColumnOrder = useCallback(() => {
    const columnOrderIds = state.columnOrder || [];
    const tableIds = columnsMemo.map((column) => column.id);

    const mergedArray = [...columnOrderIds];

    tableIds.forEach((item, index) => {
      if (item) {
        if (!columnOrderIds.includes(item)) {
          mergedArray.splice(index, 0, item);
        }
      }
    });

    return mergedArray.filter(Boolean);
  }, [columnsMemo]);

  const table = useReactTable({
    data,
    columns: columnsMemo,
    state,
    meta,
    manualPagination: true,
    initialState: {
      columnOrder: columnsMemo.map((column) => column.id || ''),
    },
    enableMultiRowSelection,
    enableRowSelection,
    filterFromLeafRows: true,
    columnResizeMode: 'onChange',
    defaultColumn,
    autoResetExpanded: false,
    getRowId,
    getSubRows: (row) => row.subRows as T[],
    onStateChange: handleStateChange,
    onColumnOrderChange: handleColumnOrderChange,
    onRowSelectionChange: handleRowSelectionChange,
    onExpandedChange: handleExpandedChange,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingStateChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onColumnPinningChange: handleColumnPinningStateChange,
    onColumnSizingChange: handleColumnSizingStateChange,
    onGroupingChange: handleGroupingStateChange,
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const leafColumns = table.getVisibleLeafColumns();
  const visibleColumns = leafColumns.filter((column) => !column.getIsPinned());
  const tableRows = table.getRowModel().rows;

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableRef.current,
    horizontal: true,
    overscan: 5,
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    overscan: 5,
    getScrollElement: () => tableRef.current,
    estimateSize: () => rowStimateSize,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  useEffect(() => {
    if (getTableInstance) getTableInstance(table);
  }, [getTableInstance, table]);

  useEffect(() => {
    handleColumnOrderChange(getColumnOrder());
  }, [columnsMemo]);

  useEffect(() => {
    table.toggleAllRowsExpanded(expandAllRows);
  }, [expandAllRows, table.toggleAllRowsExpanded]);

  const tableBodyHeight = rowVirtualizer.getTotalSize();

  const handleRowClick = useCallback(
    (row: Row<T>) => {
      if (onRowClick) onRowClick({ row });
    },
    [onRowClick]
  );

  return (
    <TableDndContext>
      <TableContextProvider table={table}>
        <div
          className={cn(
            'flex flex-col h-full overflow-hidden delay-75',
            open ? 'w-table-open' : 'w-full',
            className
          )}
        >
          <div>
            {tableHeader || tableActions ? (
              <div
                className={cn(
                  'flex items-end justify-between w-full',
                  tableHeader && tableActions ? 'mb-4' : ''
                )}
              >
                {tableHeader && <div>{tableHeader}</div>}
                {tableActions && (
                  <div className="flex items-center h-full gap-1.5">
                    {tableActions}
                    <TableSettings
                      table={table}
                      columnOrder={table.getState().columnOrder}
                    />
                  </div>
                )}
              </div>
            ) : null}
            <AnimatePresence>
              {isLoading && (
                <TopMessage
                  text="Carregando dados..."
                  variant="loading"
                  className="text-green-500 bg-green-100"
                />
              )}
              {isFetching && !isLoading ? (
                <TopMessage text="Atualizando dados..." variant="loading" />
              ) : null}
              {isError ? (
                <TopMessage
                  text={errorMessage || 'Erro ao carregar dados'}
                  variant="error"
                />
              ) : null}
            </AnimatePresence>
          </div>
          <TableContainer ref={virtualizeRows ? tableRef : null}>
            <TableLayout>
              <TableHeader ref={headerRef}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableHeaderGroup
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                    className="w-full"
                  >
                    {virtualPaddingLeft ? (
                      //fake empty column to the left for virtualization scroll padding
                      <div
                        style={{
                          display: 'flex',
                          width: virtualPaddingLeft,
                        }}
                      />
                    ) : null}
                    {headerGroup.headers
                      .filter(
                        (header) => header.column.getIsPinned() === 'left'
                      )
                      .map((header) => {
                        return (
                          <TableColumnHeader key={header.id} header={header} />
                        );
                      })}
                    {virtualColumns.map((vc) => {
                      const header = headerGroup.headers.filter(
                        (header) => !header.column.getIsPinned()
                      )[vc.index];

                      if (!header) return null;

                      return (
                        <TableColumnHeader key={header.id} header={header} />
                      );
                    })}
                    {headerGroup.headers
                      .filter(
                        (header) => header.column.getIsPinned() === 'right'
                      )
                      .map((header) => {
                        return (
                          <TableColumnHeader key={header.id} header={header} />
                        );
                      })}
                    {virtualPaddingRight ? (
                      //fake empty column to the right for virtualization scroll padding
                      <div
                        style={{
                          display: 'flex',
                          width: virtualPaddingRight,
                        }}
                      />
                    ) : null}
                  </TableHeaderGroup>
                ))}
              </TableHeader>
              <TableBody
                style={{
                  height: `${tableBodyHeight}px`,
                }}
              >
                {virtualRows.map((item) => {
                  const row = tableRows[item.index];
                  const visibleCells = row.getVisibleCells();

                  return (
                    <TableRow
                      // ref={(node) =>
                      //     rowVirtualizer.measureElement(
                      //         node
                      //     )
                      // }
                      data-index={item.index}
                      {...(virtualizeRows && {
                        style: {
                          height: `${item.size}px`,
                          transform: `translateY(${item.start}px)`,
                          position: 'absolute',
                        },
                      })}
                      key={row.id}
                      onClick={() => {
                        handleRowClick(row);
                      }}
                    >
                      {virtualPaddingLeft ? (
                        <div
                          style={{
                            display: 'flex',
                            width: virtualPaddingLeft,
                          }}
                        />
                      ) : null}
                      {visibleCells
                        .filter((c) => c.column.getIsPinned() === 'left')
                        .map((cell) => {
                          return (
                            <TableCell
                              key={cell.id}
                              cell={cell as Cell<any, any>}
                            />
                          );
                        })}
                      {virtualColumns.map((vc) => {
                        const cell = visibleCells.filter(
                          (c) => !c.column.getIsPinned()
                        )[vc.index];

                        if (!cell) return null;

                        return (
                          <TableCell
                            key={cell.id}
                            cell={cell as Cell<any, any>}
                          />
                        );
                      })}
                      {visibleCells
                        .filter((c) => c.column.getIsPinned() === 'right')
                        .map((cell) => {
                          return (
                            <TableCell
                              key={cell.id}
                              cell={cell as Cell<any, any>}
                            />
                          );
                        })}
                      {virtualPaddingRight ? (
                        <div
                          style={{
                            display: 'flex',
                            width: virtualPaddingRight,
                          }}
                        />
                      ) : null}
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableLayout>
          </TableContainer>
          {tableState?.pagination && onPaginationChange && (
            <TablePagination
              totalItems={pagination?.totalItems || 0}
              totalPages={pagination?.totalPages || 0}
              selectedPage={tableState.pagination.pageIndex}
              onPageChange={(page) =>
                onPaginationChange({
                  pageIndex: page,
                  pageSize: pagination?.pageSize || 0,
                })
              }
            />
          )}
        </div>
      </TableContextProvider>
    </TableDndContext>
  );
};

export default Table;
