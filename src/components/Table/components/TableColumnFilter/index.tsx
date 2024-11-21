/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnFilterType } from '@/tanstack';
import { Column } from '@tanstack/react-table';
import { ReactNode } from 'react';
import TableFacetedFilter from '../TableFacetedFilter';
import { Filter } from '../Filter';

type TableColumnFilterProps = {
  column: Column<any>;
};

const TableColumnFilter = ({ column }: TableColumnFilterProps) => {
  const filterType: ColumnFilterType =
    column.columnDef.meta?.header?.columnFilterType ?? 'multiselect';

  const filters: Record<ColumnFilterType, ReactNode> = {
    input: <Filter column={column} />,
    multiselect: <TableFacetedFilter column={column} />,
    select: <Filter column={column} />,
  };

  return filters[filterType];
};

export default TableColumnFilter;
