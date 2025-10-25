'use client';

import { useState, useEffect, useRef } from 'react';
import { IconMoon, IconSun, IconDeviceDesktop } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getIcon = () => {
    if (theme === 'dark') return <IconMoon className="h-4 w-4" />;
    if (theme === 'light') return <IconSun className="h-4 w-4" />;
    return <IconDeviceDesktop className="h-4 w-4" />;
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // Remove focus from the trigger button after selection
    setTimeout(() => {
      triggerRef.current?.blur();
    }, 0);
  };

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton ref={triggerRef} tooltip="Toggle theme">
            {getIcon()}
            <span>Theme</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="min-w-[160px]">
          <DropdownMenuItem onClick={() => handleThemeChange('light')}>
            <IconSun className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
            <IconMoon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('system')}>
            <IconDeviceDesktop className="h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
