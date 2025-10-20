import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { Toggle } from '.';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  ListTodo,
  Link,
  Code,
  Eye,
  EyeOff,
  Star,
  Heart,
  Bell,
  BellOff,
} from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Design System/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle>
      <Bold />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle>
      <Bold />
      Bold
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline">
      <Italic />
    </Toggle>
  ),
};

export const OutlineWithText: Story = {
  render: () => (
    <Toggle variant="outline">
      <Italic />
      Italic
    </Toggle>
  ),
};

export const Small: Story = {
  render: () => (
    <Toggle size="sm">
      <Bold />
    </Toggle>
  ),
};

export const Large: Story = {
  render: () => (
    <Toggle size="lg">
      <Bold />
    </Toggle>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled>
      <Bold />
    </Toggle>
  ),
};

export const DisabledPressed: Story = {
  render: () => (
    <Toggle disabled pressed>
      <Bold />
      Bold
    </Toggle>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          <Bold />
          Bold
        </Toggle>
        <p className="text-sm text-muted-foreground">
          State: {pressed ? 'Pressed' : 'Not pressed'}
        </p>
      </div>
    );
  },
};

export const TextFormatting: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle>
        <Bold />
      </Toggle>
      <Toggle>
        <Italic />
      </Toggle>
      <Toggle>
        <Underline />
      </Toggle>
    </div>
  ),
};

export const TextFormattingWithLabels: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle>
        <Bold />
        Bold
      </Toggle>
      <Toggle>
        <Italic />
        Italic
      </Toggle>
      <Toggle>
        <Underline />
        Underline
      </Toggle>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => {
    const [alignment, setAlignment] = React.useState('left');

    return (
      <div className="flex gap-1">
        <Toggle pressed={alignment === 'left'} onPressedChange={() => setAlignment('left')}>
          <AlignLeft />
        </Toggle>
        <Toggle pressed={alignment === 'center'} onPressedChange={() => setAlignment('center')}>
          <AlignCenter />
        </Toggle>
        <Toggle pressed={alignment === 'right'} onPressedChange={() => setAlignment('right')}>
          <AlignRight />
        </Toggle>
      </div>
    );
  },
};

export const ListStyles: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle>
        <ListOrdered />
      </Toggle>
      <Toggle>
        <ListTodo />
      </Toggle>
    </div>
  ),
};

export const EditorToolbar: Story = {
  render: () => (
    <div className="border rounded-lg p-2 space-y-2 max-w-fit">
      <div className="flex gap-1">
        <Toggle variant="outline" size="sm">
          <Bold />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <Italic />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <Underline />
        </Toggle>
        <div className="w-px bg-border mx-1" />
        <Toggle variant="outline" size="sm">
          <Link />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <Code />
        </Toggle>
      </div>
      <div className="flex gap-1">
        <Toggle variant="outline" size="sm">
          <AlignLeft />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <AlignCenter />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <AlignRight />
        </Toggle>
        <div className="w-px bg-border mx-1" />
        <Toggle variant="outline" size="sm">
          <ListOrdered />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <ListTodo />
        </Toggle>
      </div>
    </div>
  ),
};

export const VisibilityToggle: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    return (
      <div className="flex flex-col gap-4">
        <Toggle pressed={visible} onPressedChange={setVisible}>
          {visible ? <Eye /> : <EyeOff />}
          {visible ? 'Visible' : 'Hidden'}
        </Toggle>
        <p className="text-sm text-muted-foreground">Content is {visible ? 'visible' : 'hidden'}</p>
      </div>
    );
  },
};

export const FavoriteToggle: Story = {
  render: () => {
    const [favorite, setFavorite] = React.useState(false);

    return (
      <Toggle pressed={favorite} onPressedChange={setFavorite}>
        <Star className={favorite ? 'fill-current' : ''} />
      </Toggle>
    );
  },
};

export const LikeToggle: Story = {
  render: () => {
    const [liked, setLiked] = React.useState(false);

    return (
      <Toggle pressed={liked} onPressedChange={setLiked}>
        <Heart className={liked ? 'fill-current text-red-500' : ''} />
      </Toggle>
    );
  },
};

export const NotificationToggle: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true);

    return (
      <div className="flex flex-col gap-4">
        <Toggle pressed={notifications} onPressedChange={setNotifications} variant="outline">
          {notifications ? <Bell /> : <BellOff />}
          {notifications ? 'Notifications On' : 'Notifications Off'}
        </Toggle>
        <p className="text-sm text-muted-foreground">
          Notifications are {notifications ? 'enabled' : 'disabled'}
        </p>
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-2 items-center">
        <Toggle size="sm">
          <Bold />
        </Toggle>
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Toggle>
          <Bold />
        </Toggle>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Toggle size="lg">
          <Bold />
        </Toggle>
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

export const VariantComparison: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <Toggle>
          <Bold />
        </Toggle>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Toggle variant="outline">
          <Bold />
        </Toggle>
        <span className="text-xs text-muted-foreground">Outline</span>
      </div>
    </div>
  ),
};

export const MultipleToggles: Story = {
  render: () => {
    const [options, setOptions] = React.useState({
      bold: false,
      italic: false,
      underline: false,
      code: false,
    });

    return (
      <div className="space-y-4">
        <div className="flex gap-1">
          <Toggle
            pressed={options.bold}
            onPressedChange={(pressed: boolean) => setOptions({ ...options, bold: pressed })}
          >
            <Bold />
            Bold
          </Toggle>
          <Toggle
            pressed={options.italic}
            onPressedChange={(pressed: boolean) => setOptions({ ...options, italic: pressed })}
          >
            <Italic />
            Italic
          </Toggle>
          <Toggle
            pressed={options.underline}
            onPressedChange={(pressed: boolean) => setOptions({ ...options, underline: pressed })}
          >
            <Underline />
            Underline
          </Toggle>
          <Toggle
            pressed={options.code}
            onPressedChange={(pressed: boolean) => setOptions({ ...options, code: pressed })}
          >
            <Code />
            Code
          </Toggle>
        </div>
        <div className="text-sm text-muted-foreground">
          Active:{' '}
          {Object.entries(options)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </div>
      </div>
    );
  },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle size="sm">
        <Bold />
      </Toggle>
      <Toggle>
        <Bold />
      </Toggle>
      <Toggle size="lg">
        <Bold />
      </Toggle>
    </div>
  ),
};

export const WithTextVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toggle size="sm">
        <Bold />
        Small
      </Toggle>
      <Toggle>
        <Bold />
        Default
      </Toggle>
      <Toggle size="lg">
        <Bold />
        Large
      </Toggle>
    </div>
  ),
};
