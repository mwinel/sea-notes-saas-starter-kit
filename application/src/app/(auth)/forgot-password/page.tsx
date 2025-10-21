import Link from 'next/link';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function Page() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          🐳
        </div>
        <span className="text-xl font-bold">SeaNotes</span>
      </Link>
      <ForgotPasswordForm />
    </>
  );
}
