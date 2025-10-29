import React from 'react';
import { render, screen } from '@testing-library/react';
import FormButton from './FormButton';
import userEvent from '@testing-library/user-event';

describe('FormButton', () => {
  it('renders the button with given text', () => {
    // Arrange & Act
    render(<FormButton>Submit</FormButton>);

    // Assert
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  it('has type="submit"', () => {
    // Arrange & Act
    render(<FormButton>Submit</FormButton>);

    // Assert
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick handler when provided and clicked', async () => {
    // Arrange
    const handleClick = jest.fn();
    render(
      <FormButton>
        <span onClick={handleClick}>Click me</span>
      </FormButton>
    );

    // Act
    await userEvent.click(screen.getByText(/click me/i));

    // Assert
    expect(handleClick).toHaveBeenCalled();
  });
});
