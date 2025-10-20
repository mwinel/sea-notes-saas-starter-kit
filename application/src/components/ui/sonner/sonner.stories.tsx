import type { Meta, StoryObj } from '@storybook/nextjs';
import { toast } from 'sonner';
import { Toaster } from '.';

const meta: Meta<typeof Toaster> = {
  title: 'Design System/Sonner',
  component: Toaster,
  args: { position: 'top-right', richColors: true },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    theme: { control: 'select', options: ['light', 'dark', 'system'] },
    closeButton: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => <Toaster {...args} />,
};
Default.play = async () => {
  toast('Hello from Sonner');
};

export const Success: Story = {
  render: (args) => <Toaster {...args} />,
};
Success.play = async () => {
  toast.success('Saved successfully');
};

export const Info: Story = {
  render: (args) => <Toaster {...args} />,
};
Info.play = async () => {
  toast.info('Heads up');
};

export const Warning: Story = {
  render: (args) => <Toaster {...args} />,
};
Warning.play = async () => {
  toast.warning('Warning');
};

export const Error: Story = {
  render: (args) => <Toaster {...args} />,
};
Error.play = async () => {
  toast.error('Something went wrong');
};
