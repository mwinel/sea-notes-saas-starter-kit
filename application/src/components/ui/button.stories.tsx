import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from 'lucide-react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const Loading: Story = { args: { loading: true } };

export const Icon: Story = {
  args: { size: 'icon', 'aria-label': 'Add' },
  render: (args) => (
    <Button {...args}>
      <Plus className="size-4" />
    </Button>
  ),
};

export const IconSm: Story = {
  args: { size: 'icon-sm', 'aria-label': 'Add' },
  render: (args) => (
    <Button {...args}>
      <Plus className="size-4" />
    </Button>
  ),
};

export const IconLg: Story = {
  args: { size: 'icon-lg', 'aria-label': 'Add' },
  render: (args) => (
    <Button {...args}>
      <Plus className="size-4" />
    </Button>
  ),
};

