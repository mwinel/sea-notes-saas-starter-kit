import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { DeleteNoteDialog } from './delete-note-dialog';

// Setup common mocks
setupCommonMocks();

describe('DeleteNoteDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    noteTitle: 'Test Note',
    onConfirm: jest.fn(),
    isPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog when open is true', () => {
    renderWithProviders(<DeleteNoteDialog {...defaultProps} />);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('does not render the dialog when open is false', () => {
    renderWithProviders(<DeleteNoteDialog {...defaultProps} open={false} />);

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange with false when Cancel is clicked', async () => {
    const user = userEvent.setup();
    const mockOnOpenChange = jest.fn();
    renderWithProviders(<DeleteNoteDialog {...defaultProps} onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onConfirm when Delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnConfirm = jest.fn();
    renderWithProviders(<DeleteNoteDialog {...defaultProps} onConfirm={mockOnConfirm} />);

    await user.click(screen.getByRole('button', { name: /^delete$/i }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('shows "Deleting..." text when isPending is true', () => {
    renderWithProviders(<DeleteNoteDialog {...defaultProps} isPending={true} />);

    expect(screen.getByText('Deleting...')).toBeInTheDocument();
  });

  it('disables buttons when isPending is true', () => {
    renderWithProviders(<DeleteNoteDialog {...defaultProps} isPending={true} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const deleteButton = screen.getByRole('button', { name: /deleting/i });

    expect(cancelButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });
});
