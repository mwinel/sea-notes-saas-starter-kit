'use client';

/**
 * ForgotPasswordForm - Container component
 * Handles forgot password logic, form state, and API calls
 */
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigating } from '@/hooks/navigation';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { forgotPasswordSchema } from '@/components/auth/schemas';
import { ForgotPasswordFormView } from './forgot-password-form-view';
import { ForgotFormData } from './types';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { setNavigating, navigating } = useNavigating();

  const resolver = useYupValidationResolver(forgotPasswordSchema);
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<ForgotFormData>({ resolver });

  const email = watch('email') || '';

  const onSubmit = async (data: ForgotFormData) => {
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        toast.error(json.error || 'Something went wrong, please try again later.');
        setError('root', {
          type: 'server',
          message: json.error || 'Something went wrong, please try again later.',
        });
        return;
      }
      toast.success('A reset link has been sent to your email inbox.');
      reset();
    } catch {
      toast.error('Something went wrong, please try again later.');
      setError('root', {
        type: 'server',
        message: 'Something went wrong, please try again later.',
      });
    }
  };

  const onMagicLink = async () => {
    setNavigating(true);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        toast.error(json.error || 'Something went wrong, please try again later.');
        setError('root', {
          type: 'server',
          message: json.error || 'Something went wrong, please try again later.',
        });
        return;
      }
      toast.success('A magic link has been sent to your email inbox.');
      reset();
    } catch {
      toast.error('Something went wrong, please try again later.');
      setError('root', {
        type: 'server',
        message: 'Something went wrong, please try again later.',
      });
    } finally {
      setNavigating(false);
      reset();
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <ForgotPasswordFormView
      email={email}
      onEmailChange={(value) => setValue('email', value)}
      onResetPassword={handleFormSubmit}
      onSendMagicLink={onMagicLink}
      isSubmitting={isSubmitting}
      isNavigating={navigating}
      errors={errors}
      className={className}
      {...props}
    />
  );
}
