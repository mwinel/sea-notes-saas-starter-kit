import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '.';
import { Label } from '@/components/ui/label';
import { CreditCard, Truck, Store, Zap, Sun, Moon, Monitor } from 'lucide-react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Design System/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="r1" className="mt-0.5" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r1" className="cursor-pointer">
            Default
          </Label>
          <p className="text-sm text-muted-foreground">This is the default option.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="r2" className="mt-0.5" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r2" className="cursor-pointer">
            Comfortable
          </Label>
          <p className="text-sm text-muted-foreground">A comfortable layout with more spacing.</p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="r3" className="mt-0.5" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r3" className="cursor-pointer">
            Compact
          </Label>
          <p className="text-sm text-muted-foreground">A compact layout to fit more content.</p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('option1');

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="c1" />
            <Label htmlFor="c1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="c2" />
            <Label htmlFor="c2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="c3" />
            <Label htmlFor="c3">Option 3</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="d1" />
        <Label htmlFor="d1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="d2" disabled />
        <Label htmlFor="d2" className="opacity-50">
          Option 2 (Disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="d3" />
        <Label htmlFor="d3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <RadioGroup defaultValue="card">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
          <CreditCard className="size-4" />
          Credit Card
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
          <Zap className="size-4" />
          PayPal
        </Label>
      </div>
    </RadioGroup>
  ),
};

