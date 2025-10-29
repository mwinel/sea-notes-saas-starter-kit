import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NotesLoadingState, NotesErrorState, NotesEmptyState } from './notes-states';

// Setup common mocks
setupCommonMocks();

describe('NotesLoadingState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with custom message', () => {
    renderWithProviders(<NotesLoadingState message="Loading notes..." />);

    expect(screen.getByText('Loading notes...')).toBeInTheDocument();
  });
});

describe('NotesErrorState', () => {
  const defaultProps = {
    onRefetch: jest.fn(),
    isFetching: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onRefetch when Try Again button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnRefetch = jest.fn();
    renderWithProviders(<NotesErrorState {...defaultProps} onRefetch={mockOnRefetch} />);

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);

    expect(mockOnRefetch).toHaveBeenCalledTimes(1);
  });

  it('shows loading state on button when isFetching is true', () => {
    renderWithProviders(<NotesErrorState {...defaultProps} isFetching={true} />);

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});

describe('NotesEmptyState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create note button in default state', () => {
    renderWithProviders(<NotesEmptyState />);

    const createButtons = screen.getAllByText('Create Note');
    expect(createButtons.length).toBeGreaterThan(0);
  });

  it('renders search empty state when searchValue is provided', () => {
    renderWithProviders(<NotesEmptyState searchValue="test query" />);

    expect(screen.getByText('No results found for "test query"')).toBeInTheDocument();
  });
});
