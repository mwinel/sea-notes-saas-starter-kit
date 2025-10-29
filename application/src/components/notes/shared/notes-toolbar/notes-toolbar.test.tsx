import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { NotesToolbar } from './notes-toolbar';

// Setup common mocks
setupCommonMocks();

// jsdom doesn't implement scrollIntoView; cmdk calls it during mount
beforeAll(() => {
  (Element.prototype as any).scrollIntoView = jest.fn();
});

describe('NotesToolbar', () => {
  const defaultProps = {
    searchValue: '',
    selectedCategories: [],
    selectedStatuses: [],
    showFavoritesOnly: false,
    view: 'table' as const,
    isFetching: false,
    isLoading: false,
    onSearchChange: jest.fn(),
    onSelectedCategoriesChange: jest.fn(),
    onSelectedStatusesChange: jest.fn(),
    onShowFavoritesOnlyChange: jest.fn(),
    onViewChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays search value in input', () => {
    renderWithProviders(<NotesToolbar {...defaultProps} searchValue="test query" />);

    const input = screen.getByPlaceholderText('Search notes...') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  it('shows table view as selected', () => {
    renderWithProviders(<NotesToolbar {...defaultProps} view="table" />);

    const tableButton = screen.getByRole('radio', { name: /table view/i });
    expect(tableButton).toHaveAttribute('data-state', 'on');
  });

  it('shows grid view as selected', () => {
    renderWithProviders(<NotesToolbar {...defaultProps} view="grid" />);

    const gridButton = screen.getByRole('radio', { name: /grid view/i });
    expect(gridButton).toHaveAttribute('data-state', 'on');
  });

  it('calls onViewChange when view toggle is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = jest.fn();
    renderWithProviders(
      <NotesToolbar {...defaultProps} view="table" onViewChange={mockOnViewChange} />
    );

    const gridButton = screen.getByRole('radio', { name: /grid view/i });
    await user.click(gridButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('grid');
  });

  it('shows favorites toggle as pressed when showFavoritesOnly is true', () => {
    renderWithProviders(<NotesToolbar {...defaultProps} showFavoritesOnly={true} />);

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onShowFavoritesOnlyChange when favorites toggle is clicked', async () => {
    const user = userEvent.setup();
    const mockOnShowFavoritesOnlyChange = jest.fn();
    renderWithProviders(
      <NotesToolbar
        {...defaultProps}
        showFavoritesOnly={false}
        onShowFavoritesOnlyChange={mockOnShowFavoritesOnlyChange}
      />
    );

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    await user.click(toggle);

    expect(mockOnShowFavoritesOnlyChange).toHaveBeenCalledWith(true);
  });

  it('opens Category multiselect and selects an option', async () => {
    const user = userEvent.setup();
    const mockOnSelectedCategoriesChange = jest.fn();

    renderWithProviders(
      <NotesToolbar
        {...defaultProps}
        onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
      />
    );

    const categoryButton = screen.getByRole('button', { name: /filter by category/i });
    await user.click(categoryButton);

    const option = await screen.findByRole('option', { name: 'Work' });
    await user.click(option);

    expect(mockOnSelectedCategoriesChange).toHaveBeenCalledWith(['Work']);
  });

  it('shows Clear filters when categories are selected and clears on click', async () => {
    const user = userEvent.setup();
    const mockOnSelectedCategoriesChange = jest.fn();

    renderWithProviders(
      <NotesToolbar
        {...defaultProps}
        selectedCategories={[ 'Work' ]}
        onSelectedCategoriesChange={mockOnSelectedCategoriesChange}
      />
    );

    const categoryButton = screen.getByRole('button', { name: /filter by category/i });
    await user.click(categoryButton);

    expect(await screen.findByRole('option', { name: /clear filters/i })).toBeInTheDocument();

    const clear = screen.getByRole('option', { name: /clear filters/i });
    await user.click(clear);

    expect(mockOnSelectedCategoriesChange).toHaveBeenCalledWith([]);
  });

  it('opens Status multiselect, has no search, and selects an option', async () => {
    const user = userEvent.setup();
    const mockOnSelectedStatusesChange = jest.fn();

    renderWithProviders(
      <NotesToolbar
        {...defaultProps}
        onSelectedStatusesChange={mockOnSelectedStatusesChange}
      />
    );

    const statusButton = screen.getByRole('button', { name: /filter by status/i });
    await user.click(statusButton);

    expect(screen.queryByPlaceholderText(/search statuses/i)).not.toBeInTheDocument();

    const draftOption = await screen.findByRole('option', { name: 'Draft' });
    await user.click(draftOption);

    expect(mockOnSelectedStatusesChange).toHaveBeenCalledWith(['Draft']);
  });
});
