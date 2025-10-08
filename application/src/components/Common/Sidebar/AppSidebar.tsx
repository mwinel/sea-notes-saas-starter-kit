"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Notebook, CreditCard, UserCog, Shield } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/my-notes", label: "My Notes", icon: Notebook },
  { href: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
  { href: "/dashboard/account", label: "Account", icon: UserCog },
  { href: "/admin/dashboard", label: "Admin", icon: Shield },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="px-3 py-3">
        <Link href="/dashboard" className="text-sm font-semibold">
          An inset sidebar with secondary navigation
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href))
                return (
                  <SidebarMenuItem key={href}>
                    <Link href={href} className="block">
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "justify-start",
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : undefined
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="size-4" />
                          <span>{label}</span>
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-3 text-xs text-muted-foreground">
        © {new Date().getFullYear()}
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

