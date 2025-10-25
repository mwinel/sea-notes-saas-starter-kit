import React, { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Custom render function to wrap components with necessary providers
 */
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

export const renderWithProviders = (ui: ReactElement, client?: QueryClient) => {
  const queryClient = client || createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

/**
 * Helper to click an element by testId
 */
export const clickElement = async (testId: string) => {
  const user = userEvent.setup();
  const element = screen.getByTestId(testId);
  if (element) {
    await user.click(element);
  }
};

/**
 * Helper to wait for element to appear
 */
export const waitForElement = async (testId: string, timeout: number = 1000) => {
  await waitFor(
    () => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    },
    { timeout }
  );
};

/**
 * Helper to wait for element to disappear
 */
export const waitForElementToDisappear = async (testId: string, timeout: number = 1000) => {
  await waitFor(
    () => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    },
    { timeout }
  );
};
