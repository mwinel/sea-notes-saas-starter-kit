/**
 * Types for reset password form component
 */
export interface ResetPasswordFormViewProps {
  password?: string;
  confirmPassword?: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onResetPassword: () => void;
  onGoToLogin: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  errors?: Record<string, any>;
  className?: string;
}

export interface ResetFormData {
  password?: string;
  confirmPassword?: string;
}
