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

  it('should render all form fields', () => {
    render(<LoginFormView {...mockProps} />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  it('should handle complete login form interaction flow', () => {
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

    expect(mockProps.onEmailChange).toHaveBeenCalledWith('test@example.com');
    expect(mockProps.onPasswordChange).toHaveBeenCalledWith('password123');
    expect(mockProps.onFormSubmit).toHaveBeenCalled();
  });

  it('should disable button and show loading state when isSubmitting is true', () => {
    render(<LoginFormView {...mockProps} isSubmitting={true} />);
    const submitButton = screen.getByRole('button', { name: /Logging in/ });
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('should call onGoogleSignIn when Google button is clicked', () => {
    render(<LoginFormView {...mockProps} />);
    const googleButton = screen.getByText('Login with Google');
    fireEvent.click(googleButton);
    expect(mockProps.onGoogleSignIn).toHaveBeenCalled();
  });

  it('should render forgot password link', () => {
    render(<LoginFormView {...mockProps} />);
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });

  it('should render sign up link', () => {
    render(<LoginFormView {...mockProps} />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
