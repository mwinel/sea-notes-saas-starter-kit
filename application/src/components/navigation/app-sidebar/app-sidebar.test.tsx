import { render, screen } from '@testing-library/react';
import { AppSidebar } from './app-sidebar';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

// Mock the navigation components
jest.mock('@/components/navigation/nav-main', () => ({
  NavMain: ({ items }: { items: any[] }) => <div data-testid="nav-main">NavMain</div>,
}));

jest.mock('@/components/navigation/nav-secondary', () => ({
  NavSecondary: ({ items, children }: { items: any[]; children?: React.ReactNode }) => (
    <div data-testid="nav-secondary">NavSecondary</div>
  ),
}));

jest.mock('@/components/navigation/nav-user', () => ({
  NavUser: ({ user }: { user: any }) => <div data-testid="nav-user">NavUser</div>,
}));

// Mock theme toggle
jest.mock('@/components/shared/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

// Mock sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children, ...props }: any) => (
    <div data-testid="sidebar" {...props}>
      {children}
    </div>
  ),
  SidebarContent: ({ children, ...props }: any) => (
    <div data-testid="sidebar-content" {...props}>
      {children}
    </div>
  ),
  SidebarFooter: ({ children, ...props }: any) => (
    <div data-testid="sidebar-footer" {...props}>
      {children}
    </div>
  ),
  SidebarHeader: ({ children, ...props }: any) => (
    <div data-testid="sidebar-header" {...props}>
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

describe('AppSidebar', () => {
  it('renders without crashing', () => {
    render(<AppSidebar />);
    expect(screen.getByText('SeaNotes')).toBeInTheDocument();
  });

  it('renders with user data when provided', () => {
    const mockUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      image: '/avatar.jpg',
    };

    render(<AppSidebar user={mockUser} />);
    expect(screen.getByText('SeaNotes')).toBeInTheDocument();
  });
});