export const ShippingOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="standard" className="max-w-md">
      <div className="flex items-start space-x-2 p-4 border rounded-lg">
        <RadioGroupItem value="standard" id="standard" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="standard" className="cursor-pointer font-medium">
            <div className="flex items-center gap-2">
              <Truck className="size-4" />
              Standard Shipping
            </div>
          </Label>
          <p className="text-sm text-muted-foreground">5-7 business days</p>
          <p className="text-sm font-medium">$5.00</p>
        </div>
      </div>
      <div className="flex items-start space-x-2 p-4 border rounded-lg">
        <RadioGroupItem value="express" id="express" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="express" className="cursor-pointer font-medium">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              Express Shipping
            </div>
          </Label>
          <p className="text-sm text-muted-foreground">2-3 business days</p>
          <p className="text-sm font-medium">$15.00</p>
        </div>
      </div>
      <div className="flex items-start space-x-2 p-4 border rounded-lg">
        <RadioGroupItem value="pickup" id="pickup" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="pickup" className="cursor-pointer font-medium">
            <div className="flex items-center gap-2">
              <Store className="size-4" />
              Store Pickup
            </div>
          </Label>
          <p className="text-sm text-muted-foreground">Available today</p>
          <p className="text-sm font-medium">Free</p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const PricingTiers: Story = {
  render: () => (
    <RadioGroup defaultValue="pro" className="max-w-md">
      <div className="flex items-start space-x-2 p-4 border rounded-lg">
        <RadioGroupItem value="basic" id="basic" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="basic" className="cursor-pointer">
            <div className="font-medium">Basic</div>
          </Label>
          <p className="text-sm text-muted-foreground">Perfect for getting started</p>
          <div className="mt-2">
            <span className="text-2xl font-bold">$9</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-2 p-4 border rounded-lg bg-accent/50">
        <RadioGroupItem value="pro" id="pro" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="pro" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="font-medium">Pro</span>
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                Popular
              </span>
            </div>
          </Label>
          <p className="text-sm text-muted-foreground">For growing businesses</p>
          <div className="mt-2">
            <span className="text-2xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-2 p-4 border rounded-lg">
        <RadioGroupItem value="enterprise" id="enterprise" className="mt-0.5" />
        <div className="flex-1 grid gap-1.5 leading-none">
          <Label htmlFor="enterprise" className="cursor-pointer">
            <div className="font-medium">Enterprise</div>
          </Label>
          <p className="text-sm text-muted-foreground">Advanced features for large teams</p>
          <div className="mt-2">
            <span className="text-2xl font-bold">$99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const ThemeSelector: Story = {
  render: () => (
    <RadioGroup defaultValue="system">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="light" id="light" />
        <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
          <Sun className="size-4" />
          Light
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="dark" />
        <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
          <Moon className="size-4" />
          Dark
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="system" id="system" />
        <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
          <Monitor className="size-4" />
          System
        </Label>
      </div>
    </RadioGroup>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-6 border rounded-lg p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Survey Form</h3>
      </div>

      <div className="space-y-3">
        <Label>How satisfied are you with our service?</Label>
        <RadioGroup defaultValue="satisfied">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very-satisfied" id="very-satisfied" />
            <Label htmlFor="very-satisfied" className="cursor-pointer">
              Very Satisfied
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="satisfied" id="satisfied" />
            <Label htmlFor="satisfied" className="cursor-pointer">
              Satisfied
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="neutral" id="neutral" />
            <Label htmlFor="neutral" className="cursor-pointer">
              Neutral
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dissatisfied" id="dissatisfied" />
            <Label htmlFor="dissatisfied" className="cursor-pointer">
              Dissatisfied
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
            <Label htmlFor="very-dissatisfied" className="cursor-pointer">
              Very Dissatisfied
            </Label>
          </div>
        </RadioGroup>
      </div>

      <button className="w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
        Submit
      </button>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="h1" />
        <Label htmlFor="h1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="h2" />
        <Label htmlFor="h2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="h3" />
        <Label htmlFor="h3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const SizeOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" className="max-w-xs">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label htmlFor="small" className="cursor-pointer">
          Small
        </Label>
        <RadioGroupItem value="small" id="small" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label htmlFor="medium" className="cursor-pointer">
          Medium
        </Label>
        <RadioGroupItem value="medium" id="medium" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label htmlFor="large" className="cursor-pointer">
          Large
        </Label>
        <RadioGroupItem value="large" id="large" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label htmlFor="xl" className="cursor-pointer">
          Extra Large
        </Label>
        <RadioGroupItem value="xl" id="xl" />
      </div>
    </RadioGroup>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Label>Select an option (required)</Label>
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="v1" aria-invalid={true} />
          <Label htmlFor="v1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="v2" aria-invalid={true} />
          <Label htmlFor="v2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="v3" aria-invalid={true} />
          <Label htmlFor="v3">Option 3</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-destructive">Please select an option</p>
    </div>
  ),
};

export const PaymentMethods: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Label>Payment Method</Label>
      <RadioGroup defaultValue="credit">
        <div className="flex items-start space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
          <RadioGroupItem value="credit" id="credit" className="mt-0.5" />
          <div className="flex-1 grid gap-1.5 leading-none">
            <Label htmlFor="credit" className="cursor-pointer font-medium">
              Credit Card
            </Label>
            <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or Amex</p>
          </div>
        </div>
        <div className="flex items-start space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
          <RadioGroupItem value="debit" id="debit" className="mt-0.5" />
          <div className="flex-1 grid gap-1.5 leading-none">
            <Label htmlFor="debit" className="cursor-pointer font-medium">
              Debit Card
            </Label>
            <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
          </div>
        </div>
        <div className="flex items-start space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
          <RadioGroupItem value="paypal" id="paypal-payment" className="mt-0.5" />
          <div className="flex-1 grid gap-1.5 leading-none">
            <Label htmlFor="paypal-payment" className="cursor-pointer font-medium">
              PayPal
            </Label>
            <p className="text-sm text-muted-foreground">
              Use your PayPal balance or linked accounts
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const NotificationPreferences: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h3 className="font-medium mb-2">Notification Frequency</h3>
        <p className="text-sm text-muted-foreground mb-4">
          How often would you like to receive notifications?
        </p>
      </div>
      <RadioGroup defaultValue="daily">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="realtime" id="realtime" />
          <Label htmlFor="realtime" className="cursor-pointer">
            Real-time (as they happen)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hourly" id="hourly" />
          <Label htmlFor="hourly" className="cursor-pointer">
            Hourly digest
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="daily" id="daily" />
          <Label htmlFor="daily" className="cursor-pointer">
            Daily digest
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="weekly" id="weekly" />
          <Label htmlFor="weekly" className="cursor-pointer">
            Weekly digest
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="never" id="never" />
          <Label htmlFor="never" className="cursor-pointer">
            Never
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};
