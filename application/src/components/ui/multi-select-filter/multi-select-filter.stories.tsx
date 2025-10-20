import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { MultiSelectFilter, type FilterOption } from '.';
import { Filter, Tag, Star, Flag, Inbox } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof MultiSelectFilter> = {
  title: 'Design System/MultiSelectFilter',
  component: MultiSelectFilter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiSelectFilter>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
          selectedValues={selected}
          onSelectedChange={setSelected}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <MultiSelectFilter
        options={['Filter 1', 'Filter 2', 'Filter 3']}
        selectedValues={selected}
        onSelectedChange={setSelected}
        icon={<Filter className="size-4" />}
        placeholder="Filters"
      />
    );
  },
};

export const StatusFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['active']);

    const statusOptions: FilterOption[] = [
      {
        value: 'active',
        label: 'Active',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      },
      {
        value: 'pending',
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      },
      {
        value: 'completed',
        label: 'Completed',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      },
      {
        value: 'cancelled',
        label: 'Cancelled',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      },
    ];

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={statusOptions}
          selectedValues={selected}
          onSelectedChange={setSelected}
          placeholder="Status"
          buttonLabel="Status"
          icon={<Flag className="size-4" />}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
      </div>
    );
  },
};

export const CategoryFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const categories = [
      'Electronics',
      'Clothing',
      'Books',
      'Home & Garden',
      'Sports',
      'Toys',
      'Food',
      'Health',
    ];

    return (
      <MultiSelectFilter
        options={categories}
        selectedValues={selected}
        onSelectedChange={setSelected}
        placeholder="Categories"
        buttonLabel="Category"
        icon={<Tag className="size-4" />}
        searchPlaceholder="Search categories..."
      />
    );
  },
};

export const PriorityFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['high']);

    const priorityOptions: FilterOption[] = [
      {
        value: 'urgent',
        label: 'Urgent',
        className: 'bg-red-500 text-white border-transparent',
      },
      {
        value: 'high',
        label: 'High',
        className: 'bg-orange-500 text-white border-transparent',
      },
      {
        value: 'medium',
        label: 'Medium',
        className: 'bg-yellow-500 text-white border-transparent',
      },
      {
        value: 'low',
        label: 'Low',
        className: 'bg-green-500 text-white border-transparent',
      },
    ];

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={priorityOptions}
          selectedValues={selected}
          onSelectedChange={setSelected}
          placeholder="Priority"
          buttonLabel="Priority"
          icon={<Star className="size-4" />}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium">Filtered items:</p>
          {selected.map((priority) => (
            <div key={priority} className="text-sm text-muted-foreground">
              • Task with {priority} priority
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const WithoutSearch: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <MultiSelectFilter
        options={['Small', 'Medium', 'Large', 'Extra Large']}
        selectedValues={selected}
        onSelectedChange={setSelected}
        placeholder="Size"
        showSearch={false}
      />
    );
  },
};

export const CustomRender: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const options: FilterOption[] = [
      {
        value: 'inbox',
        label: 'Inbox',
        render: (option) => (
          <div className="flex items-center gap-2">
            <Inbox className="size-4" />
            <span>{option.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">(12)</span>
          </div>
        ),
      },
      {
        value: 'starred',
        label: 'Starred',
        render: (option) => (
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <span>{option.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">(5)</span>
          </div>
        ),
      },
      {
        value: 'important',
        label: 'Important',
        render: (option) => (
          <div className="flex items-center gap-2">
            <Flag className="size-4 text-red-500" />
            <span>{option.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">(8)</span>
          </div>
        ),
      },
    ];

    return (
      <MultiSelectFilter
        options={options}
        selectedValues={selected}
        onSelectedChange={setSelected}
        placeholder="Labels"
        buttonLabel="Labels"
        showSearch={false}
      />
    );
  },
};

export const TeamMemberFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const teamMembers = [
      'John Doe',
      'Jane Smith',
      'Bob Johnson',
      'Alice Williams',
      'Charlie Brown',
      'Diana Prince',
    ];

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={teamMembers}
          selectedValues={selected}
          onSelectedChange={setSelected}
          placeholder="Assigned To"
          buttonLabel="Assignee"
          searchPlaceholder="Search team members..."
        />
        <p className="text-sm text-muted-foreground">
          Showing tasks assigned to: {selected.length > 0 ? selected.join(', ') : 'Everyone'}
        </p>
      </div>
    );
  },
};

