'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm({ resolver });

  const onSubmit = async (data: any) => {
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

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Sign up to get started with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="signup-form">
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Signup with Google
                </Button>
              </Field>
              <FieldSeparator className="mt-0.5 *:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <div className="grid grid-cols-2 gap-2">
                <Field data-invalid={!!errors.firstName}>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register('firstName')}
                    data-testid="firstname-input"
                    aria-invalid={!!errors.firstName}
                  />
                </Field>
                <Field data-invalid={!!errors.lastName}>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register('lastName')}
                    data-testid="lastname-input"
                    aria-invalid={!!errors.lastName}
                  />
                </Field>
              </div>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  data-testid="signup-email-input"
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  data-testid="signup-password-input"
                  aria-invalid={!!errors.password}
                />
              </Field>
              <Field>
                <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Signup'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
