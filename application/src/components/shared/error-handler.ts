/**
 * Error handling utilities for form components
 * Provides consistent error handling patterns across the application
 */
import { toast } from 'sonner';
import { FieldErrors, UseFormSetError } from 'react-hook-form';

export interface ErrorHandlerOptions {
  setError?: UseFormSetError<any>;
  showToast?: boolean;
  fallbackMessage?: string;
}

/**
 * Handles API response errors with consistent messaging and form error setting
 */
export function handleApiError(
  error: any,
  options: ErrorHandlerOptions = {}
): void {
  const { setError, showToast = true, fallbackMessage = 'Something went wrong, please try again later.' } = options;
  
  const errorMessage = error?.message || error?.error || fallbackMessage;
  
  if (showToast) {
    toast.error(errorMessage);
  }
  
  if (setError) {
    setError('root', {
      type: 'server',
      message: errorMessage,
    });
  }
}

/**
 * Handles successful API responses with consistent success messaging
 */
export function handleApiSuccess(
  message: string,
  showToast: boolean = true
): void {
  if (showToast) {
    toast.success(message);
  }
}

/**
 * Generic error handler for try-catch blocks
 */
export function handleGenericError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): void {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  handleApiError({ message: errorMessage }, options);
}
