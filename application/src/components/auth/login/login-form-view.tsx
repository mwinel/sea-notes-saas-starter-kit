'use client';

/**
 * LoginFormView - Pure presentational component
 * Renders the login form UI without any business logic
 */
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { AuthWrapper } from '@/components/auth/shared/auth-wrapper';
import { GoogleButton } from '@/components/auth/shared/google-button';
import { AuthFooter } from '@/components/auth/shared/auth-footer';
import { LoginFormViewProps } from './types';

export function LoginFormView({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onFormSubmit,
  onGoogleSignIn,
  isSubmitting,
  isSuccess,
  errors,
  className,
  ...props
}: LoginFormViewProps & React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <AuthWrapper title="Welcome back" description="Login with your Google account or magic link.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit();
          }}
          data-testid="login-form"
        >
          <FieldGroup>
            <Field>
              <GoogleButton onClick={onGoogleSignIn}>Login with Google</GoogleButton>
            </Field>
            <FieldSeparator className="mt-0.5 *:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email || ''}
                onChange={(e) => onEmailChange(e.target.value)}
                aria-invalid={!!errors?.email}
              />
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
                value={password || ''}
                onChange={(e) => onPasswordChange(e.target.value)}
                aria-invalid={!!errors?.password}
              />
            </Field>
            <Field>
              <Button
                type="submit"
                loading={isSubmitting || isSuccess}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting || isSuccess ? 'Logging in...' : 'Login'}
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
      <AuthFooter />
    </div>
  );
}
