import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderWithProviders,
  clickElement,
  waitForElement,
  waitForElementToDisappear,
} from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { setupNotesApiMocks } from '@/__tests__/mocks/api-mocks';
import { EditNote } from './edit-note';

// Setup common mocks
setupCommonMocks();

describe('EditNote', () => {
  let mockGetNote: jest.Mock;
  let mockUpdateNote: jest.Mock;

  const mockNote = {
    id: 'test-note-id',
    userId: 'user-1',
    title: 'Test Note Title',
    content: 'Test note content',
    category: 'Work',
    status: 'Draft',
    isFavorite: false,
    position: 0,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup API mocks
    const apiMocks = setupNotesApiMocks();
    mockGetNote = apiMocks.getNote;
    mockUpdateNote = apiMocks.updateNote;
  });

  it('renders loading state when fetching note data', () => {
    mockGetNote.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    expect(screen.getByText('Loading note...')).toBeInTheDocument();
    expect(screen.getByTestId('edit-note-dialog-content')).toBeInTheDocument();
  });

  it('displays all form fields with pre-populated data when note is loaded', async () => {
    mockGetNote.mockResolvedValue(mockNote);

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    // Wait for note to load
    await waitForElement('edit-note-dialog-form');

    // Verify form inputs exist and are pre-populated
    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-textarea') as HTMLTextAreaElement;

    expect(titleInput).toBeInTheDocument();
    expect(contentTextarea).toBeInTheDocument();
    expect(titleInput.value).toBe('Test Note Title');
    expect(contentTextarea.value).toBe('Test note content');

    // Verify other form elements exist
    expect(screen.getByTestId('category-combobox')).toBeInTheDocument();
    expect(screen.getByTestId('status-radio-group')).toBeInTheDocument();

    // Verify action buttons exist
    expect(screen.getByTestId('close-dialog-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('submits and calls the update note API with correct data', async () => {
    const user = userEvent.setup();
    mockGetNote.mockResolvedValue(mockNote);

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    // Wait for note to load
    await waitForElement('edit-note-dialog-form');

    // Modify the form data
    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-textarea') as HTMLTextAreaElement;

    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Test Note');
    await user.clear(contentTextarea);
    await user.type(contentTextarea, 'Updated test content');

    // Wait for the button to be enabled
    const submitButton = screen.getByTestId('submit-button');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Click the submit button
    await user.click(submitButton);

    // Wait for the API to be called with the updated data
    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalledTimes(1);
      expect(mockUpdateNote).toHaveBeenCalledWith('test-note-id', {
        title: 'Updated Test Note',
        content: 'Updated test content',
        category: 'Work', // original value
        status: 'Draft', // original value
      });
    });
  });

  it('shows success toast and closes dialog when note is updated successfully', async () => {
    const { toast } = require('sonner');
    const user = userEvent.setup();
    const mockOnOpenChange = jest.fn();
    mockGetNote.mockResolvedValue(mockNote);
    mockUpdateNote.mockResolvedValue({ ...mockNote, title: 'Updated Note' });

    renderWithProviders(
      <EditNote noteId="test-note-id" open={true} onOpenChange={mockOnOpenChange} />
    );

    // Wait for note to load
    await waitForElement('edit-note-dialog-form');

    // Modify the form data
    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Note');

    // Wait for the button to be enabled
    const submitButton = screen.getByTestId('submit-button');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Click the submit button
    await user.click(submitButton);

    // Wait for success toast to be shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Note updated successfully!');
    });

    // Verify dialog closes after successful submission
    await waitFor(() => {
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('shows error toast when update fails', async () => {
    const { toast } = require('sonner');
    const user = userEvent.setup();
    mockGetNote.mockResolvedValue(mockNote);
    mockUpdateNote.mockRejectedValue(new Error('Update failed'));

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    // Wait for note to load
    await waitForElement('edit-note-dialog-form');

    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    // Wait for error toast to be shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update note', {
        description: 'Update failed',
      });
    });
  });

  it('shows error state when note fetch fails', async () => {
    mockGetNote.mockRejectedValue(new Error('Fetch failed'));

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    // Wait for error state to appear
    await waitFor(() => {
      expect(screen.getByText('Error Loading Note')).toBeInTheDocument();
      expect(screen.getByText('Failed to load the note. Please try again.')).toBeInTheDocument();
    });
  });

  it('disables form fields while submitting', async () => {
    const user = userEvent.setup();
    mockGetNote.mockResolvedValue(mockNote);
    mockUpdateNote.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    // Wait for note to load
    await waitForElement('edit-note-dialog-form');

    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    // Verify form fields are disabled while submitting
    await waitFor(() => {
      expect(screen.getByTestId('title-input')).toBeDisabled();
      expect(screen.getByTestId('content-textarea')).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Updating...');
    });
  });

  it('calls getNote API when dialog opens', () => {
    renderWithProviders(<EditNote noteId="test-note-id" open={true} onOpenChange={jest.fn()} />);

    expect(mockGetNote).toHaveBeenCalledWith('test-note-id');
  });

  it('does not call getNote API when dialog is closed', () => {
    renderWithProviders(<EditNote noteId="test-note-id" open={false} onOpenChange={jest.fn()} />);

    expect(mockGetNote).not.toHaveBeenCalled();
  });
});
