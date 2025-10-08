import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ForgotPasswordForm } from './forgot-password-form';

jest.mock('hooks/navigation', () => ({
  useNavigating: () => ({ setNavigating: jest.fn() }),
}));

describe('ForgotPasswordForm (new)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields and buttons', () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send magic link/i })).toBeInTheDocument();
  });

  it('shows error if email is empty on submit', async () => {
    render(<ForgotPasswordForm />);
    fireEvent.submit(screen.getByTestId('forgot-password-form'));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows success when magic link sent', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as jest.Mock;
    render(<ForgotPasswordForm />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    fireEvent.click(screen.getByRole('button', { name: /send magic link/i }));
    expect(await screen.findByText(/magic link sent/i)).toBeInTheDocument();
  });
});

