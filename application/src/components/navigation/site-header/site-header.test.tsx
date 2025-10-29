import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

// Mock sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  SidebarTrigger: ({ children, ...props }: any) => (
    <button data-testid="sidebar-trigger" {...props}>
      {children}
    </button>
  ),
}));

describe('SiteHeader', () => {
  it('renders the provided title', () => {
    // Arrange & Act
    const testTitle = 'Dashboard';
    render(<SiteHeader title={testTitle} />);

    // Assert
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('renders sidebar trigger', () => {
    // Arrange & Act
    render(<SiteHeader title="Test Title" />);

    // Assert: The SidebarTrigger should be present (it's a button)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
