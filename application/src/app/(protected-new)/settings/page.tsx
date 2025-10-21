import { SiteHeader } from '@/components/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { ThemeSettingsForm } from '@/components/theme-settings-form';
import { NotificationsSettingsForm } from '@/components/notifications-settings-form';
import { UserProfileSettingsForm } from '@/components/user-profile-settings-form';
import { TimezoneSettingsForm } from '@/components/timezone-settings-form';
import { PasswordSecuritySettingsForm } from '@/components/password-security-settings-form';
import { DeleteAccountSettings } from '@/components/delete-account-settings';

export default function Page() {
  return (
    <SidebarInset>
      <SiteHeader title="Settings" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="mx-auto w-full max-w-2xl space-y-14">
                <UserProfileSettingsForm />
                <PasswordSecuritySettingsForm />
                <TimezoneSettingsForm />
                <NotificationsSettingsForm />
                <ThemeSettingsForm />
                {/* Delete Account */}
                <DeleteAccountSettings />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
