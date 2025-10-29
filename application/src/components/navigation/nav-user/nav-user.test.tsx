import { render, screen } from '@testing-library/react';
import { NavUser } from './nav-user';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  SidebarMenu: ({ children, ...props }: any) => (
    <div data-testid="sidebar-menu" {...props}>
      {children}
    </div>
  ),
  SidebarMenuButton: ({ children, asChild, size, ...props }: any) => {
    if (asChild) {
      return (
        <div data-testid="sidebar-menu-button" data-size={size} {...props}>
          {children}
        </div>
      );
    }
    return (
      <button data-testid="sidebar-menu-button" data-size={size} {...props}>
        {children}
      </button>
    );
  },
  SidebarMenuItem: ({ children, ...props }: any) => (
    <div data-testid="sidebar-menu-item" {...props}>
      {children}
    </div>
  ),
  useSidebar: () => ({ isMobile: false }),
}));

describe('NavUser', () => {
  it('renders user information correctly', () => {
    // Arrange
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: '/avatars/shadcn.jpg',
    };

    // Act
    render(<NavUser user={mockUser} />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders user initials when avatar is not available', () => {
    // Arrange
    const mockUser = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      avatar: '',
    };

    // Act
    render(<NavUser user={mockUser} />);

    // Assert
    expect(screen.getByText('JS')).toBeInTheDocument();
  });
});
