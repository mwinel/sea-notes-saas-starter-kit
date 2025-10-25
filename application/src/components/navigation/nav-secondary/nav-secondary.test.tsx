import { render, screen } from '@testing-library/react';
import { NavSecondary } from './nav-secondary';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  SidebarGroup: ({ children, ...props }: any) => (
    <div data-testid="sidebar-group" {...props}>
      {children}
    </div>
  ),
  SidebarGroupContent: ({ children, ...props }: any) => (
    <div data-testid="sidebar-group-content" {...props}>
      {children}
    </div>
  ),
  SidebarMenu: ({ children, ...props }: any) => (
    <div data-testid="sidebar-menu" {...props}>
      {children}
    </div>
  ),
  SidebarMenuButton: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return (
        <div data-testid="sidebar-menu-button" {...props}>
          {children}
        </div>
      );
    }
    return (
      <button data-testid="sidebar-menu-button" {...props}>
        {children}
      </button>
    );
  },
  SidebarMenuItem: ({ children, ...props }: any) => (
    <div data-testid="sidebar-menu-item" {...props}>
      {children}
    </div>
  ),
}));

describe('NavSecondary', () => {
  it('renders without crashing', () => {
    const mockItems = [
      { title: 'Settings', url: '/settings', icon: () => null },
      { title: 'Get Help', url: '#', icon: () => null },
    ];
    render(<NavSecondary items={mockItems} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Get Help')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const mockItems = [{ title: 'Settings', url: '/settings', icon: () => null }];
    render(
      <NavSecondary items={mockItems}>
        <div data-testid="child-component">Child Component</div>
      </NavSecondary>
    );
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });
});
