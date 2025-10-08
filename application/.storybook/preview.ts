import type { Preview } from '@storybook/react';
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
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

