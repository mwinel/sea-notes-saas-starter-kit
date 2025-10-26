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
 * Category color mapping for consistent styling
 */
export const CATEGORY_COLORS: Record<string, string> = {
  Travel: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10',
  Work: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10',
  Ideas: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  Design: 'text-pink-600 dark:text-pink-400 border-pink-500/20 bg-pink-500/10',
  Capabilities: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10',
  Personal: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  Projects: 'text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/10',
  Meetings: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
  Tasks: 'text-red-600 dark:text-red-400 border-red-500/20 bg-red-500/10',
  Research: 'text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/10',
  Goals: 'text-yellow-600 dark:text-yellow-400 border-yellow-500/20 bg-yellow-500/10',
  Journal: 'text-lime-600 dark:text-lime-400 border-lime-500/20 bg-lime-500/10',
  Books: 'text-teal-600 dark:text-teal-400 border-teal-500/20 bg-teal-500/10',
  Learning: 'text-violet-600 dark:text-violet-400 border-violet-500/20 bg-violet-500/10',
  Shopping: 'text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/10',
  Health: 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10',
};

/**
 * Get color classes for a category
 */
export function getCategoryColor(category: string | null): string {
  if (!category) return 'text-muted-foreground border-muted-foreground/20';
  return CATEGORY_COLORS[category] || 'text-muted-foreground border-muted-foreground/20';
}

/**
 * Shared types for note forms
 */
export type NoteFormData = {
  title?: string;
  content: string;
  category: string;
  status: string;
};