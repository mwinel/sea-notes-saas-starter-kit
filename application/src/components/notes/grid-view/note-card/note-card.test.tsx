import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NoteCard } from '@/components/notes/grid-view/note-card';
import { NoteTableData } from '@/components/notes/schemas';

// Setup common mocks
setupCommonMocks();

describe('NoteCard', () => {
  const mockNote: NoteTableData = {
    id: 'note-1',
    userId: 'user-1',
    title: 'Test Note Title',
    content: 'This is test note content',
    category: 'Work',
    status: 'Draft',
    isFavorite: false,
    position: 0,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const defaultProps = {
    item: mockNote,
    onTitleClick: jest.fn(),
    onEdit: jest.fn(),
    onCopy: jest.fn(),
    onToggleFavorite: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note content correctly', () => {
    renderWithProviders(<NoteCard {...defaultProps} />);

    expect(screen.getByText('Test Note Title')).toBeInTheDocument();
    expect(screen.getByText('This is test note content')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('calls onTitleClick when title is clicked', async () => {
    const user = userEvent.setup();
    const mockOnTitleClick = jest.fn();
    renderWithProviders(<NoteCard {...defaultProps} onTitleClick={mockOnTitleClick} />);

    await user.click(screen.getByText('Test Note Title'));

    expect(mockOnTitleClick).toHaveBeenCalledWith('note-1');
  });

  it('renders note actions menu', () => {
    const { container } = renderWithProviders(<NoteCard {...defaultProps} />);

    const menuButton = container.querySelector('button[aria-haspopup="menu"]');
    expect(menuButton).toBeInTheDocument();
  });
});
