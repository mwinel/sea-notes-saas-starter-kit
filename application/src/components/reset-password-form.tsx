'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

type ResetFormValues = {
  password?: string;
  confirmPassword?: string;
};

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ResetFormValues>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ResetFormValues) => {
    const { password, confirmPassword } = data;
    if (!password || !confirmPassword) {
      setError('root', { type: 'manual', message: 'Please fill in all fields.' });
      return;
    }
    if (password !== confirmPassword) {
      setError('root', { type: 'manual', message: 'Passwords do not match.' });
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError('root', { type: 'server', message: json.error || 'Something went wrong.' });
      } else {
        setSuccess(true);
      }
    } catch {
      setError('root', { type: 'server', message: 'Something went wrong. Please try again later.' });
    }
  };

  if (success) {
    return (
      <div className={className} {...props}>
        <Card>
          <CardContent>
            <div className="flex flex-col items-center gap-3 text-center">
              <CardTitle className="text-xl">Password Reset Successful</CardTitle>
              <CardDescription>
                Your password has been updated. You can now log in with your new password.
              </CardDescription>
              <Button onClick={() => router.push('/login')}>Go to Login</Button>
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
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                <PasswordInput id="new-password" placeholder="Enter new password" {...register('password')} />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <PasswordInput id="confirm-password" placeholder="Confirm new password" {...register('confirmPassword')} />
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
              <Field>
                <FieldDescription>{errors.root?.message}</FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}