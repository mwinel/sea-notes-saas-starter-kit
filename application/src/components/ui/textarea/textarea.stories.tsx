import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { Textarea } from '.';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is some pre-filled content in the textarea.',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your bio here...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'This content cannot be edited',
    disabled: true,
  },
};

export const WithRows: Story = {
  args: {
    placeholder: 'Textarea with custom rows',
    rows: 6,
  },
};

export const MinHeight: Story = {
  args: {
    placeholder: 'Textarea with minimum height',
    className: 'min-h-32',
  },
};

export const MaxHeight: Story = {
  args: {
    placeholder: 'Textarea with maximum height and scrolling',
    className: 'max-h-40',
    defaultValue:
      'This is a long text that will demonstrate scrolling behavior.\n\nWhen the content exceeds the maximum height, a scrollbar will appear.\n\nYou can keep typing and the textarea will scroll.\n\nThis is useful for limiting the visual space while allowing more content.\n\nKeep adding more lines...\n\nAnd more...\n\nUntil it scrolls!',
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized',
    className: 'resize',
  },
};

export const ResizeVertical: Story = {
  args: {
    placeholder: 'This textarea can be resized vertically only',
    className: 'resize-y',
  },
};

export const ResizeHorizontal: Story = {
  args: {
    placeholder: 'This textarea can be resized horizontally only',
    className: 'resize-x',
  },
};

export const NoResize: Story = {
  args: {
    placeholder: 'This textarea cannot be resized',
    className: 'resize-none',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'This field has an error',
    'aria-invalid': true,
    defaultValue: 'Invalid content',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>
      <Textarea id="description" placeholder="Enter a description..." />
    </div>
  ),
};

export const WithLabelAndHelper: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <label htmlFor="bio" className="text-sm font-medium">
        Bio
      </label>
      <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
      <p className="text-xs text-muted-foreground">
        Your bio will be displayed on your public profile.
      </p>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const maxLength = 200;

    return (
      <div className="space-y-2 max-w-md">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Write your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          rows={4}
        />
        <p className="text-xs text-muted-foreground text-right">
          {value.length} / {maxLength}
        </p>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <label htmlFor="feedback" className="text-sm font-medium">
        Feedback
      </label>
      <Textarea
        id="feedback"
        placeholder="Share your feedback..."
        aria-invalid={true}
        defaultValue="This is too short"
      />
      <p className="text-xs text-destructive">Feedback must be at least 50 characters.</p>
    </div>
  ),
};

export const CommentBox: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full bg-muted shrink-0" />
        <div className="flex-1 space-y-3">
          <Textarea placeholder="Add a comment..." rows={3} />
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div className="space-y-4 max-w-md border rounded-lg p-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea id="message" placeholder="Your message..." rows={5} />
      </div>
      <button className="w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
        Send Message
      </button>
    </div>
  ),
};

export const AutoGrowing: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <label htmlFor="notes" className="text-sm font-medium">
        Notes
      </label>
      <Textarea
        id="notes"
        placeholder="Type to see auto-growing behavior..."
        className="min-h-20"
      />
      <p className="text-xs text-muted-foreground">
        The textarea will grow as you type (field-sizing-content).
      </p>
    </div>
  ),
};

export const MultipleTextareas: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <label htmlFor="summary" className="text-sm font-medium">
          Summary
        </label>
        <Textarea id="summary" placeholder="Write a brief summary..." rows={2} />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea id="description" placeholder="Write a detailed description..." rows={4} />
      </div>
      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Additional Notes
        </label>
        <Textarea id="notes" placeholder="Add any additional notes..." rows={3} />
      </div>
    </div>
  ),
};

export const CodeEditor: Story = {
  render: () => (
    <div className="space-y-2 max-w-2xl">
      <label htmlFor="code" className="text-sm font-medium">
        Code Snippet
      </label>
      <Textarea
        id="code"
        placeholder="Paste your code here..."
        rows={10}
        className="font-mono text-sm"
        defaultValue={`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`}
      />
      <p className="text-xs text-muted-foreground">Monospace font for code editing.</p>
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 'This content is read-only and cannot be modified.',
    readOnly: true,
  },
};

export const WithCustomStyling: Story = {
  args: {
    placeholder: 'Custom styled textarea',
    className: 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800 rounded-xl',
  },
};
