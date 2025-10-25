/**
 * Tests for ForgotPasswordFormView - Pure UI rendering tests
 * No mocking of API calls, navigation, or complex state
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { ForgotPasswordFormView } from './forgot-password-form-view';

describe('ForgotPasswordFormView', () => {
  const mockProps = {
    email: '',
    onEmailChange: jest.fn(),
    onResetPassword: jest.fn(),
    onSendMagicLink: jest.fn(),
    isSubmitting: false,
    isNavigating: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form elements', () => {
    render(<ForgotPasswordFormView {...mockProps} />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send magic link' })).toBeInTheDocument();
  });

  it('should handle complete forgot password form interaction flow', () => {
    render(<ForgotPasswordFormView {...mockProps} />);

    // User enters email
    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // User submits the form
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });
    fireEvent.click(submitButton);

    expect(mockProps.onEmailChange).toHaveBeenCalledWith('test@example.com');
    expect(mockProps.onResetPassword).toHaveBeenCalled();
  });

  it('should call onSendMagicLink when Send magic link button is clicked', () => {
    render(<ForgotPasswordFormView {...mockProps} />);
    const magicLinkButton = screen.getByRole('button', { name: 'Send magic link' });
    fireEvent.click(magicLinkButton);
    expect(mockProps.onSendMagicLink).toHaveBeenCalled();
  });

  it('should disable Reset Password button and show loading state when isSubmitting is true', () => {
    render(<ForgotPasswordFormView {...mockProps} isSubmitting={true} />);
    const resetButton = screen.getByRole('button', { name: /Reset Password/ });
    expect(resetButton).toBeDisabled();
    expect(screen.getByText('Reset Password...')).toBeInTheDocument();
  });

  it('should disable Send magic link button when isNavigating is true', () => {
    render(<ForgotPasswordFormView {...mockProps} isNavigating={true} />);
    const magicLinkButton = screen.getByRole('button', { name: /Send magic link/ });
    expect(magicLinkButton).toBeDisabled();
  });
});
