'use client';

import { useNotesData } from '@/hooks/use-notes-data';
import { DEFAULT_PAGE_SIZE_GRID } from '@/constants/pagination';
import { GridView } from './notes-grid-view';

interface GridViewContainerProps {
  onViewChange: (view: 'table' | 'grid') => void;
}

export function GridViewContainer({ onViewChange }: GridViewContainerProps) {
  const notesData = useNotesData({ pageSize: DEFAULT_PAGE_SIZE_GRID });

  return <GridView {...notesData} onViewChange={onViewChange} />;
}
