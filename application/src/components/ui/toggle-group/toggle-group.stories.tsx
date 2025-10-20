import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from '.';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Design System/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Small: Story = {
  render: () => (
    <ToggleGroup type="single" size="sm">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Large: Story = {
  render: () => (
    <ToggleGroup type="single" size="lg">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold">
        <Bold />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <AlignRight />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify">
        <AlignJustify />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('bold');

    return (
      <div className="space-y-4">
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(val: string) => val && setValue(val)}
        >
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const MultipleControlled: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(['bold']);

    return (
      <div className="space-y-4">
        <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-muted-foreground">
          Selected: {values.length > 0 ? values.join(', ') : 'None'}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" disabled>
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const TextOnly: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="day">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ViewSelector: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid" variant="outline">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Small:</span>
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Default:</span>
        <ToggleGroup type="single">
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Large:</span>
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Default:</span>
        <ToggleGroup type="single">
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Outline:</span>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
