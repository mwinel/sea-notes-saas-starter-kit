'use client';

import { useState } from 'react';

interface UseNoteDialogsReturn {
  editingNoteId: string | null;
  isEditDialogOpen: boolean;
  openEditDialog: (noteId: string) => void;
  closeEditDialog: () => void;
  deletingNote: { id: string; title: string } | null;
  isDeleteDialogOpen: boolean;
  openDeleteDialog: (noteId: string, noteTitle: string) => void;
  closeDeleteDialog: () => void;
}

export function useNoteDialogs(): UseNoteDialogsReturn {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [deletingNote, setDeletingNote] = useState<{ id: string; title: string } | null>(null);

  return {
    editingNoteId,
    isEditDialogOpen: !!editingNoteId,
    openEditDialog: setEditingNoteId,
    closeEditDialog: () => setEditingNoteId(null),
    deletingNote,
    isDeleteDialogOpen: !!deletingNote,
    openDeleteDialog: (noteId: string, noteTitle: string) =>
      setDeletingNote({ id: noteId, title: noteTitle }),
    closeDeleteDialog: () => setDeletingNote(null),
  };
}
