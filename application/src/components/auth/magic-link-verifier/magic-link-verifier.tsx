'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { AuthWrapper } from '@/components/auth/shared/auth-wrapper';
import { Button } from '@/components/ui/button';

/**
 * MagicLinkVerifier
 *
 * This component verifies a magic link for passwordless authentication. It reads the token and email from the URL query parameters,
 * calls the signIn function with the credentials provider, and redirects the user to the home page on success. Displays loading,
 * success, and error states to the user.
 */
export function MagicLinkVerifier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (!token || !email) {
      setStatus('error');
      setError('Missing token or email in the URL.');
      return;
    }

    const verifyMagicLink = async () => {
      try {
        await signIn('credentials', { email, magicLinkToken: token, redirect: false });
        setStatus('success');
        router.replace('/');
      } catch (err) {
        setStatus('error');
        setError(
          'Failed to verify magic link. ' + (err instanceof Error ? err.message : 'Unknown error')
        );
      }
    };

    verifyMagicLink();
  }, [router, searchParams]);

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-6">
        <AuthWrapper
          title="Login Successful"
          description="You have been successfully authenticated."
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
          </div>
        </AuthWrapper>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col gap-6">
        <AuthWrapper
          title="Verification Failed"
          description="There was an issue verifying your magic link."
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="w-12 h-12 text-destructive" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={() => router.push('/login')} variant="outline">
              Back to Login
            </Button>
          </div>
        </AuthWrapper>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthWrapper
        title="Verifying Magic Link"
        description="Please wait while we verify your authentication link."
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying magic link...</p>
        </div>
      </AuthWrapper>
    </div>
  );
}
