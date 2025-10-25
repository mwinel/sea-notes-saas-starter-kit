import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthWrapper } from './auth-wrapper';

describe('AuthWrapper', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    children: <div>Test Content</div>,
  };

  it('renders title and description correctly', () => {
    render(<AuthWrapper {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<AuthWrapper {...defaultProps} />);
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('uses correct Card components structure', () => {
    const { container } = render(<AuthWrapper {...defaultProps} />);
    
    // Check for Card structure
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    
    // Check for CardHeader
    const cardHeader = container.querySelector('[data-slot="card-header"]');
    expect(cardHeader).toBeInTheDocument();
    
    // Check for CardTitle
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    // Check for CardDescription
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    
    // Check for CardContent
    const cardContent = container.querySelector('[data-slot="card-content"]');
    expect(cardContent).toBeInTheDocument();
  });
});
