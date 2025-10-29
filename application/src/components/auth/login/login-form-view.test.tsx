/**
 * Tests for LoginFormView - Pure UI rendering tests
 * No mocking of API calls, navigation, or complex state
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginFormView } from './login-form-view';

describe('LoginFormView', () => {
  const mockProps = {
    email: '',
    password: '',
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onFormSubmit: jest.fn(),
    onGoogleSignIn: jest.fn(),
    isSubmitting: false,
    isSuccess: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles complete login form interaction flow', () => {
    // Arrange & Act
    render(<LoginFormView {...mockProps} />);

    // User enters email
    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // User enters password
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // User submits the form
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    // Assert
    expect(mockProps.onEmailChange).toHaveBeenCalledWith('test@example.com');
    expect(mockProps.onPasswordChange).toHaveBeenCalledWith('password123');
    expect(mockProps.onFormSubmit).toHaveBeenCalled();
  });

  it('disables button and shows loading state when submitting', () => {
    // Arrange & Act
    render(<LoginFormView {...mockProps} isSubmitting={true} />);

    // Assert
    const submitButton = screen.getByRole('button', { name: /Logging in/ });
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('calls onGoogleSignIn when Google button is clicked', () => {
    // Arrange & Act
    render(<LoginFormView {...mockProps} />);
    const googleButton = screen.getByText('Login with Google');
    fireEvent.click(googleButton);

    // Assert
    expect(mockProps.onGoogleSignIn).toHaveBeenCalled();
  });
});
