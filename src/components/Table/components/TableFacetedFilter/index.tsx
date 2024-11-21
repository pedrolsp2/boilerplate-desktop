/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TypographyXS } from '@/components/ui/typography';
import VirtualizedCommand from '../VirtualizedCommand';
import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';

type TableFactedFilterProps = {
  column: Column<any>;
};

const TableFacetedFilter = ({ column }: TableFactedFilterProps) => {
  const columnFilterValue = column.getFilterValue() as string[];

  const sortedUniqueValues = useMemo(
    () =>
      Array.from<string>(new Set(column.getFacetedUniqueValues().keys())).sort(
        (a, b) => {
          if (typeof a === 'string' && typeof b === 'string')
            return a?.localeCompare(b);

          return 0;
        }
      ),
    [column.getFacetedUniqueValues()]
  );

  const totalSelected = columnFilterValue?.length ?? 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start w-full gap-2 text-xs"
        >
          {totalSelected === 0 ? (
            <TypographyXS className="flex-1 text-start">Buscar...</TypographyXS>
          ) : (
            <>
              <TypographyXS className="flex-1 p-1 px-2 overflow-hidden text-xs font-normal rounded-md text-accent-foreground text-ellipsis bg-accent">
                {totalSelected} selecionados
              </TypographyXS>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 p-0" align="start">
        <VirtualizedCommand
          placeholder="Buscar..."
          options={sortedUniqueValues.map((value) => ({
            label: value,
            value,
          }))}
          selectedValues={
            columnFilterValue?.reduce((acc, curr) => {
              return {
                ...acc,
                [curr]: true,
              };
            }, {} as Record<string, boolean>) ?? {}
          }
          onSelectionChange={
            (value) =>
              column.setFilterValue((prev: string[]) => {
                if (!prev) return [value];

                return prev.includes(value)
                  ? prev.filter((val) => val !== value)
                  : [...prev, value];
              })
            // column.setFilterValue(
            //     (prev: Record<string, boolean>) => {
            //         if (!prev)
            //             return {
            //                 [value]: true,
            //             }

            //         return {
            //             ...prev,
            //             [value]: !prev[value],
            //         }
            //     }
            // )
          }
          onClearFilters={() => column.setFilterValue([])}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TableFacetedFilter;
