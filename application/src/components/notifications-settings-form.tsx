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
import { Switch } from '@/components/ui/switch';

const NOTIFICATION_OPTIONS = [
  {
    key: 'securityAlerts',
    label:
      'Receive immediate alerts for suspicious login attempts, password changes, and critical account security events.',
  },
  {
    key: 'featureAnnouncements',
    label:
      'Stay informed about new features, product updates, and improvements that enhance your experience.',
  },
  {
    key: 'newsletters',
    label:
      'Receive our monthly newsletter with helpful tips, best practices, and platform usage insights.',
  },
  {
    key: 'promotionalContent',
    label:
      'Get notified about exclusive special offers, discounts, and promotional content tailored for you.',
  },
];

export function NotificationsSettingsForm() {
  return (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>
        Customize your notification preferences to stay updated on what matters most. Choose which
        types of notifications you'd like to receive, including email alerts for important updates,
        reminders, and account activities.
      </FieldDescription>
      <form data-testid="notifications-settings-form">
        <FieldGroup className="gap-2">
          {NOTIFICATION_OPTIONS.map((option) => (
            <Field key={option.key} className="gap-0">
              <div className="flex items-center space-x-3 p-4 border rounded-md">
                <Switch id={option.key} />
                <FieldLabel htmlFor={option.key} className="font-normal text-sm pr-6">
                  {option.label.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </FieldLabel>
              </div>
            </Field>
          ))}
          <div className="flex justify-start mt-6">
            <Button type="submit">Save Preferences</Button>
          </div>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
