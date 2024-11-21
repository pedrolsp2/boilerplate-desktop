/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import useDisclosure from './useDisclosure';
import {
  ColumnFiltersState,
  ColumnOrderState,
  ExpandedState,
  PaginationState,
  Row,
  RowSelectionState,
  Table,
  TableState,
} from '@tanstack/react-table';
import { Filter, Operators } from '@/types/Filters';

export const useTable = <T>(token: string) => {
  const state: {
    tableState: TableState;
    columnOrder: ColumnOrderState;
  } = JSON.parse(localStorage.getItem(token) || '{}');

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    state.columnOrder?.filter((column) => !!column) || null
  );
  const [expandedState, setExpandedState] = useState<ExpandedState>({});
  const [selectedRow, setSelectedRow] = useState<Row<T> | null>(null);
  const [tableState, setTableState] = useState<TableState>(
    state.tableState || {}
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [fieldFilters, setFieldFilters] = useState<Filter<T>[]>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const onColumnFiltersChange = (filters: ColumnFiltersState) => {
    if (filters.length > 0) {
      const filter = [
        {
          AND: filters.map((filter) => ({
            CAMPO: filter.id as keyof T,
            VALOR: filter.value as string,
            OPERADOR: Operators.LIKE,
          })),
        },
      ];

      //@ts-ignore
      setFieldFilters(filter);
    } else {
      setFieldFilters([]);
    }

    setColumnFilters(filters);
  };

  const onPaginationChange = ({ pageIndex }: PaginationState) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  };

  const [table, setTable] = useState<Table<T>>();

  const {
    isOpen: isEditDialogOpen,
    onClose: onEditDialogClose,
    onOpen: onEditDialogOpen,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onClose: onDeleteDialogClose,
    onOpen: onDeleteDialogOpen,
  } = useDisclosure();

  const {
    isOpen: isAddDialogOpen,
    onClose: onAddDialogClose,
    onOpen: onAddDialogOpen,
  } = useDisclosure();

  const {
    isOpen: isBulkDialogOpen,
    onClose: onBulkDialogClose,
    onOpen: onBulkDialogOpen,
  } = useDisclosure();

  const onClickEdit = (row: Row<T>) => {
    setSelectedRow(row);
    onEditDialogOpen();
  };

  const onClickDelete = (row: Row<T>) => {
    setSelectedRow(row);
    onDeleteDialogOpen();
  };

  const onClickMultiDelete = () => {
    setSelectedRow(null);
    onDeleteDialogOpen();
  };

  const onClickAdd = () => {
    onAddDialogOpen();
  };

  const onColumnOrderChange = (columnOrderState: ColumnOrderState) => {
    localStorage.setItem(
      token,
      JSON.stringify({ tableState, columnOrder: columnOrderState })
    );
    setColumnOrder(columnOrderState);
  };

  const onTableStateChange = (newState: TableState) => {
    localStorage.setItem(
      token,
      JSON.stringify({ columnOrder, tableState: newState })
    );
    setTableState(newState);
  };

  return {
    table,
    tableState,
    expandedState,
    selectedRows,
    selectedRow,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isBulkDialogOpen,
    columnOrder,
    columnFilters,
    fieldFilters,
    pageIndex,
    pageSize,
    onPaginationChange,
    onColumnFiltersChange,
    onColumnOrderChange,
    setTable,
    onTableStateChange,
    setExpandedState,
    setSelectedRows,
    onAddDialogOpen,
    onAddDialogClose,
    onEditDialogOpen,
    onEditDialogClose,
    onDeleteDialogClose,
    onDeleteDialogOpen,
    onClickAdd,
    onClickDelete,
    onClickEdit,
    onClickMultiDelete,
    onBulkDialogOpen,
    onBulkDialogClose,
  };
};
