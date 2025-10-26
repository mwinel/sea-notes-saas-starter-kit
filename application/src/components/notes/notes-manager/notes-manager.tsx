'use client';

import { useState, useEffect } from 'react';
import { TableViewContainer } from '@/components/notes/table-view';
import { GridViewContainer } from '@/components/notes/grid-view';

export function NotesManager() {
  const [view, setView] = useState<'table' | 'grid'>('table');

  // Load view preference from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem('notes-view-preference') as 'table' | 'grid' | null;
    if (savedView && (savedView === 'table' || savedView === 'grid')) {
      setView(savedView);
    }
  }, []);

  // Save view preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('notes-view-preference', view);
  }, [view]);

  const handleViewChange = (newView: 'table' | 'grid') => {
    setView(newView);
  };

  return view === 'table' ? (
    <TableViewContainer onViewChange={handleViewChange} />
  ) : (
    <GridViewContainer onViewChange={handleViewChange} />
  );
}
