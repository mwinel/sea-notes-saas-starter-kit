import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Design System/PasswordInput',
  component: PasswordInput,
  args: { placeholder: 'Password' },
  argTypes: {
    onToggleVisibility: { action: 'toggle' },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/password/i)) as HTMLInputElement;
  // Type should set a value
  await userEvent.type(input, 'secret123');
  if (input.value !== 'secret123') {
    throw new Error('Password input did not receive typed value');
  }
  // Initially type should be password
  if (String(input.type) !== 'password') {
    throw new Error('Password input should be masked initially');
  }
};

export const ToggleVisibility: Story = {};
ToggleVisibility.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/password/i)) as HTMLInputElement;
  const toggleButton = (await canvas.findByRole('button')) as HTMLButtonElement;

  await userEvent.type(input, 'secret123');
  await userEvent.click(toggleButton);
  if (String(input.type) !== 'text') {
    throw new Error('Input should be visible after toggling');
  }
  await userEvent.click(toggleButton);
  if (String(input.type) !== 'password') {
    throw new Error('Input should be masked after second toggle');
  }
};

export const Disabled: Story = { args: { disabled: true } };
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/password/i)) as HTMLInputElement;
  await userEvent.type(input, 'should-not-type');
  if (input.value !== '') {
    throw new Error('Disabled password input should not accept typing');
  }
};

export const ShowPasswordDefault: Story = { args: { showPassword: true } };
ShowPasswordDefault.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = (await canvas.findByPlaceholderText(/password/i)) as HTMLInputElement;
  if (String(input.type) !== 'text') {
    throw new Error('With showPassword=true, the type should be text');
  }
};
