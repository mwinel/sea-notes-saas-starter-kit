import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { GridViewContainer } from '@/components/notes/grid-view';

// Setup common mocks
setupCommonMocks();

// Mock the useNotesData hook
const mockUseNotesData = jest.fn();
jest.mock('@/hooks/use-notes-data', () => ({
  useNotesData: (props: any) => mockUseNotesData(props),
}));

// Mock the GridView component
jest.mock('../notes-grid-view', () => ({
  GridView: (props: any) => (
    <div data-testid="grid-view">
      <div data-testid="grid-view-props">{JSON.stringify({ ...props, onViewChange: props.onViewChange ? 'function' : undefined })}</div>
    </div>
  ),
}));

describe('GridViewContainer', () => {
  const mockNotesData = {
    data: [],
    totalCount: 0,
    isLoading: false,
    isError: false,
    isFetching: false,
    rowSelection: {},
    columnVisibility: {},
    columnFilters: [],
    sorting: [],
    pagination: { pageIndex: 0, pageSize: 9 },
    selectedCategories: [],
    selectedStatuses: [],
    showFavoritesOnly: false,
    localData: [],
    searchValue: '',
    onRowSelectionChange: jest.fn(),
    onColumnVisibilityChange: jest.fn(),
    onColumnFiltersChange: jest.fn(),
    onSortingChange: jest.fn(),
    onPaginationChange: jest.fn(),
    onSelectedCategoriesChange: jest.fn(),
    onSelectedStatusesChange: jest.fn(),
    onShowFavoritesOnlyChange: jest.fn(),
    onSearchChange: jest.fn(),
    onDragEnd: jest.fn(),
    onRefetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNotesData.mockReturnValue(mockNotesData);
  });

  it('renders GridView component', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('grid-view')).toBeInTheDocument();
  });

  it('calls useNotesData with correct pageSize', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    // DEFAULT_PAGE_SIZE_GRID should be passed
    expect(mockUseNotesData).toHaveBeenCalledWith({ pageSize: expect.any(Number) });
  });

  it('passes all notesData props to GridView', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    const propsElement = screen.getByTestId('grid-view-props');
    const passedProps = JSON.parse(propsElement.textContent || '{}');

    expect(passedProps).toHaveProperty('data');
    expect(passedProps).toHaveProperty('totalCount');
    expect(passedProps).toHaveProperty('isLoading');
    expect(passedProps).toHaveProperty('pagination');
    expect(passedProps).toHaveProperty('onViewChange');
  });

  it('passes onViewChange prop to GridView', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    const propsElement = screen.getByTestId('grid-view-props');
    const passedProps = JSON.parse(propsElement.textContent || '{}');

    expect(passedProps.onViewChange).toBeDefined();
  });

  it('renders with loading state', () => {
    mockUseNotesData.mockReturnValue({ ...mockNotesData, isLoading: true });
    const mockOnViewChange = jest.fn();

    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('grid-view')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    mockUseNotesData.mockReturnValue({ ...mockNotesData, isError: true });
    const mockOnViewChange = jest.fn();

    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('grid-view')).toBeInTheDocument();
  });

  it('renders with data', () => {
    const mockData = [
      {
        id: 'note-1',
        title: 'Test Note',
        content: 'Content',
        category: 'Work',
        status: 'Draft',
        isFavorite: false,
        position: 0,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    ];
    mockUseNotesData.mockReturnValue({ ...mockNotesData, data: mockData, totalCount: 1 });
    const mockOnViewChange = jest.fn();

    renderWithProviders(<GridViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('grid-view')).toBeInTheDocument();
  });
});

