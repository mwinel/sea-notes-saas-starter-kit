'use client';

import { IconStarFilled, IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NoteActionsMenu } from '@/components/notes/shared/note-actions-menu';
import { NoteTableData } from '@/components/notes/schemas';
import { getCategoryColor } from '@/constants/notes';
import { formatNoteDate } from '@/helpers/date-format';

interface NoteCardProps {
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

export function NoteCard({
  item,
  isSelected = false,
  isCopyPending = false,
  isFavoritePending = false,
  onTitleClick,
  onEdit,
  onCopy,
  onToggleFavorite,
  onDelete,
  onSelectionChange,
}: NoteCardProps) {
  const categoryColorClasses = getCategoryColor(item.category);

  return (
    <Card className="group relative shadow-none rounded-lg gap-3 px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {item.category && (
            <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${categoryColorClasses}`}>
              {item.category}
            </Badge>
          )}
          {item.status && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-muted-foreground">
              {item.status === 'Done' ? (
                <IconCircleCheckFilled className="size-3 fill-green-500 dark:fill-green-400 mr-1" />
              ) : (
                <IconLoader className="size-3 mr-1" />
              )}
              {item.status}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {item.isFavorite && (
            <Button variant="ghost" size="icon-sm" onClick={(e) => e.stopPropagation()}>
              <IconStarFilled className="size-4 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
            </Button>
          )}
          <NoteActionsMenu
            isFavorite={item.isFavorite}
            isCopyPending={isCopyPending}
            isFavoritePending={isFavoritePending}
            onEdit={() => onEdit(item.id)}
            onCopy={() => onCopy(item.id)}
            onToggleFavorite={() => onToggleFavorite(item.id, !item.isFavorite)}
            onDelete={() => onDelete(item.id)}
            triggerVariant="dots"
          />
        </div>
      </div>
      <h3
        className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:underline underline-offset-2"
        onClick={(e) => {
          e.stopPropagation();
          onTitleClick(item.id);
        }}
      >
        {item.title}
      </h3>
      <div className="relative min-h-[2.5rem]">
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        <div className="absolute bottom-0 right-0 h-6 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
      <p className="text-xs text-muted-foreground">{formatNoteDate(item.createdAt)}</p>
    </Card>
  );
}
