import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '.';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MoreVertical, Settings, Share2, Heart, MessageCircle, Eye } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>New features have been added</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          We've released several new features this week including dark mode, better performance, and
          improved accessibility.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">New comment on your post</p>
          <p className="text-sm">John liked your photo</p>
          <p className="text-sm">Sarah started following you</p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderOnly: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Premium Plan</CardTitle>
        <CardDescription>Perfect for growing teams</CardDescription>
        <CardAction>
          <Badge className="bg-green-500 text-white border-transparent">Popular</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li>✓ Unlimited projects</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Custom domains</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>@johndoe</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button size="sm">Follow</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Full-stack developer passionate about building great user experiences. Love React,
          TypeScript, and all things web.
        </p>
      </CardContent>
      <CardFooter className="gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">1,234</span> Followers
        </div>
        <div>
          <span className="font-semibold text-foreground">567</span> Following
        </div>
      </CardFooter>
    </Card>
  ),
};

export const StatisticsCard: Story = {
  render: () => (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <CardAction>
          <Badge variant="secondary" className="text-xs">
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
      </CardContent>
    </Card>
  ),
};

export const BlogPostCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl" />
      <CardHeader>
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary">Tutorial</Badge>
          <Badge variant="secondary">React</Badge>
        </div>
        <CardTitle>Getting Started with React Hooks</CardTitle>
        <CardDescription>Learn how to use React Hooks in your applications</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          A comprehensive guide to understanding and using React Hooks effectively in your projects.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="size-4" />
            1.2k
          </span>
          <span className="flex items-center gap-1">
            <Heart className="size-4" />
            234
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-4" />
            12
          </span>
        </div>
        <Button variant="ghost" size="sm">
          Read More
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const SettingsCard: Story = {
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost">
            <Settings className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Receive notifications via email</div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive push notifications on your device
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground mt-1">+180 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground mt-1">+12 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94.2%</div>
          <p className="text-xs text-muted-foreground mt-1">+2.4% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Share Your Work</CardTitle>
        <CardDescription>Let others see what you've been working on</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost">
            <Share2 className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-orange-400 to-pink-600 rounded-lg mb-4" />
        <p className="text-sm">
          My latest design project featuring modern UI components and smooth animations.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          <Heart className="size-4" />
          Like
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageCircle className="size-4" />
          Comment
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="size-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const EmptyStateCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>No items found</CardTitle>
        <CardDescription>Get started by creating your first item</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-8">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Settings className="size-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground text-center mb-4">
          You haven't created any items yet. Create your first item to get started.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Item</Button>
      </CardFooter>
    </Card>
  ),
};
