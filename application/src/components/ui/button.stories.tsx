import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Heart, Mail, Download, Trash2 } from 'lucide-react';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Renders button as a Radix Slot component',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Icon buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-sm" variant="outline">
        <Heart />
      </Button>
      <Button size="icon" variant="outline">
        <Heart />
      </Button>
      <Button size="icon-lg" variant="outline">
        <Heart />
      </Button>
    </div>
  ),
};

// Buttons with icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail />
        Email
      </Button>
      <Button variant="secondary">
        <Download />
        Download
      </Button>
      <Button variant="destructive">
        <Trash2 />
        Delete
      </Button>
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading variant="destructive">
        Deleting
      </Button>
      <Button loading variant="outline">
        Processing
      </Button>
      <Button loading variant="secondary">
        Saving
      </Button>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="destructive">
        Disabled
      </Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
    </div>
  ),
};

// Destructive variant showcase
export const Destructive: Story = {
  args: {
    children: 'Delete Account',
    variant: 'destructive',
  },
};

// Outline variant showcase
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

// Secondary variant showcase
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

// Ghost variant showcase
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

// Link variant showcase
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Small size
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

// Large size
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Icon only
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Heart />,
    variant: 'outline',
  },
};

// Loading example
export const LoadingState: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

// Disabled example
export const DisabledState: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Complete showcase
export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Variants - Default Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">All Sizes - Default Variant</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon-sm" variant="outline">
            <Heart />
          </Button>
          <Button size="icon" variant="outline">
            <Heart />
          </Button>
          <Button size="icon-lg" variant="outline">
            <Heart />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail />
            Email
          </Button>
          <Button variant="secondary">
            <Download />
            Download
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button loading variant="destructive">
            Deleting
          </Button>
          <Button loading variant="outline">
            Processing
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button disabled variant="destructive">
            Disabled
          </Button>
          <Button disabled variant="outline">
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};
