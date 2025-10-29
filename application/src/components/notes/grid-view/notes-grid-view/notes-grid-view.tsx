'use client';

import { useMemo, useId } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import {
  NotesToolbar,
  NotesPagination,
  NotesLoadingState,
  NotesErrorState,
  NotesEmptyState,
  DeleteNoteDialog,
} from '@/components/notes/shared';
import { DraggableCard } from '@/components/notes/grid-view/draggable-card';
import { EditNote } from '@/components/notes/edit-note';
import { NoteTableData } from '@/components/notes/schemas';
import { useNoteDialogs } from '@/hooks/use-note-dialogs';
import { useNoteActions } from '@/hooks/use-note-actions';

interface GridViewProps {
  data: NoteTableData[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  selectedCategories: string[];
  selectedStatuses: string[];
  showFavoritesOnly: boolean;
  searchValue: string;
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSelectedCategoriesChange: (categories: string[]) => void;
  onSelectedStatusesChange: (statuses: string[]) => void;
  onShowFavoritesOnlyChange: (show: boolean) => void;
  onSearchChange: (value: string | number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onRefetch: () => void;
  onViewChange: (view: 'table' | 'grid') => void;
}

export function GridView({
  data,
  totalCount,
  isLoading,
  isError,
  isFetching,
  pagination,
  selectedCategories,
  selectedStatuses,
  showFavoritesOnly,
  searchValue,
  onPaginationChange,
  onSelectedCategoriesChange,
  onSelectedStatusesChange,
  onShowFavoritesOnlyChange,
  onSearchChange,
  onDragEnd,
  onRefetch,
  onViewChange,
}: GridViewProps) {
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

  // Use hooks for dialog and action management
  const {
    editingNoteId,
    isEditDialogOpen,
    openEditDialog,
    closeEditDialog,
    deletingNote,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  } = useNoteDialogs();

  const { deleteMutation, favoriteMutation, copyMutation, handleToggleFavorite, handleCopy } =
    useNoteActions();

  const handleDelete = () => {
    if (deletingNote) {
      deleteMutation.mutate(deletingNote.id);
      closeDeleteDialog();
    }
  };

  if (isLoading) {
    return <NotesLoadingState />;
  }

  if (isError) {
    return <NotesErrorState onRefetch={onRefetch} isFetching={isFetching} />;
  }

  if (totalCount === 0 && !searchValue) {
    return <NotesEmptyState />;
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start gap-6">
        <NotesToolbar
          searchValue={searchValue}
          selectedCategories={selectedCategories}
          selectedStatuses={selectedStatuses}
          showFavoritesOnly={showFavoritesOnly}
          view="grid"
          isFetching={isFetching}
          isLoading={isLoading}
          onSearchChange={onSearchChange}
          onSelectedCategoriesChange={onSelectedCategoriesChange}
          onSelectedStatusesChange={onSelectedStatusesChange}
          onShowFavoritesOnlyChange={onShowFavoritesOnlyChange}
          onViewChange={onViewChange}
        />

        <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
          <div className="transition-opacity duration-200">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <SortableContext items={dataIds} strategy={rectSortingStrategy}>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-testid="grid-container"
                >
                  {data.map((item) => (
                    <DraggableCard
                      key={item.id}
                      item={item}
                      isCopyPending={copyMutation.isPending}
                      isFavoritePending={favoriteMutation.isPending}
                      onTitleClick={openEditDialog}
                      onEdit={openEditDialog}
                      onCopy={handleCopy}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={(noteId) => {
                        const note = data.find((n) => n.id === noteId);
                        if (note) openDeleteDialog(noteId, note.title);
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {data.length === 0 && searchValue && <NotesEmptyState searchValue={searchValue} />}

          <NotesPagination
            pagination={pagination}
            totalCount={totalCount}
            selectedCount={0}
            totalRows={data.length}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>

      {/* Render dialogs once at the view level */}
      {isEditDialogOpen && editingNoteId && (
        <EditNote
          noteId={editingNoteId}
          open={isEditDialogOpen}
          onOpenChange={(open) => !open && closeEditDialog()}
        />
      )}

      {isDeleteDialogOpen && deletingNote && (
        <DeleteNoteDialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => !open && closeDeleteDialog()}
          noteTitle={deletingNote.title}
          onConfirm={handleDelete}
          isPending={deleteMutation.isPending}
        />
      )}
    </>
  );
}
