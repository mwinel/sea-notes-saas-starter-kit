'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface FilterOption<T extends string = string> {
  value: T;
  label?: string;
  className?: string;
  render?: (option: FilterOption<T>) => React.ReactNode;
}

interface MultiSelectFilterProps<T extends string = string> {
  options: readonly T[] | FilterOption<T>[];
  selectedValues: T[];
  onSelectedChange: (selected: T[]) => void;
  placeholder?: string;
  buttonLabel?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  clearLabel?: string;
  icon?: React.ReactNode;
  showSearch?: boolean;
  getOptionClassName?: (value: T) => string;
  renderOption?: (option: FilterOption<T>, isSelected: boolean) => React.ReactNode;
}

export function MultiSelectFilter<T extends string = string>({
  options,
  selectedValues,
  onSelectedChange,
  placeholder = 'Filter',
  buttonLabel,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  clearLabel = 'Clear filters',
  icon,
  showSearch = true,
  getOptionClassName,
  renderOption,
}: MultiSelectFilterProps<T>) {
  const [open, setOpen] = React.useState(false);

  // Normalize options to FilterOption format
  const normalizedOptions = React.useMemo<FilterOption<T>[]>(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return {
          value: opt as T,
          label: opt,
          className: getOptionClassName?.(opt as T),
        };
      }
      return {
        ...opt,
        label: opt.label || opt.value,
        className: opt.className || getOptionClassName?.(opt.value),
      };
    });
  }, [options, getOptionClassName]);

  const toggleOption = (value: T) => {
    const isSelected = selectedValues.includes(value);
    if (isSelected) {
      onSelectedChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectedChange([...selectedValues, value]);
    }
  };

  const clearFilters = () => {
    onSelectedChange([]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="font-normal">
          {icon}
          <span className="hidden lg:inline">{buttonLabel || placeholder}</span>
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="rounded-full px-1.5 font-normal">
              {selectedValues.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          {showSearch && <CommandInput placeholder={searchPlaceholder} />}
          <CommandList>
            {showSearch && <CommandEmpty>{emptyMessage}</CommandEmpty>}
            <CommandGroup>
              {normalizedOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                  <CommandItem key={option.value} onSelect={() => toggleOption(option.value)}>
                    {renderOption ? (
                      renderOption(option, isSelected)
                    ) : (
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox checked={isSelected} className="pointer-events-none" />
                        {option.render ? (
                          option.render(option)
                        ) : option.className ? (
                          <Badge variant="outline" className={`px-1.5 ${option.className}`}>
                            {option.label}
                          </Badge>
                        ) : (
                          <span>{option.label}</span>
                        )}
                      </div>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {selectedValues.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={clearFilters} className="justify-center text-center">
                  {clearLabel}
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
