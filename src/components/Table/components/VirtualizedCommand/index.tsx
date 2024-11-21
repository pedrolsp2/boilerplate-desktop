import { TypographyP } from '@/components/ui/typography';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';

export type FacetedFilterOption = {
  label: string;
  value: string;
};

type VirtualizedCommandProps = {
  placeholder?: string;
  options: FacetedFilterOption[];
  selectedValues: Record<string, boolean>;
  onSelectionChange: (value: string) => void;
  onClearFilters?: () => void;
};

const VirtualizedCommand = ({
  options,
  selectedValues,
  placeholder,
  onSelectionChange,
  onClearFilters,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    useState<FacetedFilterOption[]>(options);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) => {
        const searchValue = search.trim().toLowerCase();
        const value = option.value.trim().toLowerCase();
        const label = option.label.trim().toLowerCase();

        return value.includes(searchValue) || label.includes(searchValue);
      })
    );
  };

  const virtualizer = useVirtualizer({
    getScrollElement: () => containerRef.current,
    count: filteredOptions.length,
    overscan: 4,
    estimateSize: () => 30,
  });

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder={placeholder}
        className="text-xs font-normal"
        onValueChange={handleSearch}
      />
      <CommandList ref={containerRef}>
        <CommandEmpty>Nenhum resultado</CommandEmpty>
        <CommandGroup
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((item) => {
            const option = filteredOptions[item.index];

            if (!option) return null;

            const isSelected = selectedValues[option.value];

            return (
              <CommandItem
                key={option.value}
                value={option.value}
                className="w-full gap-2 overflow-hidden"
                onSelect={() => onSelectionChange(option.value)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${item.size}px`,
                  transform: `translateY(${item.start}px)`,
                }}
              >
                <Checkbox checked={isSelected} />
                <TooltipProvider>
                  <Tooltip delayDuration={400}>
                    <TooltipTrigger asChild>
                      <TypographyP className="overflow-hidden text-xs font-normal whitespace-nowrap text-ellipsis">
                        {option.label}
                      </TypographyP>
                    </TooltipTrigger>
                    <TooltipContent
                      align="start"
                      className="shadow-lg bg-accent text-accent-foreground"
                    >
                      {option.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
      {onClearFilters && (
        <>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              className="justify-center p-2 text-xs"
              onSelect={() => onClearFilters()}
            >
              Limpar filtro
            </CommandItem>
          </CommandGroup>
        </>
      )}
    </Command>
  );
};

export default VirtualizedCommand;
