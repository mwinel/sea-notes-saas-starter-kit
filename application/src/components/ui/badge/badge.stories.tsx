import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from '.';
import { Check, X, AlertTriangle, Info, Star } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <Check className="size-3" />
        Success
      </Badge>
      <Badge variant="destructive">
        <X className="size-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <AlertTriangle className="size-3" />
        Warning
      </Badge>
      <Badge variant="outline">
        <Info className="size-3" />
        Info
      </Badge>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <Check className="size-3" />
      </Badge>
      <Badge variant="destructive">
        <X className="size-3" />
      </Badge>
      <Badge variant="secondary">
        <Star className="size-3" />
      </Badge>
      <Badge variant="outline">
        <Info className="size-3" />
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge className="bg-green-500 text-white border-transparent">Active</Badge>
      <Badge className="bg-yellow-500 text-white border-transparent">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge className="bg-blue-500 text-white border-transparent">In Progress</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge className="bg-purple-500 text-white border-transparent">Published</Badge>
    </div>
  ),
};

export const Numbers: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>1</Badge>
      <Badge variant="secondary">99</Badge>
      <Badge variant="destructive">999+</Badge>
      <Badge variant="outline">42</Badge>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge asChild>
        <a href="#" className="cursor-pointer">
          Clickable
        </a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#" className="cursor-pointer">
          Link Badge
        </a>
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge className="text-[10px] px-1.5 py-0">Extra Small</Badge>
      <Badge>Small (Default)</Badge>
      <Badge className="text-sm px-3 py-1">Medium</Badge>
      <Badge className="text-base px-4 py-1.5">Large</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge>
          <Check className="size-3" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Check className="size-3" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <X className="size-3" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Info className="size-3" />
          Outline
        </Badge>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 border rounded-lg max-w-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Product Name</h3>
        <Badge className="bg-green-500 text-white border-transparent">In Stock</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        This is a sample product description showing how badges can be used in context.
      </p>
      <div className="flex gap-2">
        <Badge variant="secondary">Electronics</Badge>
        <Badge variant="secondary">New</Badge>
        <Badge variant="outline">Featured</Badge>
      </div>
    </div>
  ),
};

export const NotificationBadge: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Messages
        </button>
        <Badge className="absolute -top-2 -right-2 rounded-full size-5 p-0 text-[10px]">3</Badge>
      </div>
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Notifications
        </button>
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 rounded-full size-5 p-0 text-[10px]"
        >
          9
        </Badge>
      </div>
    </div>
  ),
};
