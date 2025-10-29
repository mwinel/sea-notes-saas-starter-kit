'use client';

import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FavoritesToggleProps {
  showFavoritesOnly: boolean;
  onToggle: (show: boolean) => void;
}

export function FavoritesToggle({ showFavoritesOnly, onToggle }: FavoritesToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          aria-label="Toggle favorites"
          size="sm"
          variant="outline"
          pressed={showFavoritesOnly}
          onPressedChange={onToggle}
          className="px-2 data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500 font-normal shadow-none cursor-pointer"
        >
          {showFavoritesOnly ? (
            <IconStarFilled aria-hidden className="size-3.5" data-testid="icon-star-filled" />
          ) : (
            <IconStar aria-hidden className="size-3.5" data-testid="icon-star-outline" />
          )}
          <span className="hidden lg:inline">Favorites</span>
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{showFavoritesOnly ? 'Show all notes' : 'Show only favorites'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
