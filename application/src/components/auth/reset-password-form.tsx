'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import { ArrowRightIcon } from 'lucide-react';

type ResetFormValues = {
  password?: string;
  confirmPassword?: string;
};

const validationSchema = yup.object().shape({
  password: yup.string().required('Please enter a new password.'),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),
});

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<ResetFormValues>({ resolver });

  const onSubmit = async (data: ResetFormValues) => {
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

  if (isSubmitSuccessful) {
    return (
      <div className={className} {...props}>
        <Card>
          <CardContent>
            <div className="flex flex-col items-center gap-4 text-center">
              <CardTitle className="text-xl">Password Reset Successful</CardTitle>
              <CardDescription>
                Your password has been updated. You can now log in with your new password.
              </CardDescription>
              <Button onClick={() => router.push('/login')}>
                Go to Login <ArrowRightIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your and confirm your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                <PasswordInput
                  id="new-password"
                  placeholder="Enter new password"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <PasswordInput
                  id="confirm-password"
                  placeholder="Confirm new password"
                  {...register('confirmPassword')}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  loading={isSubmitting || isSubmitSuccessful}
                  disabled={isSubmitting || isSubmitSuccessful}
                >
                  Update Password
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
