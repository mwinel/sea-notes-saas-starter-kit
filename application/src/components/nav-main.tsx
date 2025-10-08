"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Notebook } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavMain() {
  const pathname = usePathname();
  const items = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-notes', label: 'My Notes', icon: Notebook },
  ];

  return (
    <SidebarMenu>
      {items.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));
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

export default NavMain;

