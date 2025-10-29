import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { setupCommonMocks } from '@/__tests__/mocks/common-mocks';
import { FavoritesToggle } from './favorites-toggle';

// Setup common mocks
setupCommonMocks();

describe('FavoritesToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with pressed state when showFavoritesOnly is true', () => {
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={true} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows filled star icon when showFavoritesOnly is true', () => {
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={true} onToggle={mockOnToggle} />);

    expect(screen.getByTestId('icon-star-filled')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-star-outline')).not.toBeInTheDocument();
  });

  it('renders with unpressed state when showFavoritesOnly is false', () => {
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={false} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows outline star icon when showFavoritesOnly is false', () => {
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={false} onToggle={mockOnToggle} />);

    expect(screen.getByTestId('icon-star-outline')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-star-filled')).not.toBeInTheDocument();
  });

  it('calls onToggle with true when clicked and currently off', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={false} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    await user.click(toggle);

    expect(mockOnToggle).toHaveBeenCalledWith(true);
  });

  it('calls onToggle with false when clicked and currently on', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();
    renderWithProviders(<FavoritesToggle showFavoritesOnly={true} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole('button', { name: /toggle favorites/i });
    await user.click(toggle);

    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });
});
