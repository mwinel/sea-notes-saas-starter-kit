'use client';

/**
 * ForgotPasswordFormView - Pure presentational component
 * Renders the forgot password form UI without any business logic
 */
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { AuthWrapper } from '@/components/auth/shared/auth-wrapper';
import { ForgotPasswordFormViewProps } from './types';

export function ForgotPasswordFormView({
  email,
  onEmailChange,
  onResetPassword,
  onSendMagicLink,
  isSubmitting,
  isNavigating,
  errors,
  className,
  ...props
}: ForgotPasswordFormViewProps & React.ComponentProps<'div'>) {
  return (
    <div className={className} {...props}>
      <AuthWrapper
        title="Forgot your password?"
        description="Enter your email and we will send you a link to reset your password."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onResetPassword();
          }}
          className="flex flex-col gap-4"
          data-testid="forgot-password-form"
        >
          <FieldGroup>
            <Field data-invalid={!!errors?.email}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email || ''}
                onChange={(e) => onEmailChange(e.target.value)}
                aria-invalid={!!errors?.email}
              />
              {errors?.email && <FieldError errors={[errors.email]} />}
            </Field>
            <Field>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                data-testid="forgot-password-button"
              >
                {isSubmitting ? 'Reset Password...' : 'Reset Password'}
              </Button>
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Button
                type="button"
                variant="outline"
                onClick={onSendMagicLink}
                loading={isNavigating}
              >
                Send magic link
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
    </div>
  );
}
