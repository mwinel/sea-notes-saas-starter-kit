'use client';

/**
 * SignupForm - Container component
 * Handles signup logic, form state, and API calls
 */
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useYupValidationResolver } from '@/hooks/useYupValidationResolver';
import { signupSchema } from '@/components/auth/schemas';
import { SignupFormData } from './types';
import { SignupFormView } from './signup-form-view';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const resolver = useYupValidationResolver(signupSchema);
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<SignupFormData>({ resolver });
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { firstName, lastName, email, password } = data;

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        toast.error(result.error || 'Something went wrong');
        setError('root', {
          type: 'manual',
          message: result.error || 'Something went wrong',
        });
        return;
      } else {
        toast.success(result.message || 'Account created.');
        reset();
      }
    } catch (error) {
      toast.error('Something went wrong during signup. Please try again later.');
      setError('root', {
        type: 'manual',
        message: 'Something went wrong during signup. Please try again later.',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    // Google signup logic would go here
    console.log('Google signup clicked');
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <SignupFormView
      firstName={firstName || ''}
      lastName={lastName || ''}
      email={email || ''}
      password={password || ''}
      onFirstNameChange={(value) => setValue('firstName', value)}
      onLastNameChange={(value) => setValue('lastName', value)}
      onEmailChange={(value) => setValue('email', value)}
      onPasswordChange={(value) => setValue('password', value)}
      onFormSubmit={handleFormSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      isSubmitting={isSubmitting}
      errors={errors}
      className={className}
      {...props}
    />
  );
}
