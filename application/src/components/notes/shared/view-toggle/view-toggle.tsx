'use client';

import { IconTable, IconLayoutGrid } from '@tabler/icons-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ViewToggleProps {
  view: 'table' | 'grid';
  onViewChange: (view: 'table' | 'grid') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      size="sm"
      value={view}
      onValueChange={(value) => value && onViewChange(value as 'table' | 'grid')}
      variant="outline"
    >
      <ToggleGroupItem value="table" aria-label="Table view">
        <IconTable />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <IconLayoutGrid />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
