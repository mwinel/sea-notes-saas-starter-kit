import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  args: { placeholder: 'Email' },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/email/i)) as HTMLInputElement;
  await userEvent.type(input, 'hello@demo.com');
  if (input.value !== 'hello@demo.com') {
    throw new Error('Input did not receive typed value');
  }
};

export const Password: Story = { args: { type: 'password', placeholder: 'Password' } };
Password.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/password/i)) as HTMLInputElement;
  await userEvent.type(input, 'secret123');
  if (input.value !== 'secret123') {
    throw new Error('Password input did not receive typed value');
  }
};

export const Disabled: Story = { args: { disabled: true } };
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/email/i)) as HTMLInputElement;
  await userEvent.type(input, 'should-not-type');
  if (input.value !== '') {
    throw new Error('Disabled input should not accept typing');
  }
};

export const Invalid: Story = { args: { 'aria-invalid': true } };

export const WithDefaultValue: Story = { args: { defaultValue: 'prefilled@demo.com' } };
