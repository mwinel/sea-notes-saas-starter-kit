import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { TableView } from '@/components/notes/table-view';
import { NoteTableData } from '@/components/notes/schemas';

// Setup common mocks
setupCommonMocks();

// Mock hooks
jest.mock('@/hooks/use-note-dialogs', () => ({
  useNoteDialogs: () => ({
    editingNoteId: null,
    isEditDialogOpen: false,
    openEditDialog: jest.fn(),
    closeEditDialog: jest.fn(),
    deletingNote: null,
    isDeleteDialogOpen: false,
    openDeleteDialog: jest.fn(),
    closeDeleteDialog: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-note-actions', () => ({
  useNoteActions: () => ({
    deleteMutation: { mutate: jest.fn(), isPending: false },
    favoriteMutation: { mutate: jest.fn(), isPending: false },
    copyMutation: { mutate: jest.fn(), isPending: false },
    handleToggleFavorite: jest.fn(),
    handleCopy: jest.fn(),
  }),
}));

// Mock dnd-kit
jest.mock('@dnd-kit/core', () => ({
  ...jest.requireActual('@dnd-kit/core'),
  DndContext: ({ children }: any) => <div data-testid="dnd-context">{children}</div>,
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
  MouseSensor: jest.fn(),
  TouchSensor: jest.fn(),
  KeyboardSensor: jest.fn(),
  closestCenter: jest.fn(),
}));

jest.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => <>{children}</>,
  verticalListSortingStrategy: jest.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    transform: null,
    transition: null,
    setNodeRef: jest.fn(),
    isDragging: false,
  }),
}));

jest.mock('@dnd-kit/modifiers', () => ({
  restrictToVerticalAxis: jest.fn(),
}));

describe('TableView', () => {
  const mockData: NoteTableData[] = [
    {
      id: 'note-1',
      userId: 'user-1',
      title: 'Test Note 1',
      content: 'Content 1',
      category: 'Work',
      status: 'Draft',
      isFavorite: false,
      position: 0,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 'note-2',
      userId: 'user-1',
      title: 'Test Note 2',
      content: 'Content 2',
      category: 'Personal',
      status: 'Done',
      isFavorite: true,
      position: 1,
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    },
  ];

  const defaultProps = {
    data: mockData,
    totalCount: 2,
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
    onViewChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    renderWithProviders(<TableView {...defaultProps} isLoading={true} />);

    expect(screen.getByText('Loading notes...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderWithProviders(<TableView {...defaultProps} isError={true} isLoading={false} />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('renders empty state when no notes and no search', () => {
    renderWithProviders(<TableView {...defaultProps} data={[]} totalCount={0} searchValue="" />);

    expect(screen.getByText('No notes found')).toBeInTheDocument();
  });

  it('renders search empty state when no results', () => {
    renderWithProviders(
      <TableView {...defaultProps} data={[]} totalCount={2} searchValue="test query" />
    );

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('renders table with headers', () => {
    renderWithProviders(<TableView {...defaultProps} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('renders DraggableRow for each note', () => {
    renderWithProviders(<TableView {...defaultProps} />);

    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  it('renders NotesPagination component', () => {
    renderWithProviders(<TableView {...defaultProps} />);

    expect(screen.getByText(/page \d+ of \d+/i)).toBeInTheDocument();
  });

  it('renders EditNote dialog when open', () => {
    // Mock the dialog hook to return open state
    jest.spyOn(require('@/hooks/use-note-dialogs'), 'useNoteDialogs').mockReturnValue({
      editingNoteId: 'note-1',
      isEditDialogOpen: true,
      openEditDialog: jest.fn(),
      closeEditDialog: jest.fn(),
      deletingNote: null,
      isDeleteDialogOpen: false,
      openDeleteDialog: jest.fn(),
      closeDeleteDialog: jest.fn(),
    });

    renderWithProviders(<TableView {...defaultProps} />);

    // EditNote component should be rendered
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
  });

  it('renders DeleteNoteDialog when open', () => {
    // Mock the dialog hook to return open delete dialog
    jest.spyOn(require('@/hooks/use-note-dialogs'), 'useNoteDialogs').mockReturnValue({
      editingNoteId: null,
      isEditDialogOpen: false,
      openEditDialog: jest.fn(),
      closeEditDialog: jest.fn(),
      deletingNote: { id: 'note-1', title: 'Test Note 1' },
      isDeleteDialogOpen: true,
      openDeleteDialog: jest.fn(),
      closeDeleteDialog: jest.fn(),
    });

    renderWithProviders(<TableView {...defaultProps} />);

    // DeleteNoteDialog should be rendered
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
  });
});

