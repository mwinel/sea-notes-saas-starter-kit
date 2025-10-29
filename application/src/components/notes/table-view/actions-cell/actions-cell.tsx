'use client';

import { Row } from '@tanstack/react-table';
import { NoteTableData } from '@/components/notes/schemas/table-schema';
import { NoteActionsMenu } from '@/components/notes/shared/note-actions-menu';

interface ActionsCellProps {
  row: Row<NoteTableData>;
  isCopyPending?: boolean;
  isFavoritePending?: boolean;
  onEdit: (noteId: string) => void;
  onCopy: (noteId: string) => void;
  onToggleFavorite: (noteId: string, isFavorite: boolean) => void;
  onDelete: (noteId: string) => void;
}

export function ActionsCell({
  row,
  isCopyPending = false,
  isFavoritePending = false,
  onEdit,
  onCopy,
  onToggleFavorite,
  onDelete,
}: ActionsCellProps) {
  return (
    <NoteActionsMenu
      isFavorite={row.original.isFavorite}
      isCopyPending={isCopyPending}
      isFavoritePending={isFavoritePending}
      onEdit={() => onEdit(row.original.id)}
      onCopy={() => onCopy(row.original.id)}
      onToggleFavorite={() => onToggleFavorite(row.original.id, !row.original.isFavorite)}
      onDelete={() => onDelete(row.original.id)}
      triggerVariant="dotsVertical"
      triggerClassName="data-[state=open]:bg-muted text-muted-foreground flex size-7"
    />
  );
}
