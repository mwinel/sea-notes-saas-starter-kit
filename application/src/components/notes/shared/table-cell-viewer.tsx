'use client';

import { useState } from 'react';
import { IconStarFilled } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EditNote } from '@/components/notes/edit-note';
import { NoteTableData } from '@/components/notes/schemas/table-schema';

interface TableCellViewerProps {
  item: NoteTableData;
}

export function TableCellViewer({ item }: TableCellViewerProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const isTruncated = item.title.length > 30;
  const displayTitle = isTruncated ? item.title.substring(0, 30) + '...' : item.title;

  return (
    <>
      <div className="flex items-center gap-1.5">
        {item.isFavorite && (
          <IconStarFilled className="size-3.5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
        )}
        {isTruncated ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="text-foreground w-fit px-0 text-left cursor-pointer font-medium hover:underline underline-offset-4"
                onClick={() => setEditDialogOpen(true)}
              >
                {displayTitle}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              <p className="max-w-md">{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span
            className="text-foreground w-fit px-0 text-left cursor-pointer font-medium hover:underline underline-offset-4"
            onClick={() => setEditDialogOpen(true)}
          >
            {displayTitle}
          </span>
        )}
      </div>
      <EditNote
        noteId={item.id}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}
