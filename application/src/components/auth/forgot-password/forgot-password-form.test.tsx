import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ForgotPasswordForm } from './forgot-password-form';

jest.mock('hooks/navigation', () => ({
  useNavigating: () => ({ setNavigating: jest.fn() }),
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

describe('ForgotPasswordForm (new)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows field error when email format is invalid', async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/email address/i);

    // Enter an invalid email format
    await user.type(emailInput, 'invalid-email');

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByTestId('forgot-password-form'));
    });

    // Check that the field error is displayed
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });

    // Ensure the API was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('calls API and shows success toast when valid email is submitted', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { toast } = require('sonner');
    const user = userEvent.setup();

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/email address/i);

    // Enter a valid email address
    await user.type(emailInput, 'test@example.com');

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByTestId('forgot-password-form'));
    });

    // Verify the API was called with correct parameters
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });

    // Verify success toast was shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('A reset link has been sent to your email inbox.');
    });

    // Verify the form was reset (email input should be empty)
    expect(emailInput).toHaveValue('');
  });

  it('calls magic-link API and shows success toast when magic link button is clicked', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { toast } = require('sonner');
    const user = userEvent.setup();

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const magicLinkButton = screen.getByRole('button', { name: /send magic link/i });

    // Enter a valid email address
    await user.type(emailInput, 'test@example.com');

    // Click the magic link button
    await act(async () => {
      fireEvent.click(magicLinkButton);
    });

    // Verify the API was called with correct parameters
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });

    // Verify success toast was shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('A magic link has been sent to your email inbox.');
    });

    // Verify the form was reset (email input should be empty)
    expect(emailInput).toHaveValue('');
  });

  it('shows error toast when magic link button is clicked with empty email', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Email address is required.' }),
    });

    const { toast } = require('sonner');

    render(<ForgotPasswordForm />);

    const magicLinkButton = screen.getByRole('button', { name: /send magic link/i });

    // Click the magic link button without entering an email
    await act(async () => {
      fireEvent.click(magicLinkButton);
    });

    // Verify the API was called with an empty email
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }),
      });
    });

    // Verify error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email address is required.');
    });
  });

  it('shows error toast when magic link API returns user not found error', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'User not found.' }),
    });

    const { toast } = require('sonner');
    const user = userEvent.setup();

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const magicLinkButton = screen.getByRole('button', { name: /send magic link/i });

    // Enter an email that doesn't exist in the system
    await user.type(emailInput, 'nonexistent@example.com');

    // Click the magic link button
    await act(async () => {
      fireEvent.click(magicLinkButton);
    });

    // Verify the API was called with the email
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'nonexistent@example.com' }),
      });
    });

    // Verify error toast was shown with user not found message
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User not found.');
    });
  });
});
