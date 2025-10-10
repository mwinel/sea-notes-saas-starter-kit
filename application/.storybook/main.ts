import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/components/ui/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],

  addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {
    //👇 See the table below for the list of supported options
    defaultName: 'Documentation',
    docsMode: true,
  },

  webpackFinal: async (config) => {
    if (!config.resolve) config.resolve = {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};

export default config;
