'use client';

/**
 * EditNote Component
 *
 * Component for editing existing notes with pre-populated data.
 */
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { NotesApiClient } from '@/lib/api/notes';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { NoteForm } from '@/components/notes/shared';
import { noteValidationSchema } from '@/components/notes/schemas';
import { NoteFormData } from '@/constants/notes';

interface EditNoteProps {
  noteId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const apiClient = new NotesApiClient();

export function EditNote({ noteId, open, onOpenChange }: EditNoteProps) {
  const resolver = useYupValidationResolver(noteValidationSchema);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, watch } = useForm<NoteFormData>({
    resolver,
    defaultValues: {
      category: 'Personal',
      status: 'Draft',
    },
  });
  const titleValue = watch('title') || '';
  const contentValue = watch('content') || '';
  const categoryValue = watch('category') || 'Personal';
  const statusValue = watch('status') || 'Draft';

  // Fetch note data
  const {
    data: noteData,
    isLoading: isLoadingNote,
    error: fetchError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => apiClient.getNote(noteId),
    enabled: open && !!noteId,
  });

  // Populate form with note data when fetched
  useEffect(() => {
    if (noteData) {
      reset({
        title: noteData.title,
        content: noteData.content,
        category: noteData.category || 'Personal',
        status: noteData.status || 'Draft',
      });
    }
  }, [noteData, reset]);

  // Update mutation for editing notes
  const updateNoteMutation = useMutation({
    mutationFn: (data: NoteFormData) => apiClient.updateNote(noteId, data),
    onSuccess: () => {
      toast.success('Note updated successfully!');
      // Invalidate and refetch notes queries
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', noteId] });
      // Close dialog
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error('Failed to update note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    updateNoteMutation.mutate(data);
  };

  const isSubmitting = updateNoteMutation.isPending;

  // Show error state if fetch failed
  if (fetchError) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent data-testid="edit-note-dialog-content">
          <DialogHeader>
            <DialogTitle>Error Loading Note</DialogTitle>
            <DialogDescription>Failed to load the note. Please try again.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        data-testid="edit-note-dialog-content"
      >
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>Update your note with the following details.</DialogDescription>
        </DialogHeader>
        {isLoadingNote ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <Spinner aria-label="Loading note" />
              <span>Loading note...</span>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-4" data-testid="edit-note-dialog-form">
            <NoteForm
              title={titleValue}
              content={contentValue}
              category={categoryValue}
              status={statusValue}
              onTitleChange={(value) => setValue('title', value)}
              onContentChange={(value) => setValue('content', value)}
              onCategoryChange={(value) => setValue('category', value)}
              onStatusChange={(value) => setValue('status', value)}
              isSubmitting={isSubmitting}
            />
            <DialogFooter className="flex !justify-between items-center">
              <Button variant="gradient" type="button" disabled={isSubmitting}>
                ✨ Generate Note with AI
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  data-testid="close-dialog-button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  data-testid="submit-button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting || (!titleValue?.trim() && !contentValue?.trim())}
                >
                  {isSubmitting ? 'Updating...' : 'Update Note'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
