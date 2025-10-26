'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { NotesApiClient } from '@/lib/api/notes';

const apiClient = new NotesApiClient();

interface UseNoteActionsReturn {
  deleteMutation: {
    mutate: (noteId: string) => void;
    isPending: boolean;
  };
  favoriteMutation: {
    mutate: (params: { noteId: string; isFavorite: boolean }) => void;
    isPending: boolean;
  };
  copyMutation: {
    mutate: (noteId: string) => void;
    isPending: boolean;
  };
  handleDelete: (noteId: string) => void;
  handleToggleFavorite: (noteId: string, isFavorite: boolean) => void;
  handleCopy: (noteId: string) => void;
}

export function useNoteActions(): UseNoteActionsReturn {
  const queryClient = useQueryClient();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => apiClient.deleteNote(noteId),
    onSuccess: () => {
      toast.success('Note deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error('Failed to delete note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  // Favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: ({ noteId, isFavorite }: { noteId: string; isFavorite: boolean }) =>
      apiClient.toggleFavorite(noteId, isFavorite),
    onSuccess: (_, variables) => {
      toast.success(
        variables.isFavorite ? 'Note added to favorites!' : 'Note removed from favorites!'
      );
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error('Failed to update favorite', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  // Copy mutation
  const copyMutation = useMutation({
    mutationFn: async (noteId: string) => {
      const originalNote = await apiClient.getNote(noteId);
      return apiClient.createNote({
        title: `Copy - ${originalNote.title}`,
        content: originalNote.content,
        category: originalNote.category || undefined,
        status: originalNote.status || undefined,
      });
    },
    onSuccess: () => {
      toast.success('Note copied successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error('Failed to copy note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  const handleToggleFavorite = (noteId: string, isFavorite: boolean) => {
    favoriteMutation.mutate({ noteId, isFavorite });
  };

  const handleCopy = (noteId: string) => {
    copyMutation.mutate(noteId);
  };

  return {
    deleteMutation: {
      mutate: handleDelete,
      isPending: deleteMutation.isPending,
    },
    favoriteMutation: {
      mutate: (params: { noteId: string; isFavorite: boolean }) => favoriteMutation.mutate(params),
      isPending: favoriteMutation.isPending,
    },
    copyMutation: {
      mutate: handleCopy,
      isPending: copyMutation.isPending,
    },
    handleDelete,
    handleToggleFavorite,
    handleCopy,
  };
}
