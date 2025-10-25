/**
 * Constants for notes functionality
 * Centralizes categories, validation schemas, and other note-related constants
 */

/**
 * Available categories for notes
 */
export const NOTE_CATEGORIES = [
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
] as const;

/**
 * Shared types for note forms
 */
export type NoteFormData = {
  title?: string;
  content: string;
  category: string;
  status: string;
};