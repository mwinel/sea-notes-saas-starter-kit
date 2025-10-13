import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ResetPasswordForm } from './reset-password-form';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'test-token' }),
  useRouter: () => ({ push: jest.fn() }),
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

describe('ResetPasswordForm (new)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as any) = jest.fn();
  });

  it('renders the form fields and button', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
  });

  it('validates that confirm password matches the password', async () => {
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'DifferentPassword123!' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update password/i }));
    });

    await waitFor(() => expect(screen.getByText(/passwords must match/i)).toBeInTheDocument());
  });

  it('handles error when token is missing or invalid', async () => {
    // Mock fetch to return token error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Token and password are required.' }),
    });

    render(<ResetPasswordForm />);

    // Fill in matching passwords
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update password/i }));
    });

    // Verify the API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/reset-password',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });

  it('shows success UI on successful password reset', async () => {
    // Mock fetch to return success
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ResetPasswordForm />);

    // Fill in matching passwords
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'NewPassword123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'NewPassword123!' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update password/i }));
    });

    // Verify success UI is shown
    await waitFor(() => {
      expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /your password has been updated\. you can now log in with your new password\./i
        )
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to login/i })).toBeInTheDocument();
    });

    // Verify the API was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/reset-password',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'test-token', password: 'NewPassword123!' }),
      })
    );
  });
});
