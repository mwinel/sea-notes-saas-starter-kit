'use client';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './UserContext';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NavigatingProvider } from './Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';

// Create a client
const queryClient = new QueryClient();

/**
 * Global wrapper that groups all context providers used in the application.
 * Includes session, theme, user and navigation.
 *
 * @param children - Tree of components that will receive these contexts.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <UserProvider>
              <NavigatingProvider>{children}</NavigatingProvider>
            </UserProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};
