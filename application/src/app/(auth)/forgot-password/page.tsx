import Link from 'next/link';
import ForgotPasswordForm from '@/components/Public/ForgotPasswordForm/ForgotPasswordForm';

/**
 * Forgot password page using the auth layout and brand header.
 */
export default function ForgotPasswordPage() {
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

