import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '.';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, ArrowUpDown, Edit, Trash, Eye } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Design System/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV003</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell className="text-right">$100.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product B</TableCell>
          <TableCell className="text-right">$200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product C</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#001</TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">Completed</Badge>
          </TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#002</TableCell>
          <TableCell>
            <Badge className="bg-yellow-500 text-white border-transparent">Pending</Badge>
          </TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#003</TableCell>
          <TableCell>
            <Badge variant="destructive">Cancelled</Badge>
          </TableCell>
          <TableCell>Bob Johnson</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const items = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    const toggleAll = () => {
      setSelected(selected.length === items.length ? [] : items.map((item) => item.id));
    };

    const toggleItem = (id: string) => {
      setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox checked={selected.length === items.length} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(item.id)}
                  onCheckedChange={() => toggleItem(item.id)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Sortable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
              Name
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
              Email
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
              Role
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ProductTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell>150</TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">In Stock</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">USB Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell>5</TableCell>
          <TableCell>
            <Badge className="bg-yellow-500 text-white border-transparent">Low Stock</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Monitor Stand</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell>$39.99</TableCell>
          <TableCell>0</TableCell>
          <TableCell>
            <Badge variant="destructive">Out of Stock</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const UserManagement: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>
            <Badge variant="secondary">Admin</Badge>
          </TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">Active</Badge>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>
            <Badge variant="outline">User</Badge>
          </TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">Active</Badge>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const TransactionHistory: Story = {
  render: () => (
    <Table>
      <TableCaption>Your recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Transaction</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-01-15</TableCell>
          <TableCell>Payment received</TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">Success</Badge>
          </TableCell>
          <TableCell className="text-right text-green-600">+$1,250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-14</TableCell>
          <TableCell>Subscription payment</TableCell>
          <TableCell>
            <Badge className="bg-green-500 text-white border-transparent">Success</Badge>
          </TableCell>
          <TableCell className="text-right text-red-600">-$29.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-13</TableCell>
          <TableCell>Refund processed</TableCell>
          <TableCell>
            <Badge className="bg-yellow-500 text-white border-transparent">Processing</Badge>
          </TableCell>
          <TableCell className="text-right text-green-600">+$99.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Balance</TableCell>
          <TableCell className="text-right">$1,319.01</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const CompactTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 px-2 py-1">Name</TableHead>
          <TableHead className="h-8 px-2 py-1">Status</TableHead>
          <TableHead className="h-8 px-2 py-1 text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="px-2 py-1">Item 1</TableCell>
          <TableCell className="px-2 py-1">Active</TableCell>
          <TableCell className="px-2 py-1 text-right">100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="px-2 py-1">Item 2</TableCell>
          <TableCell className="px-2 py-1">Inactive</TableCell>
          <TableCell className="px-2 py-1 text-right">50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="px-2 py-1">Item 3</TableCell>
          <TableCell className="px-2 py-1">Active</TableCell>
          <TableCell className="px-2 py-1 text-right">75</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>User {i + 1}</TableCell>
            <TableCell>user{i + 1}@example.com</TableCell>
            <TableCell>Department {(i % 5) + 1}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithDifferentAlignments: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Product</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-left">Product A</TableCell>
          <TableCell className="text-center">5</TableCell>
          <TableCell className="text-right">$10.00</TableCell>
          <TableCell className="text-right">$50.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-left">Product B</TableCell>
          <TableCell className="text-center">3</TableCell>
          <TableCell className="text-right">$20.00</TableCell>
          <TableCell className="text-right">$60.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-left">Product C</TableCell>
          <TableCell className="text-center">2</TableCell>
          <TableCell className="text-right">$15.00</TableCell>
          <TableCell className="text-right">$30.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            Grand Total
          </TableCell>
          <TableCell className="text-right">$140.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
