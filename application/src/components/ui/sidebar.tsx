"use client"

import * as React from "react"
import type { HTMLAttributes, LiHTMLAttributes, ButtonHTMLAttributes } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronRight, PanelLeft } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "bg-sidebar text-sidebar-foreground flex h-full w-full flex-col",
  {
    variants: {
      variant: {
        default: "",
        floating: "rounded-xl border border-sidebar-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type SidebarContextType = {
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
)

function useSidebarContext() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebarContext must be used within Sidebar")
  return ctx
}

function Sidebar({
  className,
  variant,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof sidebarVariants>) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      <div data-slot="sidebar" className={cn(sidebarVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-header" className={cn("flex items-center gap-2 p-2", className)} {...props} />
  )
}

function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-content" className={cn("flex-1 overflow-auto px-2 py-1", className)} {...props} />
  )
}

function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-footer" className={cn("p-2", className)} {...props} />
  )
}

function SidebarRail({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { isMobileOpen, setIsMobileOpen } = useSidebarContext()
  return (
    <button
      type="button"
      aria-label="Toggle Sidebar"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className={cn(
        "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-md border border-l-0 bg-background p-1 shadow-sm md:hidden",
        className
      )}
      {...props}
    >
      <PanelLeft className="size-4" />
    </button>
  )
}

function SidebarGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-group" className={cn("px-1 py-2", className)} {...props} />
  )
}

function SidebarGroupLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-group-content" className={cn("grid gap-1", className)} {...props} />
  )
}

function SidebarMenu({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul data-slot="sidebar-menu" className={cn("grid gap-1", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return <li data-slot="sidebar-menu-item" className={cn("", className)} {...props} />
}

function SidebarMenuButton({
  className,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="sidebar-menu-button"
      className={cn(
        "group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSub({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul data-slot="sidebar-menu-sub" className={cn("ml-6 grid gap-1 border-l pl-3", className)} {...props} />
  )
}

function SidebarMenuSubItem({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return <li data-slot="sidebar-menu-sub-item" className={cn("", className)} {...props} />
}

function SidebarMenuSubButton({ className, asChild, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      className={cn(
        "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function CollapsibleTrigger({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [open, setOpen] = React.useState(false)
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn("group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)}
      {...props}
    >
      <span className="grow text-left">{children}</span>
      <ChevronRight
        className={cn("size-4 transition-transform", open ? "rotate-90" : "rotate-0")}
        aria-hidden="true"
      />
    </button>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  CollapsibleTrigger,
}

