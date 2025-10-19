import { auth } from '@/lib/auth/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log('session', session?.user);
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={session?.user} />
      {children}
    </SidebarProvider>
  );
}
