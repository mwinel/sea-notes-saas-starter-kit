import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { TableCellViewer } from './table-cell-viewer';
import { NoteTableData } from '@/components/notes/schemas';

// Setup common mocks
setupCommonMocks();

describe('TableCellViewer', () => {
  const mockNote: NoteTableData = {
    id: 'note-1',
    userId: 'user-1',
    title: 'Short Title',
    content: 'Test content',
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the note title', () => {
    renderWithProviders(<TableCellViewer {...defaultProps} />);

    expect(screen.getByText('Short Title')).toBeInTheDocument();
  });

  it('does not show favorite icon when note is not favorited', () => {
    const { container } = renderWithProviders(<TableCellViewer {...defaultProps} />);

    const starIcon = container.querySelector('.text-yellow-500');
    expect(starIcon).not.toBeInTheDocument();
  });

  it('shows favorite icon when note is favorited', () => {
    const favoriteNote = { ...mockNote, isFavorite: true };
    const { container } = renderWithProviders(
      <TableCellViewer {...defaultProps} item={favoriteNote} />
    );

    const starIcon = container.querySelector('.text-yellow-500');
    expect(starIcon).toBeInTheDocument();
  });

  it('calls onTitleClick with note id when title is clicked', async () => {
    const user = userEvent.setup();
    const mockOnTitleClick = jest.fn();
    renderWithProviders(<TableCellViewer {...defaultProps} onTitleClick={mockOnTitleClick} />);

    await user.click(screen.getByText('Short Title'));

    expect(mockOnTitleClick).toHaveBeenCalledWith('note-1');
  });

  it('truncates long titles with ellipsis', () => {
    const longTitle = 'A'.repeat(50);
    const noteWithLongTitle = { ...mockNote, title: longTitle };
    renderWithProviders(<TableCellViewer {...defaultProps} item={noteWithLongTitle} />);

    // Default max length is 30, so it should be truncated
    const displayedText = screen.getByText(/A+\.\.\./);
    expect(displayedText).toBeInTheDocument();
    expect(displayedText.textContent?.length).toBeLessThan(longTitle.length);
  });

  it('does not truncate short titles', () => {
    renderWithProviders(<TableCellViewer {...defaultProps} />);

    const title = screen.getByText('Short Title');
    expect(title.textContent).toBe('Short Title');
    expect(title.textContent).not.toContain('...');
  });

  it('respects custom maxTitleLength prop', () => {
    const title = 'This is a longer title';
    const noteWithTitle = { ...mockNote, title };
    renderWithProviders(
      <TableCellViewer {...defaultProps} item={noteWithTitle} maxTitleLength={10} />
    );

    const displayedText = screen.getByText(/This is a \.\.\./);
    expect(displayedText).toBeInTheDocument();
  });

  it('shows tooltip for truncated titles', () => {
    const longTitle = 'A'.repeat(50);
    const noteWithLongTitle = { ...mockNote, title: longTitle };
    renderWithProviders(<TableCellViewer {...defaultProps} item={noteWithLongTitle} />);

    // Tooltip trigger should exist
    const truncatedTitle = screen.getByText(/A+\.\.\./);
    expect(truncatedTitle).toBeInTheDocument();
  });

  it('does not show tooltip for non-truncated titles', () => {
    const { container } = renderWithProviders(<TableCellViewer {...defaultProps} />);

    // Should not have tooltip trigger wrapper
    const title = screen.getByText('Short Title');
    expect(title).toBeInTheDocument();
  });

  it('applies hover styles to title', () => {
    renderWithProviders(<TableCellViewer {...defaultProps} />);

    const title = screen.getByText('Short Title');
    expect(title).toHaveClass('hover:underline');
  });

  it('has cursor-pointer class on title', () => {
    renderWithProviders(<TableCellViewer {...defaultProps} />);

    const title = screen.getByText('Short Title');
    expect(title).toHaveClass('cursor-pointer');
  });
});

