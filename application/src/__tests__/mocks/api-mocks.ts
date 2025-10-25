/**
 * API client mock factories and utilities
 */

// Create mock functions that will be shared across all instances
const mockCreateNote = jest.fn();
const mockGetNote = jest.fn();
const mockUpdateNote = jest.fn();
const mockDeleteNote = jest.fn();
const mockGetNotes = jest.fn();
const mockToggleFavorite = jest.fn();
const mockReorderNotes = jest.fn();

// Mock the API client at module level
jest.mock('@/lib/api/notes', () => ({
  NotesApiClient: jest.fn().mockImplementation(() => ({
    createNote: mockCreateNote,
    getNote: mockGetNote,
    updateNote: mockUpdateNote,
    deleteNote: mockDeleteNote,
    getNotes: mockGetNotes,
    toggleFavorite: mockToggleFavorite,
    reorderNotes: mockReorderNotes,
  })),
}));

export interface MockNote {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  isFavorite: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface MockApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  ok?: boolean;
}

/**
 * Sets up NotesApiClient mock with default successful responses
 */
export const setupNotesApiMocks = () => {
  // Default mock resolved value for createNote
  mockCreateNote.mockResolvedValue({
    id: '1',
    title: 'Test Note',
    content: 'Test Content',
    category: 'Personal',
    status: 'Draft',
    isFavorite: false,
    position: 0,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    userId: 'user1',
  });

  // Default mock resolved value for getNotes
  mockGetNotes.mockResolvedValue({
    notes: [],
    total: 0,
  });

  return {
    createNote: mockCreateNote,
    getNote: mockGetNote,
    updateNote: mockUpdateNote,
    deleteNote: mockDeleteNote,
    getNotes: mockGetNotes,
    toggleFavorite: mockToggleFavorite,
    reorderNotes: mockReorderNotes,
  };
};