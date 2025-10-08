import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from './signup-form';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('hooks/navigation', () => ({
  usePrefetchRouter: () => ({ navigate: jest.fn() }),
  useNavigating: () => ({ setNavigating: jest.fn() }),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Account created.' }),
    });
  });

  it('renders all inputs', () => {
    render(<SignUpForm />);
    expect(screen.getByTestId('firstname-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastname-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-password-input')).toBeInTheDocument();
  });

  it('form submission triggers onSubmit', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Account created.' }),
    });

    render(<SignUpForm />);

    // Fill out the form
    await userEvent.type(screen.getByTestId('firstname-input'), 'Test');
    await userEvent.type(screen.getByTestId('lastname-input'), 'User');
    await userEvent.type(screen.getByTestId('signup-email-input'), 'test@example.com');
    await userEvent.type(screen.getByTestId('signup-password-input'), 'password123');

    // Submit the form
    const form = screen.getByTestId('signup-form');
    await act(async () => {
      fireEvent.submit(form);
    });

    // Just check if fetch was called at all
    await waitFor(
      () => {
        expect(mockFetch).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('submits and calls the signup API with correct data', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Account created.' }),
    });

    render(<SignUpForm />);

    // Fill out the form
    await userEvent.type(screen.getByTestId('firstname-input'), 'Nelson');
    await userEvent.type(screen.getByTestId('lastname-input'), 'Douggy');
    await userEvent.type(screen.getByTestId('signup-email-input'), 'nelson@example.com');
    await userEvent.type(screen.getByTestId('signup-password-input'), 'securepass');

    // Submit the form
    const form = screen.getByTestId('signup-form');
    await act(async () => {
      fireEvent.submit(form);
    });

    // Wait for the fetch call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/auth/signup',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'Nelson',
            lastName: 'Douggy',
            email: 'nelson@example.com',
            password: 'securepass',
          }),
        })
      );
    });
  });

  it('shows error message if signup fails', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'User already exists' }),
    });

    const { toast } = require('sonner');

    render(<SignUpForm />);
    await userEvent.type(screen.getByTestId('firstname-input'), 'Nelson');
    await userEvent.type(screen.getByTestId('lastname-input'), 'Douggy');
    await userEvent.type(screen.getByTestId('signup-email-input'), 'exists@example.com');
    await userEvent.type(screen.getByTestId('signup-password-input'), 'abc12345');

    await act(async () => {
      fireEvent.submit(screen.getByTestId('signup-form'));
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User already exists');
    });
  });

  it('shows dynamic success message from API response', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Verification email sent.' }),
    });

    const { toast } = require('sonner');

    render(<SignUpForm />);

    await userEvent.type(screen.getByTestId('firstname-input'), 'Nelson');
    await userEvent.type(screen.getByTestId('lastname-input'), 'Douggy');
    await userEvent.type(screen.getByTestId('signup-email-input'), 'user@example.com');
    await userEvent.type(screen.getByTestId('signup-password-input'), 'securepass');

    await act(async () => {
      fireEvent.submit(screen.getByTestId('signup-form'));
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Verification email sent.');
    });
  });

  it('shows fallback success message when API response has no message', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const { toast } = require('sonner');

    render(<SignUpForm />);
    await userEvent.type(screen.getByTestId('firstname-input'), 'Nelson');
    await userEvent.type(screen.getByTestId('lastname-input'), 'Douggy');
    await userEvent.type(screen.getByTestId('signup-email-input'), 'user@example.com');
    await userEvent.type(screen.getByTestId('signup-password-input'), 'securepass');

    await act(async () => {
      fireEvent.submit(screen.getByTestId('signup-form'));
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Account created.');
    });
  });
});
