import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResetPasswordForm } from './reset-password-form';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'test-token' }),
  useRouter: () => ({ push: jest.fn() }),
}));

describe('ResetPasswordForm (new)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as any) = jest.fn();
  });

  it('renders fields and submit', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
  });

  it('validates mismatched passwords', async () => {
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'def' } });
    fireEvent.click(screen.getByRole('button', { name: /update password/i }));
    await waitFor(() => expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument());
  });

  it('shows success UI on successful reset', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: /update password/i }));
    await waitFor(() => {
      expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to login/i })).toBeInTheDocument();
    });
  });
});

