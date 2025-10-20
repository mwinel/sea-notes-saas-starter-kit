import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '.';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, Bell, CreditCard, Home, Search, Mail } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">
          <User />
          Account
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
      <TabsContent value="notifications">Notifications content</TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>View your account overview and statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Your overview content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Detailed analytics and insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Your analytics content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and download reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Your reports content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const AccountSettings: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input
                className="flex h-9 w-full rounded-md border px-3 py-1 text-sm"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-sm"
                defaultValue="john@example.com"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">Change password and enable two-factor authentication.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your billing information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">View invoices and update payment methods.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Home content</TabsContent>
      <TabsContent value="profile">Profile content</TabsContent>
      <TabsContent value="settings">Settings content (disabled)</TabsContent>
    </Tabs>
  ),
};

export const IconsOnly: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="home">
          <Home />
        </TabsTrigger>
        <TabsTrigger value="search">
          <Search />
        </TabsTrigger>
        <TabsTrigger value="mail">
          <Mail />
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Home content</TabsContent>
      <TabsContent value="search">Search content</TabsContent>
      <TabsContent value="mail">Mail content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-2xl">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
      <TabsContent value="tab4">Content for Tab 4</TabsContent>
    </Tabs>
  ),
};

export const ProductDetails: Story = {
  render: () => (
    <Tabs defaultValue="description" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="space-y-4">
        <h3 className="text-lg font-semibold">Product Description</h3>
        <p className="text-sm text-muted-foreground">
          This is a high-quality product designed to meet your needs. It features advanced
          technology and durable construction.
        </p>
      </TabsContent>
      <TabsContent value="specifications" className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Specifications</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dimensions:</span>
            <span>10 x 5 x 2 inches</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span>1.5 lbs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Material:</span>
            <span>Aluminum</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <p className="text-sm text-muted-foreground">4.5 out of 5 stars (124 reviews)</p>
      </TabsContent>
    </Tabs>
  ),
};

export const DashboardTabs: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-full max-w-4xl">
      <TabsList>
        <TabsTrigger value="dashboard">
          <Home />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="users">
          <User />
          Users
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard />
          Billing
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2,543</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$45,231</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">127</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage your users and permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">User list and management tools go here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing & Invoices</CardTitle>
            <CardDescription>View your billing history and manage payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Billing information and invoices go here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your application settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Application settings go here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to login.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input className="flex h-9 w-full rounded-md border px-3 py-1 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="flex h-9 w-full rounded-md border px-3 py-1 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
