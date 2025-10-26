'use client';

import { IconExclamationCircleFilled } from '@tabler/icons-react';
import { LoadingState } from '@/components/shared/loading-state';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';

interface NotesLoadingStateProps {
  message?: string;
}

export function NotesLoadingState({ message = 'Loading notes...' }: NotesLoadingStateProps) {
  return <LoadingState message={message} />;
}

interface NotesErrorStateProps {
  onRefetch: () => void;
  isFetching: boolean;
}

export function NotesErrorState({ onRefetch, isFetching }: NotesErrorStateProps) {
  return (
    <ErrorState
      icon={<IconExclamationCircleFilled className="size-10 text-destructive" />}
      title="Oops! Something went wrong"
      titleClassName="text-destructive"
      description="We couldn't load your notes. Please check your connection and try again."
      action={{
        label: 'Try Again',
        onClick: onRefetch,
        loading: isFetching,
      }}
    />
  );
}

interface NotesEmptyStateProps {
  searchValue?: string;
}

export function NotesEmptyState({ searchValue }: NotesEmptyStateProps) {
  if (searchValue) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No results found for "{searchValue}"</p>
      </div>
    );
  }

  return (
    <EmptyState
      title="No notes found"
      description="Create your first note to get started."
      action={{
        label: 'Create Note',
      }}
    />
  );
}
