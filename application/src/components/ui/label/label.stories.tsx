import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/dom';
import { Label } from '.';

const meta: Meta<typeof Label> = {
  title: 'Design System/Label',
  component: Label,
  args: { children: 'Email', htmlFor: 'email' },
  argTypes: {
    htmlFor: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const el = await canvas.findByText('Email');
  if (!el) throw new Error('Label not rendered');
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label {...args} />
      <input id="email" aria-label="Email" className="border rounded px-2 py-1" />
    </div>
  ),
};
WithInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const label = await canvas.findByText('Email');
  const input = await canvas.findByLabelText('Email');
  if (!label || !input) throw new Error('Associated input not found');
};

export const DisabledStyle: Story = {
  render: () => (
    <div className="grid gap-2 group" data-disabled="true">
      <Label>Email</Label>
      <input aria-label="Email" className="border rounded px-2 py-1" disabled />
    </div>
  ),
};
