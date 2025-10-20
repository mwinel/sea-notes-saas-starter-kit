import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '.';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Settings, HelpCircle, User, Mail, Phone, MapPin, Info, Palette, Clock } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: 'Design System/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">This is a simple popover with some content.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Profile</h4>
            <p className="text-sm text-muted-foreground">Update your profile information.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <Button className="w-full">Save Changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Controlled Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Controlled State</h4>
              <p className="text-sm text-muted-foreground">This popover's state is controlled externally.</p>
              <Button onClick={() => setOpen(false)} className="w-full" size="sm">
                Close
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">Popover is {open ? 'open' : 'closed'}</p>
      </div>
    );
  },
};

export const AlignmentOptions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="text-sm">Aligned to the start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="text-sm">Aligned to the center</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-sm">Aligned to the end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const SideOptions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">Appears on top</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">Appears on right</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">Appears on bottom</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">Appears on left</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Info className="size-4 text-blue-500" />
            <h4 className="font-medium leading-none">Help</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Click here to get help with this feature. Our support team is available 24/7.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ContactInfo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <User />
          Contact Info
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium leading-none mb-3">Contact Information</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SettingsPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">Manage your preferences</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="cursor-pointer">
                Notifications
              </Label>
              <input type="checkbox" id="notifications" defaultChecked className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save" className="cursor-pointer">
                Auto-save
              </Label>
              <input type="checkbox" id="auto-save" className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="cursor-pointer">
                Dark Mode
              </Label>
              <input type="checkbox" id="dark-mode" defaultChecked className="cursor-pointer" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CalendarPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Calendar />
          Select Date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4 space-y-2">
          <h4 className="font-medium">Select a date</h4>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            <div className="text-muted-foreground">S</div>
            <div className="text-muted-foreground">M</div>
            <div className="text-muted-foreground">T</div>
            <div className="text-muted-foreground">W</div>
            <div className="text-muted-foreground">T</div>
            <div className="text-muted-foreground">F</div>
            <div className="text-muted-foreground">S</div>
            {Array.from({ length: 35 }, (_, i) => (
              <button
                key={i}
                className="size-8 rounded-md hover:bg-accent text-sm"
                disabled={i < 5 || i > 28}
              >
                {i < 5 || i > 28 ? '' : i - 4}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ColorPicker: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3b82f6');

    const colors = [
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#84cc16',
      '#10b981',
      '#14b8a6',
      '#06b6d4',
      '#3b82f6',
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#d946ef',
      '#ec4899',
      '#f43f5e',
    ];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Palette />
            Pick Color
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <h4 className="font-medium leading-none">Pick a color</h4>
            <div className="grid grid-cols-7 gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  className="size-8 rounded-md border-2"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? 'black' : 'transparent',
                  }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded border" style={{ backgroundColor: color }} />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const QuickActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Quick Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="space-y-1">
          <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent">
            New Document
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent">
            New Folder
          </button>
          <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent">
            Upload File
          </button>
          <div className="my-1 h-px bg-border" />
          <button className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent text-destructive">
            Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const InfoTooltip: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Hover for more info</span>
      <Popover>
        <PopoverTrigger asChild>
          <button className="size-4 rounded-full bg-muted flex items-center justify-center">
            <Info className="size-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72" side="top">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Additional Information</h4>
            <p className="text-sm text-muted-foreground">
              This feature allows you to customize your experience. Click to learn more about the available
              options and how to use them effectively.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const FeedbackForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Send Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Send Feedback</h4>
            <p className="text-sm text-muted-foreground">Help us improve by sharing your thoughts.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea id="feedback" placeholder="Tell us what you think..." rows={4} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const TimeSelector: Story = {
  render: () => {
    const [time, setTime] = React.useState('12:00');

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Clock />
            {time}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <h4 className="font-medium leading-none">Select Time</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="hours" className="text-xs">
                  Hours
                </Label>
                <select
                  id="hours"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  value={time.split(':')[0]}
                  onChange={(e) => setTime(`${e.target.value}:${time.split(':')[1]}`)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="minutes" className="text-xs">
                  Minutes
                </Label>
                <select
                  id="minutes"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  value={time.split(':')[1]}
                  onChange={(e) => setTime(`${time.split(':')[0]}:${e.target.value}`)}
                >
                  {['00', '15', '30', '45'].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const NarrowContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Narrow Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <p className="text-sm">This is a narrow popover with limited width.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WideContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Wide Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-2">
          <h4 className="font-medium">Wide Content Area</h4>
          <p className="text-sm text-muted-foreground">
            This popover has a wider content area that can accommodate more text and complex layouts without
            feeling cramped.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

