'use client';

/**
 * NoteForm Component
 *
 * Pure presentational component for note forms.
 * Receives all data via props and communicates changes via callbacks.
 * Framework-agnostic and highly reusable.
 */
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { NOTE_CATEGORIES } from '@/constants/notes';

interface NoteFormProps {
  // Values
  title: string;
  content: string;
  category: string;
  status: string;
  
  // Callbacks
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  
  // State
  isSubmitting: boolean;
  disabled?: boolean;
}

export function NoteForm({ 
  title, 
  content, 
  category, 
  status, 
  onTitleChange, 
  onContentChange, 
  onCategoryChange, 
  onStatusChange, 
  isSubmitting, 
  disabled = false 
}: NoteFormProps) {
  const [openFramework, setOpenFramework] = useState(false);
  const isDisabled = disabled || isSubmitting;

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          id="title"
          data-testid="title-input"
          placeholder="Title (optional - will auto-generate if empty)"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={isDisabled}
        />
      </Field>
      <Field>
        <FieldLabel>Content</FieldLabel>
        <Textarea
          id="content"
          data-testid="content-textarea"
          placeholder="Start typing your note..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          disabled={isDisabled}
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
              data-testid="category-combobox"
              disabled={isDisabled}
            >
              {category
                ? NOTE_CATEGORIES.find((cat) => cat.value === category)?.label
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
                  {NOTE_CATEGORIES.map((cat) => (
                    <CommandItem
                      key={cat.value}
                      value={cat.value}
                      onSelect={(currentValue) => {
                        onCategoryChange(currentValue === category ? '' : currentValue);
                        setOpenFramework(false);
                      }}
                    >
                      {cat.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          category === cat.value ? 'opacity-100' : 'opacity-0'
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
          value={status}
          onValueChange={onStatusChange}
          className="flex items-center gap-6 my-2"
          data-testid="status-radio-group"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="Draft"
              id="draft"
              data-testid="status-draft"
              disabled={isDisabled}
            />
            <Label htmlFor="draft">Draft</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="Done"
              id="done"
              data-testid="status-done"
              disabled={isDisabled}
            />
            <Label htmlFor="done">Done</Label>
          </div>
        </RadioGroup>
      </Field>
    </FieldGroup>
  );
}
