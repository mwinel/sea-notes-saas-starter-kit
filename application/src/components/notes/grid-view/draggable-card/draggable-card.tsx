'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { NoteCard } from '@/components/notes/grid-view/note-card';
import { NoteTableData } from '@/components/notes/schemas';

interface DraggableCardProps {
  item: NoteTableData;
  isSelected?: boolean;
  isCopyPending?: boolean;
  isFavoritePending?: boolean;
  onTitleClick: (noteId: string) => void;
  onEdit: (noteId: string) => void;
  onCopy: (noteId: string) => void;
  onToggleFavorite: (noteId: string, isFavorite: boolean) => void;
  onDelete: (noteId: string) => void;
  onSelectionChange?: (selected: boolean) => void;
}

export function DraggableCard({
  item,
  isSelected,
  isCopyPending,
  isFavoritePending,
  onTitleClick,
  onEdit,
  onCopy,
  onToggleFavorite,
  onDelete,
  onSelectionChange,
}: DraggableCardProps) {
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`group/card relative transition-all duration-200 ${
        isDragging ? 'opacity-50 z-50' : 'opacity-100'
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-2 right-2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/card:opacity-100 transition-opacity"
      >
        <Button variant="ghost" size="icon-sm">
          <IconGripVertical className="text-muted-foreground size-4" />
          <span className="sr-only">Drag to reorder</span>
        </Button>
      </div>
      <NoteCard
        item={item}
        isSelected={isSelected}
        isCopyPending={isCopyPending}
        isFavoritePending={isFavoritePending}
        onTitleClick={onTitleClick}
        onEdit={onEdit}
        onCopy={onCopy}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}
