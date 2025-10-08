# UI Components Storybook

This directory contains the UI components with Storybook stories for development, testing, and documentation.

## 🚀 Getting Started

### Running Storybook

To start Storybook in development mode:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

## 📚 Available Components

### Button Component

The Button component is a versatile, accessible button with multiple variants and states.

**Location:** `src/components/ui/button.tsx`  
**Story:** `src/components/ui/button.stories.tsx`

#### Features

- **Variants:**
  - `default` - Primary action button with solid background
  - `destructive` - For destructive actions (delete, remove, etc.)
  - `outline` - Button with border and transparent background
  - `secondary` - Secondary action button
  - `ghost` - Minimal button with no background
  - `link` - Text-only button styled as a link

- **Sizes:**
  - `sm` - Small button (height: 32px)
  - `default` - Default button (height: 36px)
  - `lg` - Large button (height: 40px)
  - `icon-sm` - Small icon-only button (32x32px)
  - `icon` - Default icon-only button (36x36px)
  - `icon-lg` - Large icon-only button (40x40px)

- **States:**
  - `loading` - Shows a spinner and disables the button
  - `disabled` - Disables button interaction

#### Usage Examples

```tsx
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

// Basic button
<Button>Click me</Button>

// Variant button
<Button variant="destructive">Delete</Button>

// With icon
<Button>
  <Mail />
  Send Email
</Button>

// Loading state
<Button loading>Processing...</Button>

// Icon only
<Button size="icon" variant="outline">
  <Mail />
</Button>
```

## 🎨 Theme Support

Storybook is configured with full theme support for both light and dark modes:

- Use the theme switcher in the Storybook toolbar to toggle between light and dark modes
- All components automatically respect the theme settings
- Theme configuration is in `.storybook/preview.ts`

## 🔧 Configuration

### Storybook Configuration Files

- **`.storybook/main.ts`** - Main Storybook configuration
  - Framework: Next.js
  - Addons: A11y, Docs, Vitest, Chromatic
  - Story pattern: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`

- **`.storybook/preview.ts`** - Global decorators and parameters
  - Global styles import from `src/app/globals.css`
  - Theme switcher implementation
  - Background color configuration

### Technologies Used

- **Storybook 9.1.10** - Component development and documentation
- **@storybook/nextjs** - Next.js integration
- **@storybook/addon-a11y** - Accessibility testing
- **@storybook/addon-docs** - Auto-generated documentation
- **@storybook/addon-vitest** - Integration testing support
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Variant management
- **lucide-react** - Icon library

## 📝 Writing Stories

Stories should be placed next to their components with the `.stories.tsx` extension.

### Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './your-component';

const meta = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define your arg types here
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your default args
  },
};
```

## 🧪 Testing

Storybook includes testing addons:

- **A11y Addon** - Automatically checks for accessibility issues
- **Vitest Addon** - Enables component testing within Storybook

## 📖 Documentation

Stories are automatically documented using the `autodocs` tag. The documentation includes:

- Component description
- Interactive controls for all props
- Multiple story variants
- Source code examples

## 🚧 Next Steps

The following components are planned for Storybook integration:

- [ ] Card component
- [ ] Input component
- [ ] Label component
- [ ] Password Input component
- [ ] Field component
- [ ] Separator component
- [ ] Sonner (Toast) component
- [ ] Spinner component

## 🤝 Contributing

When adding new UI components:

1. Create the component in `src/components/ui/`
2. Create a corresponding `.stories.tsx` file
3. Include all variants and states
4. Add accessibility considerations
5. Document usage examples
6. Update this README

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [CVA Documentation](https://cva.style/docs)
