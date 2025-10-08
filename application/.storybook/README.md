# Storybook Configuration

This directory contains the Storybook configuration for the UI component library.

## Files

- `main.ts` - Main Storybook configuration
- `preview.ts` - Global decorators, parameters, and theme setup
- `vitest.setup.ts` - Vitest integration for component testing

## Configuration Details

### Framework
- **Next.js with Vite**: Fast builds and hot reloading
- **TypeScript**: Full type support with automatic prop documentation
- **Path Aliases**: Configured to work with `@/` imports

### Addons
- **@storybook/addon-docs**: Automatic documentation generation
- **@storybook/addon-a11y**: Accessibility testing and reporting
- **@chromatic-com/storybook**: Visual testing integration

### Theme Support
- Light and dark theme toggle in toolbar
- Automatic background switching
- CSS custom properties integration

### Features
- Automatic prop documentation from TypeScript
- Interactive controls for all component props
- Accessibility testing for all stories
- Responsive design testing
- Custom CSS integration with Tailwind

## Usage

Start Storybook:
```bash
npm run storybook
```

Build for production:
```bash
npm run build-storybook
```

## Adding Components

1. Create component in `src/components/ui/`
2. Create corresponding `.stories.tsx` file
3. Follow the established patterns for consistency