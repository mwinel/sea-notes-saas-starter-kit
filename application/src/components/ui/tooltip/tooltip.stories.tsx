import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip, TooltipTrigger, TooltipContent } from '.';
import { Button } from '@/components/ui/button';
import { Info, HelpCircle, Settings, Trash, Edit, Plus, Heart } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Design System/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tooltip on top</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Tooltip on right</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Tooltip on bottom</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip on left</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <HelpCircle />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Get help</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for details</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          This is a longer tooltip with more detailed information that wraps to multiple lines when
          necessary.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit (⌘E)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete (⌘⌫)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new (⌘N)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const OnText: Story = {
  render: () => (
    <p className="text-sm">
      Hover over{' '}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted cursor-help">this text</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip on text</p>
        </TooltipContent>
      </Tooltip>{' '}
      for more information.
    </p>
  ),
};

export const OnBadge: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium cursor-pointer">
          Beta
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is in beta</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Button disabled>Disabled Button</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const InfoIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Storage capacity</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="size-4 rounded-full bg-muted flex items-center justify-center">
            <Info className="size-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Maximum 100GB storage per project</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 1</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 1</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 2</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 2</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Button 3</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for button 3</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me (1s delay)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears after 1 second</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to favorites</p>
      </TooltipContent>
    </Tooltip>
  ),
};
