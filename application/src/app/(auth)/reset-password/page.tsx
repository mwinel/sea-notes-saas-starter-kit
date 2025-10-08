import Link from 'next/link';
import ResetPasswordForm from '@/components/Public/ResetPasswordForm/ResetPasswordForm';

/**
 * Reset password page using the auth layout and brand header.
 */
export default function ResetPasswordPage() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          🐳
        </div>
        <span className="text-xl font-bold">SeaNotes</span>
      </Link>
      <ResetPasswordForm />
    </>
  );
}

