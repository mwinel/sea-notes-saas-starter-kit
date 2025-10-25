/**
 * Types for login form component
 */
export interface LoginFormViewProps {
  email?: string;
  password?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFormSubmit: () => void;
  onGoogleSignIn: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  errors?: Record<string, any>;
  className?: string;
}

export interface LoginFormData {
  email?: string;
  password?: string;
}
