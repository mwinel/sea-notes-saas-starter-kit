'use client';

/**
 * ResetPasswordFormView - Pure presentational component
 * Renders the reset password form UI without any business logic
 */
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { AuthWrapper } from '@/components/auth/shared/auth-wrapper';
import { ResetPasswordFormViewProps } from './types';

export function ResetPasswordFormView({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onResetPassword,
  onGoToLogin,
  isSubmitting,
  isSuccess,
  errors,
  className,
  ...props
}: ResetPasswordFormViewProps & React.ComponentProps<'div'>) {
  if (isSuccess) {
    return (
      <div className={className} {...props}>
        <Card>
          <CardContent>
            <div className="flex flex-col items-center gap-4 text-center">
              <CardTitle className="text-xl">Password Reset Successful</CardTitle>
              <CardDescription>
                Your password has been updated. You can now log in with your new password.
              </CardDescription>
              <Button onClick={onGoToLogin}>
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
      <AuthWrapper
        title="Reset Password"
        description="Enter your and confirm your new password below."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onResetPassword();
          }}
        >
          <FieldGroup>
            <Field data-invalid={!!errors?.password}>
              <FieldLabel htmlFor="new-password">New Password</FieldLabel>
              <PasswordInput
                id="new-password"
                placeholder="Enter new password"
                value={password || ''}
                onChange={(e) => onPasswordChange(e.target.value)}
                aria-invalid={!!errors?.password}
              />
              {errors?.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>
            <Field data-invalid={!!errors?.confirmPassword}>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <PasswordInput
                id="confirm-password"
                placeholder="Confirm new password"
                value={confirmPassword || ''}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                aria-invalid={!!errors?.confirmPassword}
              />
              {errors?.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
            </Field>
            <Field>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Update Password...' : 'Update Password'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
    </div>
  );
}
