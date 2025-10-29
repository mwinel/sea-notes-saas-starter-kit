import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { ViewToggle } from './view-toggle';

// Setup common mocks
setupCommonMocks();

describe('ViewToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onViewChange with "grid" when grid button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = jest.fn();
    renderWithProviders(<ViewToggle view="table" onViewChange={mockOnViewChange} />);

    const gridButton = screen.getByRole('radio', { name: /grid view/i });
    await user.click(gridButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('grid');
  });

  it('calls onViewChange with "table" when table button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = jest.fn();
    renderWithProviders(<ViewToggle view="grid" onViewChange={mockOnViewChange} />);

    const tableButton = screen.getByRole('radio', { name: /table view/i });
    await user.click(tableButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('table');
  });

  it('does not call onViewChange when already selected button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = jest.fn();
    renderWithProviders(<ViewToggle view="table" onViewChange={mockOnViewChange} />);

    const tableButton = screen.getByRole('radio', { name: /table view/i });
    await user.click(tableButton);

    expect(mockOnViewChange).not.toHaveBeenCalled();
  });
});
