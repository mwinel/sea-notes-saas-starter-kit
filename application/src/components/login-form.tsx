'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { signIn } from 'next-auth/react';
import { usePrefetchRouter } from 'hooks/navigation';
import { toast } from 'sonner';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object().shape({
  email: yup.string().optional(),
  password: yup.string().optional(),
});

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { navigate } = usePrefetchRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver });

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!res || res.code) {
        toast.error(res?.code || 'Something went wrong');
        // Set a form error to trigger form state reset
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

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
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
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="mt-0.5 *:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  loading={isSubmitting || isSubmitSuccessful}
                  disabled={isSubmitting || isSubmitSuccessful}
                >
                  {isSubmitting || isSubmitSuccessful ? 'Logging in...' : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and{' '}
        <a href="/privacy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
