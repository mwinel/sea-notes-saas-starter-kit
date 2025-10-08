import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Loader2Icon, PlusIcon, TrashIcon, DownloadIcon } from 'lucide-react';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component built with Radix UI and styled with Tailwind CSS. Supports multiple variants, sizes, loading states, and can render as different elements using the asChild prop.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a loading spinner and disables the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as a child element (using Radix Slot)',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// Icon buttons
export const Icon: Story = {
  args: {
    size: 'icon',
    children: <PlusIcon />,
  },
};

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: <PlusIcon />,
  },
};

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: <PlusIcon />,
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <DownloadIcon />
        Download
      </>
    ),
  },
};

export const WithIconOutline: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        <PlusIcon />
        Add Item
      </>
    ),
  },
};

export const WithIconDestructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <TrashIcon />
        Delete
      </>
    ),
  },
};

// Loading states with different variants
export const LoadingDestructive: Story = {
  args: {
    variant: 'destructive',
    loading: true,
    children: 'Deleting...',
  },
};

export const LoadingOutline: Story = {
  args: {
    variant: 'outline',
    loading: true,
    children: 'Processing...',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><PlusIcon /></Button>
      <Button size="icon-sm"><PlusIcon /></Button>
      <Button size="icon-lg"><PlusIcon /></Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    children: 'Click me!',
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive button that you can click to test the onClick handler.',
      },
    },
  },
};

// Complex example with custom styling
export const CustomStyling: Story = {
  args: {
    className: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0',
    children: 'Custom Gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a button with custom styling using Tailwind classes.',
      },
    },
  },
};