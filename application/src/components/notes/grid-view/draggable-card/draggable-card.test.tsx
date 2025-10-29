import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { DraggableCard } from './draggable-card';
import { NoteTableData } from '@/components/notes/schemas';

// Setup common mocks
setupCommonMocks();

// Mock @dnd-kit/sortable
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    transform: null,
    transition: undefined,
    setNodeRef: jest.fn(),
    isDragging: false,
  }),
}));

describe('DraggableCard', () => {
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

  it('renders draggable card with all functionality', () => {
    const { container } = renderWithProviders(<DraggableCard {...defaultProps} />);

    // Test basic card rendering
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();

    // Test drag handle rendering
    const gripIcon = container.querySelector('svg');
    expect(gripIcon).toBeInTheDocument();

    // Test wrapper classes
    const wrapper = container.querySelector('.group\\/card');
    expect(wrapper).toBeInTheDocument();

    // Test drag handle hover visibility classes
    const dragHandle = container.querySelector('.group-hover\\/card\\:opacity-100');
    expect(dragHandle).toBeInTheDocument();
  });

  it('handles drag state correctly', () => {
    // Mock useSortable to return isDragging: true
    jest.spyOn(require('@dnd-kit/sortable'), 'useSortable').mockReturnValue({
      attributes: {},
      listeners: {},
      transform: null,
      transition: undefined,
      setNodeRef: jest.fn(),
      isDragging: true,
    });

    const { container } = renderWithProviders(<DraggableCard {...defaultProps} />);

    // Test dragging styles
    const wrapper = container.querySelector('.opacity-50');
    expect(wrapper).toBeInTheDocument();
  });
});
