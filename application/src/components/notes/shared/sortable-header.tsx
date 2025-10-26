'use client';

import * as React from 'react';
import { IconCaretUpDownFilled } from '@tabler/icons-react';

interface SortableHeaderProps {
  column: any;
  children: React.ReactNode;
}

export function SortableHeader({ column, children }: SortableHeaderProps) {
  return (
    <div
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center cursor-pointer hover:bg-muted"
    >
      {children}
      <IconCaretUpDownFilled className="ml-1 h-3.5 w-3.5 opacity-30" />
    </div>
  );
}
