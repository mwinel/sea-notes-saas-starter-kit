import type { Preview } from '@storybook/nextjs';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/app/globals.css';

export const decorators = [
  withThemeByClassName({
    themes: { light: 'light', dark: 'dark' },
    defaultTheme: 'light',
    parentSelector: 'html',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      source: {
        state: 'open', // This ensures the code block is open by default
      },
    },
  },
  //👇 Enables auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;
