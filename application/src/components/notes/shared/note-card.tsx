'use client';

import { useState } from 'react';
import { useNoteActions } from '@/hooks/use-note-actions';
import { getCategoryColor } from '@/constants/notes';
import { IconStarFilled, IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EditNote } from '@/components/notes/edit-note';
import { NoteActionsMenu } from '@/components/notes/shared/note-actions-menu';
import { DeleteNoteDialog } from '@/components/notes/shared/delete-note-dialog';
import { NoteTableData } from '@/components/notes/schemas';

interface NoteCardProps {
  item: NoteTableData;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
}

export function NoteCard({ item, isSelected = false, onSelectionChange }: NoteCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { deleteMutation, favoriteMutation, copyMutation, handleToggleFavorite, handleCopy } =
    useNoteActions();

  const handleDelete = () => {
    deleteMutation.mutate(item.id);
    setDeleteDialogOpen(false);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const categoryColorClasses = getCategoryColor(item.category);

  return (
    <>
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
              isCopyPending={copyMutation.isPending}
              isFavoritePending={favoriteMutation.isPending}
              onEdit={() => setEditDialogOpen(true)}
              onCopy={() => handleCopy(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id, !item.isFavorite)}
              onDelete={() => setDeleteDialogOpen(true)}
              triggerVariant="dots"
            />
          </div>
        </div>
        <h3
          className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:underline underline-offset-2"
          onClick={handleTitleClick}
        >
          {item.title}
        </h3>
        <div className="relative min-h-[2.5rem]">
          <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
          <div className="absolute bottom-0 right-0 h-6 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
        <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
      </Card>
      <EditNote noteId={item.id} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
      <DeleteNoteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        noteTitle={item.title}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  );
}
