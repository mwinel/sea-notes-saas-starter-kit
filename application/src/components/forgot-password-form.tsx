'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import { useNavigating } from 'hooks/navigation';

type ForgotFormValues = {
  email?: string;
};

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { setNavigating, navigating } = useNavigating();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter a valid email address.')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please enter a valid email address.'),
  });
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<ForgotFormValues>({ resolver });

  const email = watch('email') || '';

  const onSubmit = async (data: ForgotFormValues) => {
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

  return (
    <div className={className} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email and we will send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            data-testid="forgot-password-form"
          >
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>
              <Field>
                <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                  Reset Password
                </Button>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Button type="button" variant="outline" onClick={onMagicLink} loading={navigating}>
                  Send magic link
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
