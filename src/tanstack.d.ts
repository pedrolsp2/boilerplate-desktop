/* eslint-disable @typescript-eslint/no-explicit-any */
import '@tanstack/react-table';
import { Header, Row } from '@tanstack/react-table';
import { type ClassValue } from 'clsx';
import React from 'react';

export type UpdateData<TData> = (
  id: string | number,
  columnId: keyof TData,
  value: any,
  columnDef: ColumnDef
) => void;

type FormatterFnProps = {
  row: Row<TData>;
  value: any;
};

export type FormatterFn = (props: FormatterFnProps) => string;

type RenderMenuItemProps = {
  header: Header<TData, TValue>;
};

export type ColumnFilterType = 'multiselect' | 'select' | 'input';

export type RenderMenuItemFn = (props: RenderMenuItemProps) => React.ReactNode;
declare module '@tanstack/table-core' {
  interface ColumnMeta {
    enableMenu?: boolean;
    enableColumnOrdering?: boolean;
    enableColumnEditable?: boolean;
    editableColumnType?: 'text' | 'number';
    header?: {
      className?: ClassValue;
      menu?: {
        renderMenuItem?: RenderMenuItemFn;
        className?: ClassValue;
      };
      columnFilterType?: ColumnFilterType;
    };
    cell?: {
      className?: ClassValue;
      formatterFn?: FormatterFn;
    };
    row?: {
      isGrouped?: boolean;
    };
  }
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    tableId?: string | number;
    layout?: 'stretch' | 'default';
    row?: {
      className?: ClassValue;
    };
    header?: {
      className?: ClassValue;
    };
    cell?: {
      className?: ClassValue;
    };
    updateData?: UpdateData<TData>;
  }
}
