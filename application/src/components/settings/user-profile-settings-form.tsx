'use client';

import { Button } from '@/components/ui/button';
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function UserProfileSettingsForm() {
  return (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>
        Manage your personal information and account details. Update your first name, last name,
        email address, and timezone preferences to personalize your experience.
      </FieldDescription>
      <form data-testid="">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                placeholder="John"
                // {...register('firstName')}
                data-testid="firstname-input"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                placeholder="Doe"
                // {...register('lastName')}
                data-testid="lastname-input"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              data-testid="user-profile-email-input"
            />
          </Field>
          <div className="flex justify-start">
            <Button type="submit">Update Profile</Button>
          </div>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
