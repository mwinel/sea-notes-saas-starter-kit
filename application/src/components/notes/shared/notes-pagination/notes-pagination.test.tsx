import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NotesPagination } from '@/components/notes/shared';

// Setup common mocks
setupCommonMocks();

describe('NotesPagination', () => {
  const defaultProps = {
    pagination: {
      pageIndex: 0,
      pageSize: 9,
    },
    totalCount: 50,
    selectedCount: 0,
    totalRows: 9,
    onPaginationChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the current page number and total pages', () => {
    renderWithProviders(<NotesPagination {...defaultProps} />);

    expect(screen.getByText('Page 1 of 6')).toBeInTheDocument();
  });

  it('displays selected count', () => {
    renderWithProviders(<NotesPagination {...defaultProps} selectedCount={3} />);

    expect(screen.getByText(/3 of 9 note\(s\) selected/i)).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    renderWithProviders(
      <NotesPagination {...defaultProps} pagination={{ pageIndex: 0, pageSize: 9 }} />
    );

    const prevButton = screen.getByRole('button', { name: /go to previous page/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    renderWithProviders(
      <NotesPagination {...defaultProps} pagination={{ pageIndex: 5, pageSize: 9 }} />
    );

    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPaginationChange when navigation buttons are clicked', async () => {
    const user = userEvent.setup();
    const mockOnPaginationChange = jest.fn();
    renderWithProviders(
      <NotesPagination {...defaultProps} onPaginationChange={mockOnPaginationChange} />
    );

    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    await user.click(nextButton);

    expect(mockOnPaginationChange).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 9,
    });
  });

  it('handles single page correctly', () => {
    renderWithProviders(
      <NotesPagination
        {...defaultProps}
        totalCount={5}
        pagination={{ pageIndex: 0, pageSize: 10 }}
      />
    );

    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /go to next page/i })).toBeDisabled();
  });

  it('calculates total pages correctly', () => {
    renderWithProviders(
      <NotesPagination
        {...defaultProps}
        totalCount={100}
        pagination={{ pageIndex: 0, pageSize: 10 }}
      />
    );

    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
  });
});