export const TagFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['bug', 'urgent']);

    const tags: FilterOption[] = [
      { value: 'bug', label: 'Bug', className: 'bg-red-100 text-red-800' },
      { value: 'feature', label: 'Feature', className: 'bg-blue-100 text-blue-800' },
      { value: 'enhancement', label: 'Enhancement', className: 'bg-purple-100 text-purple-800' },
      { value: 'urgent', label: 'Urgent', className: 'bg-orange-100 text-orange-800' },
      { value: 'documentation', label: 'Documentation', className: 'bg-green-100 text-green-800' },
      { value: 'design', label: 'Design', className: 'bg-pink-100 text-pink-800' },
    ];

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={tags}
          selectedValues={selected}
          onSelectedChange={setSelected}
          placeholder="Tags"
          buttonLabel="Filter by Tags"
          icon={<Tag className="size-4" />}
        />
        <div className="flex gap-2 flex-wrap">
          {selected.map((tag) => {
            const option = tags.find((t) => t.value === tag);
            return (
              <Badge key={tag} variant="outline" className={option?.className}>
                {option?.label}
              </Badge>
            );
          })}
        </div>
      </div>
    );
  },
};

export const LocationFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const locations = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
    ];

    return (
      <MultiSelectFilter
        options={locations}
        selectedValues={selected}
        onSelectedChange={setSelected}
        placeholder="Location"
        buttonLabel="Location"
        searchPlaceholder="Search cities..."
        emptyMessage="No cities found."
      />
    );
  },
};

export const MultipleFilters: Story = {
  render: () => {
    const [status, setStatus] = React.useState<string[]>([]);
    const [priority, setPriority] = React.useState<string[]>([]);
    const [assignee, setAssignee] = React.useState<string[]>([]);

    const statusOptions: FilterOption[] = [
      { value: 'todo', label: 'To Do', className: 'bg-gray-100 text-gray-800' },
      { value: 'progress', label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
      { value: 'review', label: 'In Review', className: 'bg-purple-100 text-purple-800' },
      { value: 'done', label: 'Done', className: 'bg-green-100 text-green-800' },
    ];

    const priorityOptions: FilterOption[] = [
      { value: 'high', label: 'High', className: 'bg-red-500 text-white border-transparent' },
      { value: 'medium', label: 'Medium', className: 'bg-yellow-500 text-white border-transparent' },
      { value: 'low', label: 'Low', className: 'bg-green-500 text-white border-transparent' },
    ];

    const assignees = ['John Doe', 'Jane Smith', 'Bob Johnson'];

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <MultiSelectFilter
            options={statusOptions}
            selectedValues={status}
            onSelectedChange={setStatus}
            placeholder="Status"
            buttonLabel="Status"
          />
          <MultiSelectFilter
            options={priorityOptions}
            selectedValues={priority}
            onSelectedChange={setPriority}
            placeholder="Priority"
            buttonLabel="Priority"
          />
          <MultiSelectFilter
            options={assignees}
            selectedValues={assignee}
            onSelectedChange={setAssignee}
            placeholder="Assignee"
            buttonLabel="Assignee"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Active Filters:</p>
          {status.length > 0 && (
            <p className="text-sm text-muted-foreground">Status: {status.join(', ')}</p>
          )}
          {priority.length > 0 && (
            <p className="text-sm text-muted-foreground">Priority: {priority.join(', ')}</p>
          )}
          {assignee.length > 0 && (
            <p className="text-sm text-muted-foreground">Assignee: {assignee.join(', ')}</p>
          )}
          {status.length === 0 && priority.length === 0 && assignee.length === 0 && (
            <p className="text-sm text-muted-foreground">No filters applied</p>
          )}
        </div>
      </div>
    );
  },
};

export const DepartmentFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const departments = [
      'Engineering',
      'Design',
      'Marketing',
      'Sales',
      'Support',
      'HR',
      'Finance',
      'Operations',
    ];

    return (
      <MultiSelectFilter
        options={departments}
        selectedValues={selected}
        onSelectedChange={setSelected}
        placeholder="Department"
        buttonLabel="Department"
        clearLabel="Clear all"
      />
    );
  },
};

export const ProductTypeFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['physical']);

    const productTypes: FilterOption[] = [
      { value: 'physical', label: 'Physical Products' },
      { value: 'digital', label: 'Digital Products' },
      { value: 'service', label: 'Services' },
      { value: 'subscription', label: 'Subscriptions' },
    ];

    return (
      <div className="space-y-4">
        <MultiSelectFilter
          options={productTypes}
          selectedValues={selected}
          onSelectedChange={setSelected}
          placeholder="Product Type"
          buttonLabel="Product Type"
          showSearch={false}
        />
        <p className="text-sm text-muted-foreground">
          Showing: {selected.length > 0 ? selected.join(', ') : 'All products'}
        </p>
      </div>
    );
  },
};

