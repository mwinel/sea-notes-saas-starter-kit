import { UserRole } from 'types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      email: string;
      role: UserRole;
      image: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
  }
}
