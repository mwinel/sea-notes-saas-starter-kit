'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from '@tabler/icons-react';
import { NoteCard } from './note-card';
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
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/card:opacity-100 transition-opacity"
      >
        <div className="bg-background/90 backdrop-blur-sm rounded p-1.5 border shadow-md hover:bg-muted">
          <IconGripVertical className="size-4 text-muted-foreground" />
        </div>
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
