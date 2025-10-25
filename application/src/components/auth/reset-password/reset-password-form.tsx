'use client';

/**
 * ResetPasswordForm - Container component
 * Handles password reset logic, form state, and API calls
 */
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { resetPasswordSchema } from '@/components/auth/schemas';
import { ResetPasswordFormView } from './reset-password-form-view';
import { ResetFormData } from './types';

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const resolver = useYupValidationResolver(resetPasswordSchema);
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
    watch,
  } = useForm<ResetFormData>({ resolver });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: ResetFormData) => {
    const { password } = data;

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        toast.error(json.error || 'Something went wrong.');
        setError('root', { type: 'server', message: json.error || 'Something went wrong.' });
        return;
      }
      toast.success('Password reset successful.');
      reset();
    } catch {
      toast.error('Something went wrong. Please try again later.');
      setError('root', {
        type: 'server',
        message: 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <ResetPasswordFormView
      password={password}
      confirmPassword={confirmPassword}
      onPasswordChange={(value) => setValue('password', value)}
      onConfirmPasswordChange={(value) => setValue('confirmPassword', value)}
      onResetPassword={handleFormSubmit}
      onGoToLogin={handleGoToLogin}
      isSubmitting={isSubmitting}
      isSuccess={isSubmitSuccessful}
      errors={errors}
      className={className}
      {...props}
    />
  );
}
