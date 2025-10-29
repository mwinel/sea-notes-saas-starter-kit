'use client';

import { IconStarFilled } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { NoteTableData } from '@/components/notes/schemas/table-schema';

interface TableCellViewerProps {
  item: NoteTableData;
  onTitleClick: (noteId: string) => void;
  maxTitleLength?: number;
}

export function TableCellViewer({ item, onTitleClick, maxTitleLength = 30 }: TableCellViewerProps) {
  const isTruncated = item.title.length > maxTitleLength;
  const displayTitle = isTruncated ? item.title.substring(0, maxTitleLength) + '...' : item.title;

  const handleClick = () => {
    onTitleClick(item.id);
  };

  return (
    <div className="flex items-center gap-1.5">
      {item.isFavorite && (
        <IconStarFilled className="size-3.5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
      )}
      {isTruncated ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="text-foreground w-fit px-0 text-left cursor-pointer font-medium hover:underline underline-offset-4"
              onClick={handleClick}
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
          onClick={handleClick}
        >
          {displayTitle}
        </span>
      )}
    </div>
  );
}
