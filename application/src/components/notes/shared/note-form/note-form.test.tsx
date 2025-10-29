import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NoteForm } from './note-form';

// Setup common mocks
setupCommonMocks();

// Test wrapper component with mock callbacks
function TestWrapper({
  isSubmitting = false,
  title = '',
  content = '',
  category = 'Personal',
  status = 'Draft',
}: {
  isSubmitting?: boolean;
  title?: string;
  content?: string;
  category?: string;
  status?: string;
}) {
  const mockOnTitleChange = jest.fn();
  const mockOnContentChange = jest.fn();
  const mockOnCategoryChange = jest.fn();
  const mockOnStatusChange = jest.fn();

  return (
    <NoteForm
      title={title}
      content={content}
      category={category}
      status={status}
      onTitleChange={mockOnTitleChange}
      onContentChange={mockOnContentChange}
      onCategoryChange={mockOnCategoryChange}
      onStatusChange={mockOnStatusChange}
      isSubmitting={isSubmitting}
    />
  );
}

describe('NoteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with provided values', () => {
    renderWithProviders(
      <TestWrapper title="Test Title" content="Test content" category="Work" status="Done" />
    );

    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-textarea') as HTMLTextAreaElement;
    const categoryButton = screen.getByTestId('category-combobox');
    const doneRadio = screen.getByTestId('status-done') as HTMLInputElement;

    expect(titleInput.value).toBe('Test Title');
    expect(contentTextarea.value).toBe('Test content');
    expect(categoryButton).toHaveTextContent('Work');
    expect(doneRadio).toBeChecked();
  });

  it('disables all form fields when submitting', () => {
    renderWithProviders(<TestWrapper isSubmitting={true} />);

    expect(screen.getByTestId('title-input')).toBeDisabled();
    expect(screen.getByTestId('content-textarea')).toBeDisabled();
    expect(screen.getByTestId('category-combobox')).toBeDisabled();
    expect(screen.getByTestId('status-draft')).toBeDisabled();
    expect(screen.getByTestId('status-done')).toBeDisabled();
  });

  it('handles user input changes', async () => {
    const user = userEvent.setup();
    const mockOnTitleChange = jest.fn();
    const mockOnContentChange = jest.fn();
    const mockOnStatusChange = jest.fn();

    renderWithProviders(
      <NoteForm
        title=""
        content=""
        category="Personal"
        status="Draft"
        onTitleChange={mockOnTitleChange}
        onContentChange={mockOnContentChange}
        onCategoryChange={jest.fn()}
        onStatusChange={mockOnStatusChange}
        isSubmitting={false}
      />
    );

    // Act: Type in title input
    const titleInput = screen.getByTestId('title-input');
    await user.type(titleInput, 'New Title');

    // Act: Type in content textarea
    const contentTextarea = screen.getByTestId('content-textarea');
    await user.type(contentTextarea, 'New content');

    // Act: Change status
    const doneRadio = screen.getByTestId('status-done');
    await user.click(doneRadio);

    // Assert
    expect(mockOnTitleChange).toHaveBeenCalledWith('N');
    expect(mockOnTitleChange).toHaveBeenCalledWith('e');
    expect(mockOnTitleChange).toHaveBeenCalledWith('w');
    expect(mockOnContentChange).toHaveBeenCalledWith('N');
    expect(mockOnContentChange).toHaveBeenCalledWith('e');
    expect(mockOnContentChange).toHaveBeenCalledWith('w');
    expect(mockOnStatusChange).toHaveBeenCalledWith('Done');
  });
});
