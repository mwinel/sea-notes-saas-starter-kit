import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { TableViewContainer } from '@/components/notes/table-view';

// Setup common mocks
setupCommonMocks();

// Mock the useNotesData hook
const mockUseNotesData = jest.fn();
jest.mock('@/hooks/use-notes-data', () => ({
  useNotesData: (props: any) => mockUseNotesData(props),
}));

// Mock the TableView component
jest.mock('../notes-table-view', () => ({
  TableView: (props: any) => (
    <div data-testid="table-view">
      <div data-testid="table-view-props">
        {JSON.stringify({ ...props, onViewChange: props.onViewChange ? 'function' : undefined })}
      </div>
    </div>
  ),
}));

describe('TableViewContainer', () => {
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
    pagination: { pageIndex: 0, pageSize: 10 },
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

  it('renders TableView component', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('table-view')).toBeInTheDocument();
  });

  it('calls useNotesData with correct pageSize', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    // DEFAULT_PAGE_SIZE_TABLE should be passed
    expect(mockUseNotesData).toHaveBeenCalledWith({ pageSize: expect.any(Number) });
  });

  it('passes all notesData props to TableView', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    const propsElement = screen.getByTestId('table-view-props');
    const passedProps = JSON.parse(propsElement.textContent || '{}');

    expect(passedProps).toHaveProperty('data');
    expect(passedProps).toHaveProperty('totalCount');
    expect(passedProps).toHaveProperty('isLoading');
    expect(passedProps).toHaveProperty('rowSelection');
    expect(passedProps).toHaveProperty('columnVisibility');
    expect(passedProps).toHaveProperty('pagination');
    expect(passedProps).toHaveProperty('onViewChange');
  });

  it('passes onViewChange prop to TableView', () => {
    const mockOnViewChange = jest.fn();
    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    const propsElement = screen.getByTestId('table-view-props');
    const passedProps = JSON.parse(propsElement.textContent || '{}');

    expect(passedProps.onViewChange).toBeDefined();
  });

  it('renders with loading state', () => {
    mockUseNotesData.mockReturnValue({ ...mockNotesData, isLoading: true });
    const mockOnViewChange = jest.fn();

    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('table-view')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    mockUseNotesData.mockReturnValue({ ...mockNotesData, isError: true });
    const mockOnViewChange = jest.fn();

    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('table-view')).toBeInTheDocument();
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

    renderWithProviders(<TableViewContainer onViewChange={mockOnViewChange} />);

    expect(screen.getByTestId('table-view')).toBeInTheDocument();
  });
});
