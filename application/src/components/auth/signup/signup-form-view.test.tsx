/**
 * Tests for SignupFormView - Pure UI rendering tests
 * No mocking of API calls, navigation, or complex state
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { SignupFormView } from './signup-form-view';

describe('SignupFormView', () => {
  const mockProps = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    onFirstNameChange: jest.fn(),
    onLastNameChange: jest.fn(),
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onFormSubmit: jest.fn(),
    onGoogleSignIn: jest.fn(),
    isSubmitting: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles complete signup form interaction flow', () => {
    // Arrange & Act
    render(<SignupFormView {...mockProps} />);

    // User enters first name
    const firstNameInput = screen.getByLabelText('First name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    // User enters last name
    const lastNameInput = screen.getByLabelText('Last name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    // User enters email
    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // User enters password
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // User submits the form
    const submitButton = screen.getByRole('button', { name: 'Signup' });
    fireEvent.click(submitButton);

    // Assert
    expect(mockProps.onFirstNameChange).toHaveBeenCalledWith('John');
    expect(mockProps.onLastNameChange).toHaveBeenCalledWith('Doe');
    expect(mockProps.onEmailChange).toHaveBeenCalledWith('test@example.com');
    expect(mockProps.onPasswordChange).toHaveBeenCalledWith('password123');
    expect(mockProps.onFormSubmit).toHaveBeenCalled();
  });

  it('disables button and shows loading state when submitting', () => {
    // Arrange & Act
    render(<SignupFormView {...mockProps} isSubmitting={true} />);

    // Assert
    const submitButton = screen.getByRole('button', { name: /Creating account/ });
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Creating account...')).toBeInTheDocument();
  });

  it('calls onGoogleSignIn when Google button is clicked', () => {
    // Arrange & Act
    render(<SignupFormView {...mockProps} />);
    const googleButton = screen.getByText('Signup with Google');
    fireEvent.click(googleButton);

    // Assert
    expect(mockProps.onGoogleSignIn).toHaveBeenCalled();
  });
});
