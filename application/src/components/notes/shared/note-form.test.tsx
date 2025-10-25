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
  status = 'Draft' 
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

  it('renders all form fields', () => {
    renderWithProviders(<TestWrapper />);

    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('content-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('category-combobox')).toBeInTheDocument();
    expect(screen.getByTestId('status-radio-group')).toBeInTheDocument();
  });

  it('renders with provided values', () => {
    renderWithProviders(
      <TestWrapper 
        title="Test Title" 
        content="Test content" 
        category="Work" 
        status="Done" 
      />
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

  it('disables all form fields when isSubmitting is true', () => {
    renderWithProviders(<TestWrapper isSubmitting={true} />);

    expect(screen.getByTestId('title-input')).toBeDisabled();
    expect(screen.getByTestId('content-textarea')).toBeDisabled();
    expect(screen.getByTestId('category-combobox')).toBeDisabled();
    expect(screen.getByTestId('status-draft')).toBeDisabled();
    expect(screen.getByTestId('status-done')).toBeDisabled();
  });

  it('enables all form fields when isSubmitting is false', () => {
    renderWithProviders(<TestWrapper isSubmitting={false} />);

    expect(screen.getByTestId('title-input')).not.toBeDisabled();
    expect(screen.getByTestId('content-textarea')).not.toBeDisabled();
    expect(screen.getByTestId('category-combobox')).not.toBeDisabled();
    expect(screen.getByTestId('status-draft')).not.toBeDisabled();
    expect(screen.getByTestId('status-done')).not.toBeDisabled();
  });

  it('calls onTitleChange when title input changes', async () => {
    const user = userEvent.setup();
    const mockOnTitleChange = jest.fn();
    
    renderWithProviders(
      <NoteForm
        title=""
        content=""
        category="Personal"
        status="Draft"
        onTitleChange={mockOnTitleChange}
        onContentChange={jest.fn()}
        onCategoryChange={jest.fn()}
        onStatusChange={jest.fn()}
        isSubmitting={false}
      />
    );

    const titleInput = screen.getByTestId('title-input');
    await user.type(titleInput, 'Test');

    expect(mockOnTitleChange).toHaveBeenCalled();
    expect(mockOnTitleChange).toHaveBeenCalledWith('T');
    expect(mockOnTitleChange).toHaveBeenCalledWith('e');
    expect(mockOnTitleChange).toHaveBeenCalledWith('s');
    expect(mockOnTitleChange).toHaveBeenCalledWith('t');
  });

  it('calls onContentChange when content textarea changes', async () => {
    const user = userEvent.setup();
    const mockOnContentChange = jest.fn();
    
    renderWithProviders(
      <NoteForm
        title=""
        content=""
        category="Personal"
        status="Draft"
        onTitleChange={jest.fn()}
        onContentChange={mockOnContentChange}
        onCategoryChange={jest.fn()}
        onStatusChange={jest.fn()}
        isSubmitting={false}
      />
    );

    const contentTextarea = screen.getByTestId('content-textarea');
    await user.type(contentTextarea, 'Test');

    expect(mockOnContentChange).toHaveBeenCalled();
    expect(mockOnContentChange).toHaveBeenCalledWith('T');
    expect(mockOnContentChange).toHaveBeenCalledWith('e');
    expect(mockOnContentChange).toHaveBeenCalledWith('s');
    expect(mockOnContentChange).toHaveBeenCalledWith('t');
  });

  it('calls onStatusChange when status radio changes', async () => {
    const user = userEvent.setup();
    const mockOnStatusChange = jest.fn();
    
    renderWithProviders(
      <NoteForm
        title=""
        content=""
        category="Personal"
        status="Draft"
        onTitleChange={jest.fn()}
        onContentChange={jest.fn()}
        onCategoryChange={jest.fn()}
        onStatusChange={mockOnStatusChange}
        isSubmitting={false}
      />
    );

    const doneRadio = screen.getByTestId('status-done');
    await user.click(doneRadio);

    expect(mockOnStatusChange).toHaveBeenCalledWith('Done');
  });

  it('shows category combobox with correct value', () => {
    renderWithProviders(<TestWrapper category="Work" />);

    const categoryButton = screen.getByTestId('category-combobox');
    expect(categoryButton).toHaveTextContent('Work');
  });

  it('renders category combobox with correct attributes', () => {
    renderWithProviders(<TestWrapper />);

    const categoryButton = screen.getByTestId('category-combobox');
    expect(categoryButton).toHaveAttribute('role', 'combobox');
    expect(categoryButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows correct status selection', () => {
    renderWithProviders(<TestWrapper status="Done" />);

    const draftRadio = screen.getByTestId('status-draft') as HTMLInputElement;
    const doneRadio = screen.getByTestId('status-done') as HTMLInputElement;

    expect(draftRadio).not.toBeChecked();
    expect(doneRadio).toBeChecked();
  });
});