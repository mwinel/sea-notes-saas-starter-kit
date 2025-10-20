import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@testing-library/dom';
import {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldSeparator,
  FieldTitle,
} from '.';

const meta: Meta<typeof Field> = {
  title: 'Design System/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Vertical: Story = {
  render: () => (
    <FieldSet>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldContent>
          <input id="email" aria-label="Email" className="border rounded px-2 py-1" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByText('Email');
  await canvas.findByLabelText('Email');
};

export const Horizontal: Story = {
  render: () => (
    <FieldSet>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <FieldContent>
          <input id="name" aria-label="Name" className="border rounded px-2 py-1" />
          <FieldDescription>First and last name.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};

export const WithError: Story = {
  render: () => (
    <FieldSet>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <FieldContent>
          <input id="password" aria-label="Password" className="border rounded px-2 py-1" />
          <FieldError errors={[{ message: 'Password is too short' }]} />
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};

export const GroupWithSeparator: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Contact</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email2">Email</FieldLabel>
          <FieldContent>
            <input id="email2" aria-label="Email" className="border rounded px-2 py-1" />
          </FieldContent>
        </Field>
        <FieldSeparator>OR</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <FieldContent>
            <input id="phone" aria-label="Phone" className="border rounded px-2 py-1" />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
