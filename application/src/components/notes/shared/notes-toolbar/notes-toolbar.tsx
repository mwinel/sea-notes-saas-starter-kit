'use client';

import { CreateNote } from '@/components/notes/create-note';
import { DebouncedSearchInput } from '@/components/shared/debounced-search-input';
import { MultiSelectFilter } from '@/components/ui/multi-select-filter';
import { ViewToggle } from '@/components/notes/shared';
import { FavoritesToggle } from '../favorites-toggle';
import { AVAILABLE_CATEGORIES, AVAILABLE_STATUSES } from '@/components/notes/schemas';

interface NotesToolbarProps {
  searchValue: string;
  selectedCategories: string[];
  selectedStatuses: string[];
  showFavoritesOnly: boolean;
  view: 'table' | 'grid';
  isFetching: boolean;
  isLoading: boolean;
  onSearchChange: (value: string | number) => void;
  onSelectedCategoriesChange: (categories: string[]) => void;
  onSelectedStatusesChange: (statuses: string[]) => void;
  onShowFavoritesOnlyChange: (show: boolean) => void;
  onViewChange: (view: 'table' | 'grid') => void;
}

export function NotesToolbar({
  searchValue,
  selectedCategories,
  selectedStatuses,
  showFavoritesOnly,
  view,
  isFetching,
  isLoading,
  onSearchChange,
  onSelectedCategoriesChange,
  onSelectedStatusesChange,
  onShowFavoritesOnlyChange,
  onViewChange,
}: NotesToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-6">
      <div className="flex items-center gap-2 flex-1">
        <DebouncedSearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search notes..."
          debounce={300}
          isLoading={!!searchValue && isFetching && !isLoading}
        />
        <MultiSelectFilter
          options={AVAILABLE_CATEGORIES}
          selectedValues={selectedCategories}
          onSelectedChange={onSelectedCategoriesChange}
          buttonLabel="Filter by Category"
          searchPlaceholder="Search categories..."
          emptyMessage="No category found."
        />
        <MultiSelectFilter
          options={AVAILABLE_STATUSES}
          selectedValues={selectedStatuses}
          onSelectedChange={onSelectedStatusesChange}
          buttonLabel="Filter by Status"
          searchPlaceholder="Search statuses..."
          emptyMessage="No status found."
          showSearch={false}
        />
        <FavoritesToggle
          showFavoritesOnly={showFavoritesOnly}
          onToggle={onShowFavoritesOnlyChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <ViewToggle view={view} onViewChange={onViewChange} />
        <CreateNote />
      </div>
    </div>
  );
}
