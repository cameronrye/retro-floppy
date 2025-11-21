import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloppyDisk } from '../index';

describe('FloppyDisk', () => {
  it('renders with minimal props', () => {
    render(<FloppyDisk />);
    const figure = screen.getByRole('button');
    expect(figure).toBeInTheDocument();
  });

  it('uses label to generate text and aria-label by default', () => {
    render(
      <FloppyDisk
        label={{ name: 'Second Reality', author: 'Future Crew' }}
      />,
    );

    expect(screen.getByText('Second Reality')).toBeInTheDocument();
    expect(screen.getByText('Future Crew')).toBeInTheDocument();

    const figure = screen.getByRole('button');
    expect(figure).toHaveAttribute(
      'aria-label',
      'Second Reality by Future Crew',
    );
  });

  it('prefers ariaLabel prop over generated label', () => {
    render(
      <FloppyDisk
        label={{ name: 'Hidden', author: 'Internal' }}
        ariaLabel="Custom label"
      />,
    );

    const figure = screen.getByRole('button');
    expect(figure).toHaveAttribute('aria-label', 'Custom label');
  });

  it('invokes onClick when clicked and not disabled', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} />);

    const figure = screen.getByRole('button');
    fireEvent.click(figure);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} disabled />);

    const figure = screen.getByRole('button');
    fireEvent.click(figure);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('supports keyboard activation via Enter and Space', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} />);

    const figure = screen.getByRole('button');

    fireEvent.keyDown(figure, { key: 'Enter' });
    fireEvent.keyDown(figure, { key: ' ' });

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('does not handle keyboard events when disabled', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} disabled />);

    const figure = screen.getByRole('button');

    fireEvent.keyDown(figure, { key: 'Enter' });
    fireEvent.keyDown(figure, { key: ' ' });

    expect(handleClick).not.toHaveBeenCalled();
  });
});

