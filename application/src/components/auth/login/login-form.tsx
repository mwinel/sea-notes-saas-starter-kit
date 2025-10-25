'use client';

/**
 * LoginForm - Container component
 * Handles authentication logic, form state, and API calls
 */
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { usePrefetchRouter } from '@/hooks/navigation';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { loginSchema } from '@/components/auth/schemas';
import { LoginFormData } from './types';
import { LoginFormView } from './login-form-view';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { navigate } = usePrefetchRouter();
  const resolver = useYupValidationResolver(loginSchema);
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful },
    watch,
  } = useForm<LoginFormData>({ resolver });
  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data;

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!res || res.code) {
        toast.error(res?.code || 'Something went wrong');
        setError('root', {
          type: 'manual',
          message: res?.code || 'Something went wrong',
        });
        return;
      } else if (res.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <LoginFormView
      email={email}
      password={password}
      onEmailChange={(value) => setValue('email', value)}
      onPasswordChange={(value) => setValue('password', value)}
      onFormSubmit={handleFormSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      isSubmitting={isSubmitting}
      isSuccess={isSubmitSuccessful}
      errors={{}}
      className={className}
      {...props}
    />
  );
}
