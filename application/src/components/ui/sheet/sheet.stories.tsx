import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '.';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Menu, Settings, User, Bell, Search, Filter, ShoppingCartIcon } from 'lucide-react';

const meta: Meta<typeof Sheet> = {
  title: 'Design System/Sheet',
  component: Sheet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a simple sheet with title and description.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Navigate to different sections.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-2">
          <a href="#" className="block py-2 text-sm hover:text-primary">
            Home
          </a>
          <a href="#" className="block py-2 text-sm hover:text-primary">
            About
          </a>
          <a href="#" className="block py-2 text-sm hover:text-primary">
            Services
          </a>
          <a href="#" className="block py-2 text-sm hover:text-primary">
            Contact
          </a>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Search for anything...</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Input placeholder="Type to search..." />
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Choose an action to perform.</SheetDescription>
        </SheetHeader>
        <div className="py-4 grid grid-cols-3 gap-4">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Copy</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromRight: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Right</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Configure your preferences.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">Settings content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Open Controlled Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Controlled Sheet</SheetTitle>
              <SheetDescription>This sheet's state is controlled externally.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm">You can control this sheet from outside the component.</p>
            </div>
            <SheetFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <p className="text-sm text-muted-foreground">Sheet is {open ? 'open' : 'closed'}</p>
      </div>
    );
  },
};

export const MobileMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="py-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent">
            <User className="size-4" />
            Profile
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent">
            <Settings className="size-4" />
            Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent">
            <Bell className="size-4" />
            Notifications
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const FilterSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Apply filters to refine your search.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Input type="number" placeholder="Min" />
            <Input type="number" placeholder="Max" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Reset</Button>
          </SheetClose>
          <Button>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SearchSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <div className="container max-w-4xl mx-auto">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>Search across all content.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Input placeholder="Type to search..." className="text-lg h-12" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon />
          <span className="absolute -top-2 -right-2 size-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>You have 3 items in your cart.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border-b pb-4">
              <div className="size-16 bg-muted rounded-md" />
              <div className="flex-1">
                <p className="font-medium">Product {item}</p>
                <p className="text-sm text-muted-foreground">$29.99</p>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          ))}
        </div>
        <SheetFooter>
          <div className="w-full space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>$89.97</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const NotificationPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute top-0 right-0 size-2 rounded-full bg-red-500" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You have 5 unread notifications.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border-b pb-4 last:border-b-0">
              <p className="font-medium text-sm">Notification {item}</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full">
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FormSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create New</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Item</SheetTitle>
          <SheetDescription>Fill in the details to create a new item.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter description" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option>Select category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Create</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">From Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">From Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">From Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">From Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
