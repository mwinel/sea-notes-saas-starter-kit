import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NoteActionsMenu } from './note-actions-menu';

// Setup common mocks
setupCommonMocks();

describe('NoteActionsMenu', () => {
  const defaultProps = {
    isFavorite: false,
    isCopyPending: false,
    isFavoritePending: false,
    onEdit: jest.fn(),
    onCopy: jest.fn(),
    onToggleFavorite: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens menu and shows all action items when trigger button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NoteActionsMenu {...defaultProps} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Make a copy')).toBeInTheDocument();
      expect(screen.getByText('Favorite')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  it('shows "Unfavorite" text when note is favorited', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NoteActionsMenu {...defaultProps} isFavorite={true} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Unfavorite')).toBeInTheDocument();
    });
  });

  it('calls onEdit when "Edit" is clicked', async () => {
    const user = userEvent.setup();
    const mockOnEdit = jest.fn();

    renderWithProviders(<NoteActionsMenu {...defaultProps} onEdit={mockOnEdit} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
    await user.click(screen.getByText('Edit'));

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onCopy when "Make a copy" is clicked', async () => {
    const user = userEvent.setup();
    const mockOnCopy = jest.fn();

    renderWithProviders(<NoteActionsMenu {...defaultProps} onCopy={mockOnCopy} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => expect(screen.getByText('Make a copy')).toBeInTheDocument());
    await user.click(screen.getByText('Make a copy'));

    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleFavorite when "Favorite"/"Unfavorite" is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggleFavorite = jest.fn();

    renderWithProviders(
      <NoteActionsMenu
        {...defaultProps}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => expect(screen.getByText('Favorite')).toBeInTheDocument());
    await user.click(screen.getByText('Favorite'));

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when "Delete" is clicked', async () => {
    const user = userEvent.setup();
    const mockOnDelete = jest.fn();

    renderWithProviders(<NoteActionsMenu {...defaultProps} onDelete={mockOnDelete} />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument());
    await user.click(screen.getByText('Delete'));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('shows pending states and disables actions when operations are in progress', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <NoteActionsMenu {...defaultProps} isCopyPending={true} isFavoritePending={true} />
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copying...')).toBeInTheDocument();
      const copyItem = screen.getByText('Copying...').closest('[role="menuitem"]');
      const favoriteItem = screen.getByText('Favorite').closest('[role="menuitem"]');
      expect(copyItem).toHaveAttribute('aria-disabled', 'true');
      expect(favoriteItem).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
