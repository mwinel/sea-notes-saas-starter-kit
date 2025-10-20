import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '.';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Menu, Settings, User, Bell, Filter, ShoppingCartIcon, Info } from 'lucide-react';

const meta: Meta<typeof Drawer> = {
  title: 'Design System/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a simple drawer with title and description.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm">Drawer content goes here.</p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromTop: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You have 3 new notifications.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
          <div className="text-sm border-b pb-2">New message from John</div>
          <div className="text-sm border-b pb-2">Task completed successfully</div>
          <div className="text-sm border-b pb-2">Your report is ready</div>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromBottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerDescription>Choose an action to perform.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-3 gap-4">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Copy</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromLeft: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Left</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Navigate to different sections.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
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
      </DrawerContent>
    </Drawer>
  ),
};

export const FromRight: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Right</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Configure your preferences.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm">Settings content goes here.</p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Controlled Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>This drawer's state is controlled externally.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm">You can control this drawer from outside the component.</p>
            </div>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <p className="text-sm text-muted-foreground">Drawer is {open ? 'open' : 'closed'}</p>
      </div>
    );
  },
};

export const MobileMenu: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <nav className="p-4 space-y-1">
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
      </DrawerContent>
    </Drawer>
  ),
};

export const FilterDrawer: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Apply filters to refine your search.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
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
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Reset</Button>
          </DrawerClose>
          <Button>Apply Filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon />
          <span className="absolute -top-2 -right-2 size-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>You have 3 items in your cart.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
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
        <DrawerFooter>
          <div className="w-full space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>$89.97</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const NotificationDrawer: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute top-0 right-0 size-2 rounded-full bg-red-500" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You have 5 unread notifications.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border-b pb-4 last:border-b-0">
              <p className="font-medium text-sm">Notification {item}</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button variant="outline" className="w-full">
            Mark all as read
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const FormDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create New</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Item</DrawerTitle>
          <DrawerDescription>Fill in the details to create a new item.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
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
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Create</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const InfoDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Info />
          More Info
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>About This Feature</DrawerTitle>
          <DrawerDescription>
            Learn more about how to use this feature effectively.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              This feature allows you to create and manage items efficiently. Start by clicking the
              "Create" button.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Tips</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Use keyboard shortcuts for faster navigation</li>
              <li>Save your work frequently</li>
              <li>Collaborate with your team members</li>
            </ul>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Got it</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const AllDirections: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant="outline">From Top</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Top Drawer</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">From Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">From Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom Drawer</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">From Left</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Product Details</DrawerTitle>
          <DrawerDescription>View detailed information about this product.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="aspect-video bg-muted rounded-lg" />
          <div>
            <h3 className="font-semibold mb-2">Premium Wireless Mouse</h3>
            <p className="text-sm text-muted-foreground">
              High-precision wireless mouse with ergonomic design and long battery life.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$49.99</span>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
