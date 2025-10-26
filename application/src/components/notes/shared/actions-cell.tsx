'use client';

import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { useNoteActions } from '@/hooks/use-note-actions';
import { NoteTableData } from '@/components/notes/schemas/table-schema';
import { NoteActionsMenu } from '@/components/notes/shared/note-actions-menu';
import { DeleteNoteDialog } from '@/components/notes/shared/delete-note-dialog';

interface ActionsCellProps {
  row: Row<NoteTableData>;
}

export function ActionsCell({ row }: ActionsCellProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { deleteMutation, favoriteMutation, copyMutation, handleToggleFavorite, handleCopy } =
    useNoteActions();

  const handleDelete = () => {
    deleteMutation.mutate(row.original.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <NoteActionsMenu
        isFavorite={row.original.isFavorite}
        isCopyPending={copyMutation.isPending}
        isFavoritePending={favoriteMutation.isPending}
        onEdit={() => setEditDialogOpen(true)}
        onCopy={() => handleCopy(row.original.id)}
        onToggleFavorite={() => handleToggleFavorite(row.original.id, !row.original.isFavorite)}
        onDelete={() => setDeleteDialogOpen(true)}
        triggerVariant="dotsVertical"
        triggerClassName="data-[state=open]:bg-muted text-muted-foreground flex size-7"
      />
      <DeleteNoteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        noteTitle={row.original.title}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  );
}
