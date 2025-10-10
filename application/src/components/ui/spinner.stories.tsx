import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/dom';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Design System/Spinner',
  component: Spinner,
  args: { 'aria-label': 'Loading' },
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Small: Story = { args: { className: 'size-4' } };
Small.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const el = await canvas.findByRole('status', { name: /loading/i });
  if (!el) throw new Error('Spinner did not render');
};

export const Medium: Story = { args: { className: 'size-6' } };
export const Large: Story = { args: { className: 'size-8' } };

export const CustomColor: Story = { args: { className: 'size-6 text-primary' } };
