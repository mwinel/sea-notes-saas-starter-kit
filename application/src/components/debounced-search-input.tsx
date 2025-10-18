import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { cn } from '@/lib/utils';

export function DebouncedSearchInput({
  value: initialValue,
  onChange,
  debounce = 200,
  isLoading = false,
  className,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  isLoading?: boolean;
} & Omit<React.ComponentProps<typeof Input>, 'onChange'>) {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={cn(
        'flex flex-1 max-w-xs h-8 border border-input rounded-md overflow-hidden shadow-xs',
        className
      )}
    >
      <div className="flex items-center justify-center px-2.5 border-r border-input bg-muted/50">
        {value && isLoading ? (
          <Spinner aria-label="Loading" />
        ) : (
          <IconSearch className="text-muted-foreground h-4 w-4" />
        )}
      </div>
      <Input
        {...props}
        value={value ?? ''}
        onChange={(e) => {
          if (e.target.value === '') return setValue('');
          if (props.type === 'number') {
            setValue(e.target.valueAsNumber);
          } else {
            setValue(e.target.value);
          }
        }}
        className="flex-1 h-full border-0 rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
