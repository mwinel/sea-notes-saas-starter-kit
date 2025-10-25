'use client';

/**
 * SignupFormView - Pure presentational component
 * Renders the signup form UI without any business logic
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
import { SignupFormViewProps } from './types';

export function SignupFormView({
  firstName,
  lastName,
  email,
  password,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onFormSubmit,
  onGoogleSignIn,
  isSubmitting,
  errors,
  className,
  ...props
}: SignupFormViewProps & React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <AuthWrapper title="Create Account" description="Sign up to get started with your account.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit();
          }}
          data-testid="signup-form"
        >
          <FieldGroup>
            <Field>
              <GoogleButton onClick={onGoogleSignIn}>Signup with Google</GoogleButton>
            </Field>
            <FieldSeparator className="mt-0.5 *:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <div className="grid grid-cols-2 gap-2">
              <Field data-invalid={!!errors?.firstName}>
                <FieldLabel htmlFor="firstName">First name</FieldLabel>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  data-testid="firstname-input"
                  aria-invalid={!!errors?.firstName}
                />
              </Field>
              <Field data-invalid={!!errors?.lastName}>
                <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  data-testid="lastname-input"
                  aria-invalid={!!errors?.lastName}
                />
              </Field>
            </div>
            <Field data-invalid={!!errors?.email}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                data-testid="signup-email-input"
                aria-invalid={!!errors?.email}
              />
            </Field>
            <Field data-invalid={!!errors?.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                data-testid="signup-password-input"
                aria-invalid={!!errors?.password}
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
      </AuthWrapper>
      <AuthFooter />
    </div>
  );
}
