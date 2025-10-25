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
import { CreateNote } from './create-note';

// Setup common mocks
setupCommonMocks();

describe('CreateNote', () => {
  let mockCreateNote: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup API mocks
    const apiMocks = setupNotesApiMocks();
    mockCreateNote = apiMocks.createNote;
  });

  it('renders the dialog button', () => {
    renderWithProviders(<CreateNote />);

    expect(screen.getByTestId('open-dialog-button')).toBeInTheDocument();
    expect(screen.getByText('Create Note')).toBeInTheDocument();
  });

  it('displays all form fields when dialog is open', async () => {
    renderWithProviders(<CreateNote />);

    // Open the dialog`
    await clickElement('open-dialog-button');

    // Wait for dialog to appear
    await waitForElement('create-note-dialog-content');

    // Verify form inputs exist
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('content-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('category-combobox')).toBeInTheDocument();
    expect(screen.getByTestId('status-radio-group')).toBeInTheDocument();

    // Verify action buttons exist
    expect(screen.getByTestId('generate-note-with-ai-button')).toBeInTheDocument();
    expect(screen.getByTestId('close-dialog-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('submits and calls the create note API with correct data', async () => {
    const user = userEvent.setup();

    renderWithProviders(<CreateNote />);

    // Open the dialog
    await clickElement('open-dialog-button');
    await waitForElement('create-note-dialog-content');

    // Fill out the form fields
    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-textarea') as HTMLTextAreaElement;

    await user.type(titleInput, 'My Test Note');
    await user.type(contentTextarea, 'This is my test content');

    // Verify the inputs have the correct values
    expect(titleInput.value).toBe('My Test Note');
    expect(contentTextarea.value).toBe('This is my test content');

    // Wait for the button to be enabled
    const submitButton = screen.getByTestId('submit-button');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Click the submit button
    await user.click(submitButton);

    // Wait for the API to be called with the form data
    await waitFor(() => {
      expect(mockCreateNote).toHaveBeenCalledTimes(1);
      expect(mockCreateNote).toHaveBeenCalledWith({
        title: 'My Test Note',
        content: 'This is my test content',
        category: 'Personal', // default value
        status: 'Draft', // default value
      });
    });
  });

  it('shows success toast and closes dialog when note is created successfully', async () => {
    const { toast } = require('sonner');
    const user = userEvent.setup();

    renderWithProviders(<CreateNote />);

    // Open the dialog
    await clickElement('open-dialog-button');
    await waitForElement('create-note-dialog-content');

    // Fill out the form
    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-textarea') as HTMLTextAreaElement;

    await user.type(titleInput, 'Success Test Note');
    await user.type(contentTextarea, 'Testing success toast');

    // Wait for the button to be enabled
    const submitButton = screen.getByTestId('submit-button');
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Click the submit button
    await user.click(submitButton);

    // Wait for success toast to be shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Note created successfully!');
    });

    // Verify dialog closes after successful submission
    await waitForElementToDisappear('create-note-dialog-content');
  });
});
