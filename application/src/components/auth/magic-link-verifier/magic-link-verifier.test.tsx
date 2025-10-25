import { render, screen, waitFor, act } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagicLinkVerifier } from './magic-link-verifier';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation');

// Mock fetch globally
global.fetch = jest.fn();

describe('MagicLinkVerifier', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
  });

  it('shows verifying message initially', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        if (key === 'token') return 'test-token';
        if (key === 'email') return 'test@example.com';
        return null;
      },
    });

    render(<MagicLinkVerifier />);
    await waitFor(() => expect(screen.getByText('Verifying magic link...')).toBeInTheDocument());
  });

  it('shows success message and redirects on successful verification', async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ ok: true });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        if (key === 'token') return 'test-token';
        if (key === 'email') return 'test@example.com';
        return null;
      },
    });

    render(<MagicLinkVerifier />);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        magicLinkToken: 'test-token',
        redirect: false,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Redirecting to dashboard...')).toBeInTheDocument();
    });

    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  it('shows error message when token or email is missing', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<MagicLinkVerifier />);

    expect(screen.getByText(/Missing token or email in the URL/)).toBeInTheDocument();
  });

  it('shows error message when verification fails', async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockRejectedValue(new Error('Verification failed'));

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        if (key === 'token') return 'invalid-token';
        if (key === 'email') return 'test@example.com';
        return null;
      },
    });

    render(<MagicLinkVerifier />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to verify magic link/)).toBeInTheDocument();
    });
  });
});
