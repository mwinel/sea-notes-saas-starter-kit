/**
 * Types for signup form component
 */
export interface SignupFormViewProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFormSubmit: () => void;
  onGoogleSignIn: () => void;
  isSubmitting: boolean;
  errors?: Record<string, any>;
  className?: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
