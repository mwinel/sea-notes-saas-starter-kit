import type { Meta, StoryObj } from '@storybook/nextjs';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Design System/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = { args: { orientation: 'horizontal' } };

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className="h-16">
      <Separator {...args} />
    </div>
  ),
};

export const WithSpacing: Story = { args: { className: 'my-6' } };
