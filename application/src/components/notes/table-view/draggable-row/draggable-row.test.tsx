import React from 'react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NoteTableData } from '@/components/notes/schemas';
import { Table, TableBody } from '@/components/ui/table';
import { DraggableRow } from './draggable-row';

// Setup common mocks
setupCommonMocks();

// Mock @dnd-kit/sortable
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn(() => ({
    attributes: {},
    listeners: {},
    transform: null,
    transition: undefined,
    setNodeRef: jest.fn(),
    isDragging: false,
  })),
}));

// Mock flexRender from @tanstack/react-table
jest.mock('@tanstack/react-table', () => ({
  ...jest.requireActual('@tanstack/react-table'),
  flexRender: (component: any) => {
    if (typeof component === 'function') {
      return component();
    }
    return component;
  },
}));

describe('DraggableRow', () => {
  const mockNote: NoteTableData = {
    id: 'note-1',
    userId: 'user-1',
    title: 'Test Note',
    content: 'Test content',
    category: 'Work',
    status: 'Draft',
    isFavorite: false,
    position: 0,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const createMockRow = (note: NoteTableData, isSelected = false) => ({
    original: note,
    getIsSelected: () => isSelected,
    getVisibleCells: () => [
      {
        id: 'cell-1',
        column: {
          getSize: () => 100,
          columnDef: {
            cell: () => <span>Cell 1</span>,
          },
        },
        getContext: () => ({}),
      },
      {
        id: 'cell-2',
        column: {
          getSize: () => 200,
          columnDef: {
            cell: () => <span>Cell 2</span>,
          },
        },
        getContext: () => ({}),
      },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to render DraggableRow within proper table structure
  const renderDraggableRow = (row: any) => {
    return renderWithProviders(
      <Table>
        <TableBody>
          <DraggableRow row={row} />
        </TableBody>
      </Table>
    );
  };

  it('renders draggable table row with all functionality', () => {
    // Test basic rendering
    const mockRow = createMockRow(mockNote);
    const { container } = renderDraggableRow(mockRow);

    const row = container.querySelector('tr');
    expect(row).toBeInTheDocument();

    // Test cell rendering
    const cells = container.querySelectorAll('td');
    expect(cells.length).toBe(2);

    // Test cell width styles
    const firstCell = container.querySelectorAll('td')[0];
    expect(firstCell).toHaveStyle({ width: '100px' });

    // Test z-index classes
    expect(row).toHaveClass('relative', 'z-0');

    // Test non-selected state
    expect(row?.getAttribute('data-state')).toBe('false');
    expect(row).toHaveAttribute('data-dragging', 'false');
  });

  it('handles selected and dragging states correctly', () => {
    // Test selected state
    const selectedRow = createMockRow(mockNote, true);
    const { container: selectedContainer } = renderDraggableRow(selectedRow);

    const selectedRowElement = selectedContainer.querySelector('tr');
    expect(selectedRowElement).toHaveAttribute('data-state', 'selected');

    // Test dragging state
    const mockUseSortable = require('@dnd-kit/sortable').useSortable;
    mockUseSortable.mockReturnValue({
      attributes: {},
      listeners: {},
      transform: null,
      transition: undefined,
      setNodeRef: jest.fn(),
      isDragging: true,
    });

    const draggingRow = createMockRow(mockNote);
    const { container: draggingContainer } = renderDraggableRow(draggingRow);

    const draggingRowElement = draggingContainer.querySelector('tr');
    expect(draggingRowElement).toHaveAttribute('data-dragging', 'true');
  });
});
