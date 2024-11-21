/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Header, Table, flexRender } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  FilterIcon,
  Grid2x2X,
  Group,
  Pin,
  PinOff,
  RotateCcw,
  Ungroup,
} from 'lucide-react';
import { TypographyXS } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { Filter } from '../../../Filter';

interface HeaderActionsProps<TData> {
  header: Header<TData, any>;
  table: Table<TData>;
}

const HeaderActions = <T,>({ header, table }: HeaderActionsProps<T>) => {
  const headerDef = header.column.columnDef.header;
  const headerTitle =
    typeof headerDef === 'function'
      ? ''
      : header.column.columnDef.header?.toString();

  const renderMenuItem =
    header.column.columnDef.meta?.header?.menu?.renderMenuItem;

  const menuClassname = header.column.columnDef.meta?.header?.menu?.className;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex flex-1 h-auto gap-2 px-1 py-3 overflow-hidden text-left bg-background',
            menuClassname
          )}
        >
          <div className="flex items-center gap-2">
            {header.column.getIsPinned() && <Pin size={14} />}
            {header.column.getIsGrouped() && (
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            )}
          </div>
          <TypographyXS
            className={cn(
              'flex-1 overflow-hidden font-bold text-foreground text-ellipsis',
              header.column.getIsGrouped() && 'text-primary'
            )}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TypographyXS>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[300px]">
        {header.column.getCanFilter() ? (
          <DropdownMenuGroup>
            <div className="px-2 pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <FilterIcon size={14} className="text-muted-foreground" />
                <TypographyXS className="font-semibold">
                  {header.column.columnDef.header?.toString()}
                </TypographyXS>
              </div>
              <Filter column={header.column} />
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <div className="px-4 py-2">
              <TypographyXS className="font-semibold">
                {headerTitle}
              </TypographyXS>
            </div>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        )}
        {renderMenuItem && (
          <DropdownMenuGroup>
            {renderMenuItem({ header })}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          {header.column.getCanSort() && (
            <>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => header.column.toggleSorting(false)}
              >
                <ArrowUp
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />{' '}
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => header.column.toggleSorting(true)}
              >
                <ArrowDown
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />
                Desc
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => {
                  header.column.clearSorting();
                }}
              >
                <ChevronsUpDown
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />
                Resetar ordem
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {header.column.getCanGroup() && (
            <DropdownMenuItem
              className="gap-2 focus:cursor-pointer group"
              onClick={() => {
                header.column.toggleGrouping();
              }}
            >
              {header.column.getIsGrouped() ? (
                <>
                  <Ungroup
                    className="text-muted-foreground group-hover:text-primary-600"
                    size={14}
                  />
                  Desagrupar
                </>
              ) : (
                <>
                  <Group
                    className="text-muted-foreground group-hover:text-primary-600"
                    size={14}
                  />
                  Agrupar
                </>
              )}
            </DropdownMenuItem>
          )}
          {header.column.getCanPin() && (
            <>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => header.column.pin('left')}
              >
                <ArrowLeft
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />
                Fixar à esquerda
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => header.column.pin('right')}
              >
                <ArrowRight
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />
                Fixar à direita
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 focus:cursor-pointer group"
                onClick={() => header.column.pin(false)}
              >
                <PinOff
                  className="text-muted-foreground group-hover:text-primary-600"
                  size={14}
                />
                Desfixar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
        </DropdownMenuGroup>
        {header.column.getCanHide() && (
          <DropdownMenuItem
            className="gap-2 focus:cursor-pointer group"
            onClick={() => header.column.toggleVisibility(false)}
          >
            <EyeOff
              className="text-muted-foreground group-hover:text-primary-600"
              size={14}
            />{' '}
            Ocultar
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="gap-2 focus:cursor-pointer group"
          onClick={() => {
            header.column.clearSorting();
            header.column.resetSize();
          }}
        >
          <RotateCcw
            className="text-muted-foreground group-hover:text-primary-600"
            size={14}
          />
          Resetar coluna
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 focus:cursor-pointer group"
          onClick={() => {
            table.reset();
          }}
        >
          <Grid2x2X
            className="text-muted-foreground group-hover:text-primary-600"
            size={14}
          />
          Resetar tabela
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderActions;
