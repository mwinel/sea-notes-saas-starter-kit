import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NotesManager } from './notes-manager';

// Setup common mocks
setupCommonMocks();

// Mock the view containers
jest.mock('@/components/notes/table-view', () => ({
  TableViewContainer: ({ onViewChange }: { onViewChange: (view: 'table' | 'grid') => void }) => (
    <div data-testid="table-view-container">
      <button onClick={() => onViewChange('grid')}>Switch to Grid</button>
    </div>
  ),
}));

jest.mock('@/components/notes/grid-view', () => ({
  GridViewContainer: ({ onViewChange }: { onViewChange: (view: 'table' | 'grid') => void }) => (
    <div data-testid="grid-view-container">
      <button onClick={() => onViewChange('table')}>Switch to Table</button>
    </div>
  ),
}));

describe('NotesManager', () => {
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    jest.clearAllMocks();

    // Arrange: Mock localStorage
    localStorageMock = {};
    global.Storage.prototype.getItem = jest.fn((key: string) => localStorageMock[key] || null);
    global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
  });

  it('renders table view by default', () => {
    // Arrange & Act
    renderWithProviders(<NotesManager />);

    // Assert
    expect(screen.getByTestId('table-view-container')).toBeInTheDocument();
  });

  it('loads and persists view preference from localStorage', async () => {
    // Arrange
    const user = userEvent.setup();
    localStorageMock['notes-view-preference'] = 'grid';

    // Act
    renderWithProviders(<NotesManager />);

    // Assert: Should load grid view from localStorage
    await waitFor(() => {
      expect(screen.getByTestId('grid-view-container')).toBeInTheDocument();
    });

    // Act: Switch back to table view
    await user.click(screen.getByText('Switch to Table'));

    // Assert: Should save preference and show table view
    await waitFor(() => {
      expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
        'notes-view-preference',
        'table'
      );
      expect(screen.getByTestId('table-view-container')).toBeInTheDocument();
    });
  });

  it('handles invalid localStorage value gracefully', () => {
    // Arrange
    localStorageMock['notes-view-preference'] = 'invalid-view';

    // Act
    renderWithProviders(<NotesManager />);

    // Assert: Should default to table view
    expect(screen.getByTestId('table-view-container')).toBeInTheDocument();
  });

  it('handles missing localStorage gracefully', () => {
    // Arrange
    global.Storage.prototype.getItem = jest.fn(() => null);

    // Act
    renderWithProviders(<NotesManager />);

    // Assert: Should default to table view
    expect(screen.getByTestId('table-view-container')).toBeInTheDocument();
  });
});
