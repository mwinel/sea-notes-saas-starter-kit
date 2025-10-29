'use client';

import { useNotesData } from '@/hooks/use-notes-data';
import { DEFAULT_PAGE_SIZE_TABLE } from '@/constants/pagination';
import { TableView } from '@/components/notes/table-view';

interface TableViewContainerProps {
  onViewChange: (view: 'table' | 'grid') => void;
}

export function TableViewContainer({ onViewChange }: TableViewContainerProps) {
  const notesData = useNotesData({ pageSize: DEFAULT_PAGE_SIZE_TABLE });

  return <TableView {...notesData} onViewChange={onViewChange} />;
}
