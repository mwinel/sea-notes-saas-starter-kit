import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthFooter } from './auth-footer';

describe('AuthFooter', () => {
  it('renders the footer text correctly', () => {
    render(<AuthFooter />);

    expect(screen.getByText(/By clicking continue, you agree to our/)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/)).toBeInTheDocument();
  });

  it('contains link to Terms of Service', () => {
    render(<AuthFooter />);

    const termsLink = screen.getByRole('link', { name: /Terms of Service/ });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');
  });

  it('contains link to Privacy Policy', () => {
    render(<AuthFooter />);

    const privacyLink = screen.getByRole('link', { name: /Privacy Policy/ });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
