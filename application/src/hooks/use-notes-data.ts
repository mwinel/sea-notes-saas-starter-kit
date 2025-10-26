'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayMove } from '@dnd-kit/sortable';
import { type DragEndEvent } from '@dnd-kit/core';
import { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { toast } from 'sonner';
import { NotesApiClient } from '@/lib/api/notes';
import { NoteTableData } from '@/components/notes/schemas';

const apiClient = new NotesApiClient();

interface UseNotesDataProps {
  pageSize: number;
}

interface UseNotesDataReturn {
  data: NoteTableData[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  rowSelection: Record<string, boolean>;
  columnVisibility: VisibilityState;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  selectedCategories: string[];
  selectedStatuses: string[];
  showFavoritesOnly: boolean;
  localData: NoteTableData[];
  searchValue: string;
  onRowSelectionChange: (selection: Record<string, boolean>) => void;
  onColumnVisibilityChange: (visibility: VisibilityState) => void;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
  onSortingChange: (sorting: SortingState) => void;
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSelectedCategoriesChange: (categories: string[]) => void;
  onSelectedStatusesChange: (statuses: string[]) => void;
  onShowFavoritesOnlyChange: (show: boolean) => void;
  onSearchChange: (value: string | number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onRefetch: () => void;
}

export function useNotesData({ pageSize }: UseNotesDataProps): UseNotesDataReturn {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [localData, setLocalData] = useState<NoteTableData[]>([]);
  const queryClient = useQueryClient();

  const {
    data: apiData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      'notes',
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
      sorting,
      selectedCategories,
      selectedStatuses,
      showFavoritesOnly,
    ],
    queryFn: () => {
      const globalFilter = columnFilters.find((filter) => filter.id === 'global');
      return apiClient.getNotes({
        page: pagination.pageIndex + 1, // Backend expects 1-indexed pages
        pageSize: pagination.pageSize,
        search: globalFilter?.value as string,
        sortBy:
          sorting.length > 0 ? `${sorting[0].id}:${sorting[0].desc ? 'desc' : 'asc'}` : undefined,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        statuses: selectedStatuses.length > 0 ? selectedStatuses : undefined,
        isFavorite: showFavoritesOnly ? true : undefined,
      });
    },
    placeholderData: (previousData) => previousData,
  });

  const data = useMemo(() => apiData?.notes || [], [apiData]);
  const totalCount = apiData?.total || 0;

  // Sync local data with API data
  useEffect(() => {
    if (data.length > 0) {
      setLocalData(data);
    }
  }, [data]);

  // Mutation for reordering notes
  const reorderMutation = useMutation({
    mutationFn: (items: { id: string; position: number }[]) => apiClient.reorderNotes(items),
    onSuccess: () => {
      // Invalidate and refetch notes queries to sync with server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error('Failed to reorder notes', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      // Revert to server data on error
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // Optimistically update local state
      setLocalData((currentData) => {
        const oldIndex = currentData.findIndex((item) => item.id === active.id);
        const newIndex = currentData.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return currentData;

        // Reorder the array
        const reorderedData = arrayMove(currentData, oldIndex, newIndex);

        // Update positions based on new order
        const updatedData = reorderedData.map((item, index) => ({
          ...item,
          position: index,
        }));

        // Persist to backend
        const reorderItems = updatedData.map((item) => ({
          id: item.id,
          position: item.position,
        }));
        reorderMutation.mutate(reorderItems);

        return updatedData;
      });
    }
  };

  const handleSearchChange = (value: string | number) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== 'global');
      if (value) {
        return [...filtered, { id: 'global', value }];
      }
      return filtered;
    });
  };

  const searchValue = (columnFilters.find((filter) => filter.id === 'global')?.value as string) || '';

  return {
    data: localData,
    totalCount,
    isLoading,
    isError,
    isFetching,
    rowSelection,
    columnVisibility,
    columnFilters,
    sorting,
    pagination,
    selectedCategories,
    selectedStatuses,
    showFavoritesOnly,
    localData,
    searchValue,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onSelectedCategoriesChange: setSelectedCategories,
    onSelectedStatusesChange: setSelectedStatuses,
    onShowFavoritesOnlyChange: setShowFavoritesOnly,
    onSearchChange: handleSearchChange,
    onDragEnd: handleDragEnd,
    onRefetch: refetch,
  };
}
