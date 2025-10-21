'use client';

import { Button } from '@/components/ui/button';

export function DeleteAccountSettings() {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 space-y-4">
      <div>
        <h1 className="text-base font-semibold text-destructive">Delete Account</h1>
        <p className="text-muted-foreground text-sm mt-4">
          Once you delete your account, there is no going back. Please be certain. This action will
          permanently remove all your data, notes, and settings from our servers.
        </p>
      </div>
      <Button variant="destructive">Delete Account</Button>
    </div>
  );
}
