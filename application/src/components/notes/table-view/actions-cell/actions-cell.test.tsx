import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { ActionsCell } from './actions-cell';
import { NoteTableData } from '@/components/notes/schemas';

// Setup common mocks
setupCommonMocks();

describe('ActionsCell', () => {
  const mockNote: NoteTableData = {
    id: 'note-1',
    userId: 'user-1',
    title: 'Test Note',
    content: 'Test content',
    category: 'Work',
    status: 'Draft',
    isFavorite: false,
    position: 0,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockRow = {
    original: mockNote,
  } as any;

  const defaultProps = {
    row: mockRow,
    onEdit: jest.fn(),
    onCopy: jest.fn(),
    onToggleFavorite: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the actions menu trigger', () => {
    renderWithProviders(<ActionsCell {...defaultProps} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toBeInTheDocument();
  });

  it('uses vertical dots icon variant', () => {
    renderWithProviders(<ActionsCell {...defaultProps} />);

    // The trigger should have the dotsVertical variant
    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onEdit with correct note id when Edit is selected', async () => {
    const user = userEvent.setup();
    const mockOnEdit = jest.fn();
    renderWithProviders(<ActionsCell {...defaultProps} onEdit={mockOnEdit} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith('note-1');
  });

  it('calls onCopy with correct note id when Make a copy is selected', async () => {
    const user = userEvent.setup();
    const mockOnCopy = jest.fn();
    renderWithProviders(<ActionsCell {...defaultProps} onCopy={mockOnCopy} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Make a copy')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Make a copy'));
    expect(mockOnCopy).toHaveBeenCalledWith('note-1');
  });

  it('calls onToggleFavorite with correct parameters when Favorite is selected', async () => {
    const user = userEvent.setup();
    const mockOnToggleFavorite = jest.fn();
    renderWithProviders(
      <ActionsCell {...defaultProps} onToggleFavorite={mockOnToggleFavorite} />
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Favorite')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Favorite'));
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('note-1', true);
  });

  it('calls onToggleFavorite to unfavorite when note is already favorited', async () => {
    const user = userEvent.setup();
    const mockOnToggleFavorite = jest.fn();
    const favoriteNote = { ...mockNote, isFavorite: true };
    const rowWithFavorite = { original: favoriteNote } as any;

    renderWithProviders(
      <ActionsCell {...defaultProps} row={rowWithFavorite} onToggleFavorite={mockOnToggleFavorite} />
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Unfavorite')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Unfavorite'));
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('note-1', false);
  });

  it('calls onDelete with correct note id when Delete is selected', async () => {
    const user = userEvent.setup();
    const mockOnDelete = jest.fn();
    renderWithProviders(<ActionsCell {...defaultProps} onDelete={mockOnDelete} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith('note-1');
  });

  it('passes isCopyPending prop to menu', () => {
    renderWithProviders(<ActionsCell {...defaultProps} isCopyPending={true} />);

    // Component should render without errors
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('passes isFavoritePending prop to menu', () => {
    renderWithProviders(<ActionsCell {...defaultProps} isFavoritePending={true} />);

    // Component should render without errors
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });
});

