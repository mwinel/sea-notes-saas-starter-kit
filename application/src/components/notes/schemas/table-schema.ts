import { z } from 'zod';
import { NOTE_CATEGORIES } from '@/constants/notes';

export const noteTableSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.string().nullable(),
  status: z.string().nullable(),
  isFavorite: z.boolean(),
  position: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NoteTableData = z.infer<typeof noteTableSchema>;

// Available categories for filtering - derived from NOTE_CATEGORIES
export const AVAILABLE_CATEGORIES = NOTE_CATEGORIES.map(category => category.value);

// Available statuses for filtering
export const AVAILABLE_STATUSES = ['Draft', 'Done'] as const;
