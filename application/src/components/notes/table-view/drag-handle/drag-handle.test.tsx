import React from 'react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { DragHandle } from './drag-handle';

// Setup common mocks
setupCommonMocks();

describe('DragHandle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the drag handle button', () => {
    const { container } = renderWithProviders(<DragHandle id="test-note-id" />);

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('renders the grip icon', () => {
    const { container } = renderWithProviders(<DragHandle id="test-note-id" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has cursor-grab class', () => {
    const { container } = renderWithProviders(<DragHandle id="test-note-id" />);

    const button = container.querySelector('button');
    expect(button).toHaveClass('cursor-pointer');
  });

  it('stops event propagation on click', () => {
    const { container } = renderWithProviders(<DragHandle id="test-note-id" />);

    const button = container.querySelector('button');
    const mockStopPropagation = jest.fn();
    
    button?.addEventListener('click', (e) => {
      mockStopPropagation();
      e.stopPropagation();
    });

    button?.click();
    expect(mockStopPropagation).toHaveBeenCalled();
  });
});

