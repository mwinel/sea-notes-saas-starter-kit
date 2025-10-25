/**
 * Tests for ResetPasswordFormView - Pure UI rendering tests
 * No mocking of API calls, navigation, or complex state
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { ResetPasswordFormView } from './reset-password-form-view';

describe('ResetPasswordFormView', () => {
  const mockProps = {
    password: '',
    confirmPassword: '',
    onPasswordChange: jest.fn(),
    onConfirmPasswordChange: jest.fn(),
    onResetPassword: jest.fn(),
    onGoToLogin: jest.fn(),
    isSubmitting: false,
    isSuccess: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields when not in success state', () => {
    render(<ResetPasswordFormView {...mockProps} />);
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update Password' })).toBeInTheDocument();
  });

  it('should handle complete reset password form interaction flow', () => {
    render(<ResetPasswordFormView {...mockProps} />);

    // User enters password
    const passwordInput = screen.getByLabelText('New Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // User enters confirm password
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    // User submits the form
    const submitButton = screen.getByRole('button', { name: 'Update Password' });
    fireEvent.click(submitButton);

    expect(mockProps.onPasswordChange).toHaveBeenCalledWith('password123');
    expect(mockProps.onConfirmPasswordChange).toHaveBeenCalledWith('password123');
    expect(mockProps.onResetPassword).toHaveBeenCalled();
  });

  it('should disable button and show loading state when isSubmitting is true', () => {
    render(<ResetPasswordFormView {...mockProps} isSubmitting={true} />);
    const submitButton = screen.getByRole('button', { name: /Update Password/ });
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Update Password...')).toBeInTheDocument();
  });

  it('should show success state when isSuccess is true', () => {
    render(<ResetPasswordFormView {...mockProps} isSuccess={true} />);
    expect(screen.getByText('Password Reset Successful')).toBeInTheDocument();
    expect(
      screen.getByText('Your password has been updated. You can now log in with your new password.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to Login/ })).toBeInTheDocument();
  });

  it('should call onGoToLogin when Go to Login button is clicked', () => {
    render(<ResetPasswordFormView {...mockProps} isSuccess={true} />);
    const goToLoginButton = screen.getByRole('button', { name: /Go to Login/ });
    fireEvent.click(goToLoginButton);
    expect(mockProps.onGoToLogin).toHaveBeenCalled();
  });

  it('should not show form fields when in success state', () => {
    render(<ResetPasswordFormView {...mockProps} isSuccess={true} />);
    expect(screen.queryByLabelText('New Password')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Confirm Password')).not.toBeInTheDocument();
  });
});
