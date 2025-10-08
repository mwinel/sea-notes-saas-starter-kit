# Storybook Setup

This project now includes Storybook for UI component development, testing, and documentation.

## What's Included

### Storybook Configuration
- **Framework**: Next.js with Vite for fast builds
- **Addons**: 
  - Essential addons (controls, actions, docs, etc.)
  - Accessibility testing (a11y)
  - Documentation generation
- **Styling**: Tailwind CSS integration with dark/light theme support
- **Path Aliases**: Configured to work with the project's `@/` imports

### Components
- **Button Component**: Comprehensive story with all variants, sizes, and states
  - Default, destructive, outline, secondary, ghost, and link variants
  - Small, default, large, and icon sizes
  - Loading and disabled states
  - Interactive examples and documentation

### Features
- **Theme Switching**: Toggle between light and dark themes in the toolbar
- **Accessibility Testing**: Built-in a11y checks for all components
- **Auto-documentation**: Automatic prop documentation from TypeScript
- **Interactive Controls**: Live editing of component props
- **Responsive Testing**: Test components at different viewport sizes

## Getting Started

### Running Storybook
```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Adding New Components
1. Create your component in `src/components/ui/`
2. Create a corresponding `.stories.tsx` file
3. Follow the pattern established in `button.stories.tsx`

### Story Structure
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './your-component';

const meta = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of your component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## Project Structure

```
.storybook/
├── main.ts          # Storybook configuration
├── preview.ts       # Global decorators and parameters
└── vitest.setup.ts  # Vitest integration setup

src/components/ui/
├── button.tsx           # Button component
├── button.stories.tsx   # Button stories
├── Introduction.mdx     # Documentation homepage
└── ...                  # Other UI components
```

## Best Practices

### Component Development
- Use TypeScript for all components
- Include comprehensive prop types
- Support both light and dark themes
- Follow accessibility guidelines
- Include loading and error states where applicable

### Story Writing
- Create stories for all component variants
- Include interactive examples
- Add documentation descriptions
- Test edge cases and error states
- Use meaningful story names

### Accessibility
- All components are tested with the a11y addon
- Use semantic HTML elements
- Include proper ARIA attributes
- Test with keyboard navigation
- Ensure proper color contrast

## Integration with Existing Project

The Storybook setup is configured to work seamlessly with the existing Next.js project:

- **Tailwind CSS**: Full integration with the project's design system
- **Path Aliases**: `@/` imports work correctly
- **TypeScript**: Full type checking and IntelliSense
- **Dependencies**: Shares the same dependencies as the main project

## Development Workflow

1. **Component Development**: Create components in isolation using Storybook
2. **Testing**: Use Storybook to test different states and props
3. **Documentation**: Stories serve as living documentation
4. **Integration**: Import components into the main application
5. **Maintenance**: Update stories when components change

## Deployment

Storybook can be deployed as a static site:

```bash
# Build Storybook
npm run build-storybook

# Deploy the storybook-static folder to your hosting provider
```

This creates a `storybook-static` folder that can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.