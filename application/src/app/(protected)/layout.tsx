import React, { type ReactNode } from 'react';
import MaterialThemeProvider from 'components/Theme/Theme';
import { ThemePicker } from 'components/Theme/ThemePicker';
import NavigationHandler from './NavigationHandler';
import AppSidebar from '@/components/app-sidebar';

/**
 * Dashboard layout wrapper.
 * Injects the Dashboard layout and renders its child content.
 *
 * @param children - Content of the pages inside the dashboard layout.
 */
interface ProtectedLayoutProps { children: ReactNode }

export default function ProtectedLayout(props: ProtectedLayoutProps) {
  const { children } = props;
  return (
    <MaterialThemeProvider>
      <NavigationHandler />
      <div className="flex min-h-screen w-full bg-background">
        <aside className="hidden md:flex">
          <AppSidebar />
        </aside>
        <div className="flex min-w-0 grow flex-col">
          <div className="sticky top-0 z-20 flex h-12 items-center justify-end border-b bg-background/80 px-4 backdrop-blur md:h-14">
            <ThemePicker />
          </div>
          <main className="p-4 md:p-6">
            <div className="mx-auto w-full max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </MaterialThemeProvider>
  );
}
