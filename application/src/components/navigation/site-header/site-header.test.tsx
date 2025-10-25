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
  it('renders without crashing', () => {
    render(<SiteHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the provided title', () => {
    const testTitle = 'Dashboard';
    render(<SiteHeader title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('renders sidebar trigger', () => {
    render(<SiteHeader title="Test Title" />);
    // The SidebarTrigger should be present (it's a button)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
