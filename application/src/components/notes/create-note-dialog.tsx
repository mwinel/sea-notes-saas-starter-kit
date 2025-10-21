'use client';

/**
 * CreateNoteDialog Component with AI Content Generation
 *
 * Unified component for creating, editing, and viewing notes with optional AI features.
 */
import { ReactNode, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NotesApiClient } from '@/lib/api/notes';
import { hasDigitalOceanGradientAIEnabled } from '@/settings';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateNoteDialogProps {
  trigger: ReactNode;
  mode: 'create' | 'edit' | 'view';
  noteId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (note: { id?: string; title?: string; content: string }) => void;
  onCancel?: () => void;
}

type CreateNoteData = {
  title?: string;
  content: string;
  category: string;
  status: string;
};

const validationSchema = yup.object().shape({
  title: yup.string().optional(),
  content: yup.string().optional(),
  category: yup.string().optional(),
  status: yup.string().optional(),
});

const apiClient = new NotesApiClient();

const categories = [
  {
    value: 'Personal',
    label: 'Personal',
  },
  {
    value: 'Work',
    label: 'Work',
  },
  {
    value: 'Ideas',
    label: 'Ideas',
  },
  {
    value: 'Projects',
    label: 'Projects',
  },
  {
    value: 'Meetings',
    label: 'Meetings',
  },
  {
    value: 'Tasks',
    label: 'Tasks',
  },
  {
    value: 'Research',
    label: 'Research',
  },
  {
    value: 'Goals',
    label: 'Goals',
  },
  {
    value: 'Journal',
    label: 'Journal',
  },
  {
    value: 'Books',
    label: 'Books',
  },
  {
    value: 'Learning',
    label: 'Learning',
  },
  {
    value: 'Travel',
    label: 'Travel',
  },
  {
    value: 'Shopping',
    label: 'Shopping',
  },
];

export function CreateNoteDialog({
  trigger,
  mode,
  noteId,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: CreateNoteDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [openFramework, setOpenFramework] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const queryClient = useQueryClient();

  // Use external open state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const { register, handleSubmit, reset, setValue, watch } = useForm<CreateNoteData>({
    resolver,
    defaultValues: {
      category: 'Personal',
      status: 'Draft',
    },
  });
  const titleValue = watch('title');
  const contentValue = watch('content');
  const categoryValue = watch('category');
  const statusValue = watch('status');

  // Fetch note data when in edit mode
  const { data: noteData, isLoading: isLoadingNote } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => apiClient.getNote(noteId!),
    enabled: mode === 'edit' && !!noteId,
  });

  // Populate form with note data when fetched
  useEffect(() => {
    if (noteData && mode === 'edit') {
      reset({
        title: noteData.title,
        content: noteData.content,
        category: noteData.category || 'Personal',
        status: noteData.status || 'Draft',
      });
    }
  }, [noteData, mode, reset]);

  // Create mutation for posting notes
  const createNoteMutation = useMutation({
    mutationFn: (data: CreateNoteData) => apiClient.createNote(data),
    onSuccess: () => {
      toast.success('Note created successfully!');
      // Invalidate and refetch notes queries
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // Reset form and close dialog
      reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to create note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  // Update mutation for editing notes
  const updateNoteMutation = useMutation({
    mutationFn: (data: CreateNoteData) => apiClient.updateNote(noteId!, data),
    onSuccess: () => {
      toast.success('Note updated successfully!');
      // Invalidate and refetch notes queries
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', noteId] });
      // Reset form and close dialog
      reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to update note', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    },
  });

  const onSubmit = async (data: CreateNoteData) => {
    if (mode === 'edit') {
      updateNoteMutation.mutate(data);
    } else {
      createNoteMutation.mutate(data);
    }
  };

  const isSubmitting = createNoteMutation.isPending || updateNoteMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit note' : 'Create a new note'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update your note with the following details.'
              : 'Create a new note with the following details.'}
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" data-testid="create-note-form">
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                id="title"
                placeholder="Title (optional - will auto-generate if empty)"
                {...register('title')}
                disabled={isSubmitting || isLoadingNote}
              />
            </Field>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                id="content"
                placeholder="Start typing your note..."
                {...register('content')}
                disabled={isSubmitting || isLoadingNote}
              />
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Popover open={openFramework} onOpenChange={setOpenFramework}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openFramework}
                    className="w-[200px] justify-between"
                  >
                    {categoryValue
                      ? categories.find((category) => category.value === categoryValue)?.label
                      : 'Select category...'}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(currentValue) => {
                              setValue(
                                'category',
                                currentValue === categoryValue ? '' : currentValue
                              );
                              setOpenFramework(false);
                            }}
                          >
                            {category.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                categoryValue === category.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <RadioGroup
                value={statusValue}
                onValueChange={(value) => setValue('status', value)}
                className="flex items-center gap-6 my-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Draft" id="draft" />
                  <Label htmlFor="draft">Draft</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Done" id="done" />
                  <Label htmlFor="done">Done</Label>
                </div>
              </RadioGroup>
            </Field>
          </FieldGroup>
          <DialogFooter className="flex !justify-between items-center">
            <Button variant="gradient" type="button" disabled={isSubmitting}>
              ✨ Generate Note with AI
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || (!titleValue?.trim() && !contentValue?.trim())}
              >
                {isSubmitting
                  ? mode === 'edit'
                    ? 'Updating...'
                    : 'Creating...'
                  : mode === 'edit'
                    ? 'Update Note'
                    : 'Create Note'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
