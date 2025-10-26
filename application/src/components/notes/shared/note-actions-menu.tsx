'use client';

import { IconDots, IconDotsVertical } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NoteActionsMenuProps {
  isFavorite: boolean;
  isCopyPending: boolean;
  isFavoritePending: boolean;
  onEdit: () => void;
  onCopy: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
  triggerVariant?: 'dots' | 'dotsVertical';
  triggerClassName?: string;
}

export function NoteActionsMenu({
  isFavorite,
  isCopyPending,
  isFavoritePending,
  onEdit,
  onCopy,
  onToggleFavorite,
  onDelete,
  triggerVariant = 'dots',
  triggerClassName,
}: NoteActionsMenuProps) {
  const IconComponent = triggerVariant === 'dotsVertical' ? IconDotsVertical : IconDots;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={triggerClassName}
          onClick={(e) => e.stopPropagation()}
        >
          <IconComponent />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={onCopy} disabled={isCopyPending}>
          {isCopyPending ? 'Copying...' : 'Make a copy'}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onToggleFavorite} disabled={isFavoritePending}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
