import { render, screen } from '@testing-library/react';
import { NavMain } from './nav-main';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock sidebar components
jest.mock('@/components/ui/sidebar', () => ({
  SidebarGroup: ({ children, ...props }: any) => <div data-testid="sidebar-group" {...props}>{children}</div>,
  SidebarGroupContent: ({ children, ...props }: any) => <div data-testid="sidebar-group-content" {...props}>{children}</div>,
  SidebarMenu: ({ children, ...props }: any) => <div data-testid="sidebar-menu" {...props}>{children}</div>,
  SidebarMenuButton: ({ children, asChild, tooltip, ...props }: any) => {
    if (asChild) {
      return <div data-testid="sidebar-menu-button" title={tooltip} {...props}>{children}</div>;
    }
    return <button data-testid="sidebar-menu-button" title={tooltip} {...props}>{children}</button>;
  },
  SidebarMenuItem: ({ children, ...props }: any) => <div data-testid="sidebar-menu-item" {...props}>{children}</div>,
}));

describe('NavMain', () => {
  it('renders without crashing', () => {
    const mockItems = [
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'My Notes', url: '/my-notes' },
    ];
    render(<NavMain items={mockItems} />);
    expect(screen.getByTestId('sidebar-group')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    const mockItems = [
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'My Notes', url: '/my-notes' },
    ];
    render(<NavMain items={mockItems} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('My Notes')).toBeInTheDocument();
  });

  it('renders navigation items with icons', () => {
    const mockItems = [
      { title: 'Dashboard', url: '/dashboard', icon: () => <span data-testid="dashboard-icon">📊</span> },
      { title: 'My Notes', url: '/my-notes', icon: () => <span data-testid="notes-icon">📝</span> },
    ];
    render(<NavMain items={mockItems} />);
    expect(screen.getByTestId('dashboard-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notes-icon')).toBeInTheDocument();
  });

  it('renders correct links', () => {
    const mockItems = [
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'My Notes', url: '/my-notes' },
    ];
    render(<NavMain items={mockItems} />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const notesLink = screen.getByText('My Notes').closest('a');
    
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(notesLink).toHaveAttribute('href', '/my-notes');
  });
});
