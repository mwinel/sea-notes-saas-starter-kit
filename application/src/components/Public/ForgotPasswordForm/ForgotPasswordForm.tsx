'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useYupValidationResolver } from 'hooks/useYupValidationResolver';
import { useNavigating } from 'hooks/navigation';

type ForgotFormValues = {
  email?: string;
};

/**
 * Forgot Password form.
 * Handles sending email for password reset and passwordless authentication.
 */
function ForgotPasswordForm() {
  const { setNavigating } = useNavigating();

  const validationSchema = yup.object().shape({
    email: yup.string().optional(),
  });
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    watch,
  } = useForm<ForgotFormValues>({ resolver });

  const email = watch('email') || '';

  const onSubmit = async (data: ForgotFormValues) => {
    setNavigating(true);
    try {
      if (!data.email) {
        setError('root', { type: 'server', message: 'Something went wrong' });
        return;
      }
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError('root', { type: 'server', message: json.error || 'Something went wrong, please try again later.' });
      } else {
        setError('root', { type: 'server', message: 'If your email exists in our system, a reset link has been sent.' });
      }
    } catch {
      setError('root', { type: 'server', message: 'Something went wrong, please try again later.' });
    } finally {
      setNavigating(false);
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
        setError('root', { type: 'server', message: json.error || 'Something went wrong, please try again later.' });
      } else {
        setError('root', { type: 'server', message: 'Magic link sent! Please check your email inbox.' });
      }
    } catch {
      setError('root', { type: 'server', message: 'Something went wrong, please try again later.' });
    } finally {
      setNavigating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email and we will send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="forgot-password-form">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
              </Field>
              <Field>
                <Button
                  type="submit"
                  loading={isSubmitting || isSubmitSuccessful}
                  disabled={isSubmitting || isSubmitSuccessful}
                >
                  Reset Password
                </Button>
              </Field>
              <Field>
                <Button type="button" variant="outline" onClick={onMagicLink}>
                  Send Magic Link
                </Button>
              </Field>
              <Field>
                <FieldDescription>
                  {errors.root?.message}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {/* Intentionally left minimal to mirror login page spacing */}
      </FieldDescription>
    </div>
  );
}

export default ForgotPasswordForm;
