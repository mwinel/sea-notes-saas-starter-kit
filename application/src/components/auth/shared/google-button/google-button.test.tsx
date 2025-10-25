import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoogleButton } from './google-button';

describe('GoogleButton', () => {
  const defaultProps = {
    children: 'Sign in with Google',
  };

  it('renders button with children text', () => {
    render(<GoogleButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: /Sign in with Google/ });
    expect(button).toBeInTheDocument();
  });

  it('displays Google SVG icon', () => {
    const { container } = render(<GoogleButton {...defaultProps} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveClass('w-5', 'h-5');
  });

  it('handles onClick event when provided', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<GoogleButton {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Sign in with Google/ });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
