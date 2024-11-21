/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from '@tanstack/react-table';
import { useState } from 'react';
import Datalist from './components/Datalist';
import { X } from 'lucide-react';
import { DebouncedInput } from '../DebouncedInput';

export const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const [isOpen, setOpen] = useState(false);
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      {isOpen && <Datalist column={column} />}
      <div className="flex items-center gap-2">
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={(value) => column.setFilterValue(value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          placeholder={`Buscar...`}
          list={isOpen ? column.id + 'list' : undefined}
          className="flex-1 text-xs font-normal"
        />
        <button
          onClick={() => column.setFilterValue('')}
          className="flex items-center justify-center w-4 h-4"
        >
          <X size={12} className="text-foreground" />
        </button>
      </div>
      <div className="h-1" />
    </>
  );
};
