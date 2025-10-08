"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    return (first + last).toUpperCase();
  }
  if (email && email.includes('@')) return email[0]?.toUpperCase() ?? 'U';
  return 'U';
}

export function NavUser() {
  const { data } = useSession();
  const name = data?.user?.name ?? null;
  const email = data?.user?.email ?? null;
  const image = data?.user?.image ?? undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <Avatar className="size-6">
          <AvatarImage src={image} alt={name ?? 'User'} />
          <AvatarFallback>{getInitials(name, email)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 grow">
          <div className="truncate text-sm font-medium">{name ?? email ?? 'User'}</div>
          {email && <div className="truncate text-xs text-muted-foreground">{email}</div>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account">Manage Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/subscription">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavUser;

