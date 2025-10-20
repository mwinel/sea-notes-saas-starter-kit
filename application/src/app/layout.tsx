import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/providers';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'SeaNotes',
  description: 'SeaNotes - A SaaS Starter Kit note-taking app from DigitalOcean',
};

/**
 * Root layout of the application.
 * Applies global fonts, base styles and provides shared context through the Providers component.
 *
 * @returns HTML layout with fonts and providers applied.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
    <body>
      <Providers>
        {children}
        <Toaster richColors />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
