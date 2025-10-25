'use client';

/**
 * CreateNoteDialog Component with AI Content Generation
 *
 * Component for creating new notes with optional AI features.
 */
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NotesApiClient } from '@/lib/api/notes';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { NoteForm } from '@/components/notes/shared';
import { NoteFormData } from '@/constants/notes';
import { noteValidationSchema } from '@/components/notes/schemas';

const apiClient = new NotesApiClient();

export function CreateNote() {
  const [openDialog, setOpenDialog] = useState(false);
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

  // Create mutation for posting notes
  const createNoteMutation = useMutation({
    mutationFn: (data: NoteFormData) => apiClient.createNote(data),
    onSuccess: () => {
      toast.success('Note created successfully!');
      // Invalidate and refetch notes queries
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // Reset form and close dialog
      reset();
      setOpenDialog(false);
    },
    onError: (error) => {
      toast.error('Failed to create note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    createNoteMutation.mutate(data);
  };

  const isSubmitting = createNoteMutation.isPending;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" data-testid="open-dialog-button">
          <IconPlus className="size-4" />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        data-testid="create-note-dialog-content"
      >
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>Create a new note with the following details.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" data-testid="create-note-dialog-form">
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
            <Button
              variant="gradient"
              type="button"
              disabled={isSubmitting}
              data-testid="generate-note-with-ai-button"
            >
              ✨ Generate Note with AI
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpenDialog(false)}
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
                {isSubmitting ? 'Creating...' : 'Create Note'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
