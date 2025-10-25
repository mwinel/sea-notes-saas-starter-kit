import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup/signup-form';

export default function LoginPage() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          🐳
        </div>
        <span className="text-xl font-bold">SeaNotes</span>
      </Link>
      <SignUpForm />
    </>
  );
}
