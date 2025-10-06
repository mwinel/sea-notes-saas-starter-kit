'use client';

import { useNavigating } from 'hooks/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Auth layout used by pages such as login, signup or reset password.
 *
 * @param children - Content displayed in the central area of the layout.
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { setNavigating } = useNavigating();
  const router = useRouter();

  useEffect(() => {
    setNavigating(false);
  }, [setNavigating]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex-1">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="absolute top-4 left-4 md:left-10 z-10">
            <Button size="sm" variant="link" onClick={handleBack} aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
