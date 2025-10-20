import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { Checkbox } from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox />,
};

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

export const Unchecked: Story = {
  render: () => <Checkbox />,
};

export const Disabled: Story = {
  render: () => <Checkbox disabled />,
};

export const DisabledChecked: Story = {
  render: () => <Checkbox disabled checked />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-2">
      <Checkbox id="marketing" className="mt-0.5" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="marketing"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Marketing emails
        </label>
        <p className="text-sm text-muted-foreground">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="required" aria-invalid={true} />
      <label htmlFor="required" className="text-sm font-medium">
        This field is required
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value as boolean)}
          />
          <label htmlFor="controlled" className="text-sm font-medium">
            Controlled checkbox
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Current state: {checked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" defaultChecked />
        <label htmlFor="option1" className="text-sm font-medium">
          Option 1
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" />
        <label htmlFor="option2" className="text-sm font-medium">
          Option 2
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <label htmlFor="option3" className="text-sm font-medium">
          Option 3
        </label>
      </div>
    </div>
  ),
};

export const MultiSelectList: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['apple']);

    const items = [
      { id: 'apple', label: 'Apple', description: 'A red fruit' },
      { id: 'banana', label: 'Banana', description: 'A yellow fruit' },
      { id: 'orange', label: 'Orange', description: 'An orange fruit' },
      { id: 'grape', label: 'Grape', description: 'A purple fruit' },
    ];

    const toggleItem = (id: string) => {
      setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    return (
      <div className="space-y-4 max-w-md">
        <div className="text-sm font-medium">Select your favorite fruits:</div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <Checkbox
                id={item.id}
                checked={selected.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                  {item.label}
                </label>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-6 border rounded-lg p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox id="notifications" defaultChecked className="mt-0.5" />
          <div className="grid gap-1.5">
            <label htmlFor="notifications" className="text-sm font-medium cursor-pointer">
              Email Notifications
            </label>
            <p className="text-sm text-muted-foreground">Receive email about your account activity.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="newsletter" className="mt-0.5" />
          <div className="grid gap-1.5">
            <label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
              Newsletter
            </label>
            <p className="text-sm text-muted-foreground">
              Receive our weekly newsletter with the latest updates.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="updates" defaultChecked className="mt-0.5" />
          <div className="grid gap-1.5">
            <label htmlFor="updates" className="text-sm font-medium cursor-pointer">
              Product Updates
            </label>
            <p className="text-sm text-muted-foreground">Get notified about new features and releases.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <button className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">Cancel</button>
        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  ),
};

export const TaskList: Story = {
  render: () => {
    const [tasks, setTasks] = React.useState([
      { id: '1', label: 'Complete project proposal', completed: true },
      { id: '2', label: 'Review pull requests', completed: false },
      { id: '3', label: 'Update documentation', completed: false },
      { id: '4', label: 'Team meeting at 3 PM', completed: true },
      { id: '5', label: 'Deploy to production', completed: false },
    ]);

    const toggleTask = (id: string) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );
    };

    return (
      <div className="max-w-md space-y-4 border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Today's Tasks</h3>
          <span className="text-sm text-muted-foreground">
            {tasks.filter((t) => t.completed).length} of {tasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3">
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={task.id}
                className={`text-sm cursor-pointer flex-1 ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {task.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const TermsAndConditions: Story = {
  render: () => {
    const [accepted, setAccepted] = React.useState(false);

    return (
      <div className="max-w-md space-y-4 border rounded-lg p-6">
        <h3 className="text-lg font-semibold">Sign Up</h3>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
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
            placeholder="john@example.com"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={(value) => setAccepted(value as boolean)}
            className="mt-0.5"
          />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the{' '}
            <a href="#" className="underline hover:text-primary">
              terms and conditions
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-primary">
              privacy policy
            </a>
          </label>
        </div>

        <button
          disabled={!accepted}
          className="w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </div>
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    const [selected, setSelected] = React.useState<string[]>([]);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && selected.length < items.length;

    const toggleAll = () => {
      setSelected(allSelected ? [] : items);
    };

    const toggleItem = (item: string) => {
      setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    };

    return (
      <div className="max-w-md space-y-4 border rounded-lg p-6">
        <div className="flex items-center space-x-2 pb-2 border-b">
          <Checkbox
            id="select-all"
            checked={allSelected || (someSelected ? 'indeterminate' : false)}
            onCheckedChange={toggleAll}
          />
          <label htmlFor="select-all" className="text-sm font-semibold cursor-pointer">
            Select All
          </label>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 pl-6">
              <Checkbox
                id={`item-${index}`}
                checked={selected.includes(item)}
                onCheckedChange={() => toggleItem(item)}
              />
              <label htmlFor={`item-${index}`} className="text-sm cursor-pointer">
                {item}
              </label>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground pt-2 border-t">
          {selected.length} of {items.length} selected
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="small" className="size-3" />
        <label htmlFor="small" className="text-xs">
          Small
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="default" />
        <label htmlFor="default" className="text-sm">
          Default
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="large" className="size-5" />
        <label htmlFor="large" className="text-base">
          Large
        </label>
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="blue"
          defaultChecked
          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <label htmlFor="blue" className="text-sm">
          Blue
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="green"
          defaultChecked
          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
        <label htmlFor="green" className="text-sm">
          Green
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="purple"
          defaultChecked
          className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
        />
        <label htmlFor="purple" className="text-sm">
          Purple
        </label>
      </div>
    </div>
  ),
};

