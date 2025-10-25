/**
 * Tests for LoginForm - Business logic and integration tests
 * Mock API calls, test state management, navigation
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { usePrefetchRouter } from '@/hooks/navigation';
import { LoginForm } from './login-form';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/hooks/navigation', () => ({
  usePrefetchRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('LoginForm', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePrefetchRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it('should call signIn with correct credentials on submit', async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should navigate to dashboard on successful login', async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should handle Google sign in', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText('Login with Google'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/dashboard' });
    });
  });

  it('should handle login errors', async () => {
    (signIn as jest.Mock).mockResolvedValue({
      ok: false,
      code: 'Invalid credentials',
    });

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrong');
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
    });
  });
});
