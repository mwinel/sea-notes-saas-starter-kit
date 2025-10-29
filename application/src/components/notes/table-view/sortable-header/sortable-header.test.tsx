import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { SortableHeader } from './sortable-header';

// Setup common mocks
setupCommonMocks();

describe('SortableHeader', () => {
  const mockColumn = {
    toggleSorting: jest.fn(),
    getIsSorted: jest.fn(() => false),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with children text', () => {
    // Arrange & Act
    renderWithProviders(<SortableHeader column={mockColumn}>Title</SortableHeader>);

    // Assert
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('calls toggleSorting with false when clicked and not sorted', async () => {
    // Arrange
    const user = userEvent.setup();
    mockColumn.getIsSorted.mockReturnValue(false);

    renderWithProviders(<SortableHeader column={mockColumn}>Status</SortableHeader>);

    // Act
    await user.click(screen.getByText('Status'));

    // Assert
    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(false);
  });

  it('calls toggleSorting with false when clicked and sorted descending', async () => {
    // Arrange
    const user = userEvent.setup();
    mockColumn.getIsSorted.mockReturnValue('desc' as any);

    renderWithProviders(<SortableHeader column={mockColumn}>Created</SortableHeader>);

    // Act
    await user.click(screen.getByText('Created'));

    // Assert
    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(false);
  });

  it('calls toggleSorting with true when clicked and sorted ascending', async () => {
    // Arrange
    const user = userEvent.setup();
    mockColumn.getIsSorted.mockReturnValue('asc' as any);

    renderWithProviders(<SortableHeader column={mockColumn}>Title</SortableHeader>);

    // Act
    await user.click(screen.getByText('Title'));

    // Assert
    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(true);
  });
});
