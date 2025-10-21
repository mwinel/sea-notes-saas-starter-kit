'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel,
} from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

export function PasswordSecuritySettingsForm() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <FieldSet>
      <FieldLegend>Password reset</FieldLegend>
      <FieldDescription>
        Reset your password to secure your account. Enter your current password and new password to
        update your password.
      </FieldDescription>
      <form data-testid="">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
            <PasswordInput
              id="currentPassword"
              placeholder="Enter current password"
              data-testid="current-password-input"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <PasswordInput
              id="newPassword"
              placeholder="Enter new password"
              data-testid="new-password-input"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm new password"
              data-testid="confirm-password-input"
            />
          </Field>
          <div className="flex justify-start">
            <Button type="submit">Reset Password</Button>
          </div>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
