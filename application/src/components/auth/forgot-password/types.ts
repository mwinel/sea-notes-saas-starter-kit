/**
 * Types for forgot password form component
 */
export interface ForgotPasswordFormViewProps {
  email?: string;
  onEmailChange: (value: string) => void;
  onResetPassword: () => void;
  onSendMagicLink: () => void;
  isSubmitting: boolean;
  isNavigating: boolean;
  errors?: Record<string, any>;
  className?: string;
}

export interface ForgotFormData {
  email?: string;
}
