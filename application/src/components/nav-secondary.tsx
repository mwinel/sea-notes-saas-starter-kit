"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, UserCog, Shield } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavSecondary() {
  const pathname = usePathname();
  const items = [
    { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
    { href: '/dashboard/account', label: 'Account', icon: UserCog },
    { href: '/admin/dashboard', label: 'Admin', icon: Shield },
  ];

  return (
    <SidebarMenu>
      {items.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname?.startsWith(href);
        return (
          <SidebarMenuItem key={href}>
            <Link href={href} className="block">
              <SidebarMenuButton
                asChild
                className={cn('justify-start', isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : undefined)}
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <span>{label}</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export default NavSecondary;

