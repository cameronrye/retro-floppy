import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  FloppyDisk,
  DARK_FLOPPY_THEME,
  NEON_THEME,
  RETRO_THEME,
  PASTEL_THEME,
} from '../index';

describe('FloppyDisk', () => {
  it('renders with minimal props', () => {
    render(<FloppyDisk />);
    const figure = screen.getByRole('button');
    expect(figure).toBeInTheDocument();
  });

  it('uses label to generate text and aria-label by default', () => {
    render(
      <FloppyDisk label={{ name: 'Second Reality', author: 'Future Crew' }} />,
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

    // Enter activates on keydown
    fireEvent.keyDown(figure, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Space activates on keyup
    fireEvent.keyDown(figure, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1); // Still 1
    fireEvent.keyUp(figure, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2); // Now 2
  });

  it('does not handle keyboard events when disabled', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} disabled />);

    const figure = screen.getByRole('button');

    fireEvent.keyDown(figure, { key: 'Enter' });
    fireEvent.keyDown(figure, { key: ' ' });

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('activates on space keyup, not keydown', () => {
    const handleClick = vi.fn();
    render(<FloppyDisk onClick={handleClick} />);

    const figure = screen.getByRole('button');

    // Space keydown should not trigger onClick
    fireEvent.keyDown(figure, { key: ' ' });
    expect(handleClick).not.toHaveBeenCalled();

    // Space keyup should trigger onClick
    fireEvent.keyUp(figure, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('invokes onDoubleClick when double-clicked', () => {
    const handleDoubleClick = vi.fn();
    render(<FloppyDisk onDoubleClick={handleDoubleClick} />);

    const figure = screen.getByRole('button');
    fireEvent.doubleClick(figure);

    expect(handleDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke onDoubleClick when disabled', () => {
    const handleDoubleClick = vi.fn();
    render(<FloppyDisk onDoubleClick={handleDoubleClick} disabled />);

    const figure = screen.getByRole('button');
    fireEvent.doubleClick(figure);

    expect(handleDoubleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<FloppyDisk className="custom-class" />);
    const figure = screen.getByRole('button');
    expect(figure).toHaveClass('custom-class');
  });

  it('renders with selected state', () => {
    render(<FloppyDisk selected />);
    const figure = screen.getByRole('button');
    // CSS modules hash class names, so check for the presence of 'selected' in className
    expect(figure.className).toMatch(/selected/);
  });

  it('renders with disabled state', () => {
    render(<FloppyDisk disabled />);
    const figure = screen.getByRole('button');
    // CSS modules hash class names, so check for the presence of 'disabled' in className
    expect(figure.className).toMatch(/disabled/);
    expect(figure).toHaveAttribute('aria-disabled', 'true');
    expect(figure).toHaveAttribute('tabIndex', '-1');
  });

  it('renders with static variant', () => {
    render(<FloppyDisk variant="static" />);
    const figure = screen.getByRole('button');
    // CSS modules hash class names, so check for the presence of 'static' in className
    expect(figure.className).toMatch(/static/);
  });

  it('renders with compact variant', () => {
    render(<FloppyDisk variant="compact" />);
    const figure = screen.getByRole('button');
    // CSS modules hash class names, so check for the presence of 'compact' in className
    expect(figure.className).toMatch(/compact/);
  });

  it('renders with custom size (number)', () => {
    const { container } = render(<FloppyDisk size={300} />);
    const figure = container.querySelector('figure');
    expect(figure).toHaveStyle({ '--floppy-size': '300px' });
  });

  it('renders with predefined size', () => {
    const { container } = render(<FloppyDisk size="large" />);
    const figure = container.querySelector('figure');
    expect(figure).toHaveStyle({ '--floppy-size': '400px' });
  });

  it('displays capacity prop over label.size', () => {
    render(
      <FloppyDisk
        label={{ name: 'Test', size: '720 KB' }}
        capacity="1.44 MB"
      />,
    );

    expect(screen.getByText('1.44 MB')).toBeInTheDocument();
    expect(screen.queryByText('720 KB')).not.toBeInTheDocument();
  });

  it('displays label.size when capacity is not provided', () => {
    render(<FloppyDisk label={{ name: 'Test', size: '720 KB' }} />);

    expect(screen.getByText('720 KB')).toBeInTheDocument();
  });

  it('displays year when provided in label', () => {
    render(<FloppyDisk label={{ name: 'Test', year: '1993' }} />);

    expect(screen.getByText('1993')).toBeInTheDocument();
  });

  it('handles empty label gracefully', () => {
    render(<FloppyDisk label={{ name: '' }} />);
    const figure = screen.getByRole('button');
    expect(figure).toBeInTheDocument();
  });

  it('handles very long text in label', () => {
    const longName = 'A'.repeat(100);
    render(<FloppyDisk label={{ name: longName }} />);

    expect(screen.getByText(longName)).toBeInTheDocument();
  });

  it('applies custom theme colors', () => {
    const customTheme = {
      diskColor: '#ff0000',
      slideColor: '#00ff00',
      backgroundColor: '#0000ff',
      labelColor: '#ffff00',
      labelTextColor: '#ff00ff',
    };

    const { container } = render(<FloppyDisk theme={customTheme} />);
    const figure = container.querySelector('figure');

    expect(figure).toHaveStyle({
      '--floppy-color': '#ff0000',
      '--slide-color': '#00ff00',
      '--bg-color': '#0000ff',
      '--label-color': '#ffff00',
      '--label-text-color': '#ff00ff',
    });
  });

  it('displays disk type on slide', () => {
    render(<FloppyDisk diskType="DD" />);
    // DD type should show "DISK" by default
    expect(screen.getByText('DISK')).toBeInTheDocument();
  });

  it('displays custom type from label', () => {
    render(<FloppyDisk label={{ name: 'Test', type: 'ZIP' }} />);
    expect(screen.getByText('ZIP')).toBeInTheDocument();
  });

  it('applies gradient when enableGradient is true', () => {
    const { container } = render(
      <FloppyDisk
        label={{ name: 'Gradient Test', author: 'Test Author' }}
        theme={{ enableGradient: true }}
      />,
    );
    const figure = container.querySelector('figure');
    const labelColor = figure?.style.getPropertyValue('--label-color');

    // Should have a gradient CSS value (contains 'gradient')
    expect(labelColor).toContain('gradient');
  });

  it('uses solid color when enableGradient is false', () => {
    const { container } = render(
      <FloppyDisk
        label={{ name: 'Solid Test', author: 'Test Author' }}
        theme={{ enableGradient: false, labelColor: '#ffffff' }}
      />,
    );
    const figure = container.querySelector('figure');
    const labelColor = figure?.style.getPropertyValue('--label-color');

    // Should have a solid color (hex value)
    expect(labelColor).toBe('#ffffff');
  });

  it('generates deterministic gradients based on label name', () => {
    const { container: container1 } = render(
      <FloppyDisk
        label={{ name: 'Same Name', author: 'Author 1' }}
        theme={{ enableGradient: true }}
      />,
    );
    const { container: container2 } = render(
      <FloppyDisk
        label={{ name: 'Same Name', author: 'Author 2' }}
        theme={{ enableGradient: true }}
      />,
    );

    const figure1 = container1.querySelector('figure');
    const figure2 = container2.querySelector('figure');
    const gradient1 = figure1?.style.getPropertyValue('--label-color');
    const gradient2 = figure2?.style.getPropertyValue('--label-color');

    // Same name should produce same gradient
    expect(gradient1).toBe(gradient2);
  });

  it('generates different gradients for different names', () => {
    const { container: container1 } = render(
      <FloppyDisk
        label={{ name: 'Name One', author: 'Author' }}
        theme={{ enableGradient: true }}
      />,
    );
    const { container: container2 } = render(
      <FloppyDisk
        label={{ name: 'Name Two', author: 'Author' }}
        theme={{ enableGradient: true }}
      />,
    );

    const figure1 = container1.querySelector('figure');
    const figure2 = container2.querySelector('figure');
    const gradient1 = figure1?.style.getPropertyValue('--label-color');
    const gradient2 = figure2?.style.getPropertyValue('--label-color');

    // Different names should produce different gradients
    expect(gradient1).not.toBe(gradient2);
  });

  it('applies adaptive text color with gradients', () => {
    const { container } = render(
      <FloppyDisk
        label={{ name: 'Text Color Test', author: 'Test' }}
        theme={{ enableGradient: true }}
      />,
    );
    const figure = container.querySelector('figure');
    const textColor = figure?.style.getPropertyValue('--label-text-color');

    // Should have either black or white text color
    expect(['#ffffff', '#000000']).toContain(textColor);
  });

  // New props tests
  it('applies style prop to root element', () => {
    const customStyle = { opacity: 0.5, marginTop: '20px' };
    render(<FloppyDisk style={customStyle} />);

    const figure = screen.getByRole('button');
    expect(figure).toHaveStyle({ opacity: '0.5', marginTop: '20px' });
  });

  it('applies data-testid attribute', () => {
    render(<FloppyDisk data-testid="my-disk" />);

    const figure = screen.getByTestId('my-disk');
    expect(figure).toBeInTheDocument();
  });

  it('applies data-disk-id attribute', () => {
    render(<FloppyDisk data-disk-id="disk-123" />);

    const figure = screen.getByRole('button');
    expect(figure).toHaveAttribute('data-disk-id', 'disk-123');
  });

  it('renders with loading state', () => {
    const { container } = render(<FloppyDisk loading />);

    const figure = container.querySelector('figure');
    expect(figure?.className).toContain('loading');
  });

  it('renders with error state', () => {
    const { container } = render(<FloppyDisk error />);

    const figure = container.querySelector('figure');
    expect(figure?.className).toContain('error');
  });

  it('renders badge content', () => {
    render(<FloppyDisk badge={<span>NEW</span>} />);

    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('renders children overlay', () => {
    render(
      <FloppyDisk>
        <div>Custom Overlay</div>
      </FloppyDisk>,
    );

    expect(screen.getByText('Custom Overlay')).toBeInTheDocument();
  });

  it('calls onHover when mouse enters and leaves', () => {
    const handleHover = vi.fn();
    render(<FloppyDisk onHover={handleHover} />);

    const figure = screen.getByRole('button');

    fireEvent.mouseEnter(figure);
    expect(handleHover).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(figure);
    expect(handleHover).toHaveBeenCalledWith(false);

    expect(handleHover).toHaveBeenCalledTimes(2);
  });

  it('calls onFocus when element gains and loses focus', () => {
    const handleFocus = vi.fn();
    render(<FloppyDisk onFocus={handleFocus} />);

    const figure = screen.getByRole('button');

    fireEvent.focus(figure);
    expect(handleFocus).toHaveBeenCalledWith(true);

    fireEvent.blur(figure);
    expect(handleFocus).toHaveBeenCalledWith(false);

    expect(handleFocus).toHaveBeenCalledTimes(2);
  });

  it('applies animation configuration', () => {
    const { container } = render(
      <FloppyDisk
        animation={{
          hoverDuration: 1000,
          easing: 'ease-in-out',
        }}
      />,
    );

    const figure = container.querySelector('figure');
    const duration = figure?.style.getPropertyValue('--animation-duration');
    const easing = figure?.style.getPropertyValue('--animation-easing');

    expect(duration).toBe('1000ms');
    expect(easing).toBe('ease-in-out');
  });

  it('disables animations when disableAnimations is true', () => {
    const { container } = render(
      <FloppyDisk
        animation={{
          disableAnimations: true,
        }}
      />,
    );

    const figure = container.querySelector('figure');
    const duration = figure?.style.getPropertyValue('--animation-duration');

    expect(duration).toBe('0ms');
  });

  // Theme preset tests
  it('applies DARK_FLOPPY_THEME correctly', () => {
    const { container } = render(<FloppyDisk theme={DARK_FLOPPY_THEME} />);

    const figure = container.querySelector('figure');
    const diskColor = figure?.style.getPropertyValue('--floppy-color');

    expect(diskColor).toBe('#1a1a1a');
  });

  it('applies NEON_THEME correctly', () => {
    const { container } = render(<FloppyDisk theme={NEON_THEME} />);

    const figure = container.querySelector('figure');
    const diskColor = figure?.style.getPropertyValue('--floppy-color');

    expect(diskColor).toBe('#0a0a0a');
  });

  it('applies RETRO_THEME correctly', () => {
    const { container } = render(<FloppyDisk theme={RETRO_THEME} />);

    const figure = container.querySelector('figure');
    const diskColor = figure?.style.getPropertyValue('--floppy-color');

    expect(diskColor).toBe('#d4c5a9');
  });

  it('applies PASTEL_THEME correctly', () => {
    const { container } = render(<FloppyDisk theme={PASTEL_THEME} />);

    const figure = container.querySelector('figure');
    const diskColor = figure?.style.getPropertyValue('--floppy-color');

    expect(diskColor).toBe('#ffd6e8');
  });

  // Gradient customization tests
  it('applies custom gradient seed', () => {
    const { container: container1 } = render(
      <FloppyDisk
        label={{ name: 'Test' }}
        theme={{
          enableGradient: true,
          gradientOptions: { seed: 12345 },
        }}
      />,
    );
    const { container: container2 } = render(
      <FloppyDisk
        label={{ name: 'Different Name' }}
        theme={{
          enableGradient: true,
          gradientOptions: { seed: 12345 },
        }}
      />,
    );

    const figure1 = container1.querySelector('figure');
    const figure2 = container2.querySelector('figure');
    const gradient1 = figure1?.style.getPropertyValue('--label-color');
    const gradient2 = figure2?.style.getPropertyValue('--label-color');

    // Same seed should produce same gradient regardless of name
    expect(gradient1).toBe(gradient2);
  });

  it('applies custom gradient colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff'];
    const { container } = render(
      <FloppyDisk
        label={{ name: 'Test' }}
        theme={{
          enableGradient: true,
          gradientOptions: { colors: customColors },
        }}
      />,
    );

    const figure = container.querySelector('figure');
    const gradient = figure?.style.getPropertyValue('--label-color');

    // Should contain all custom colors
    expect(gradient).toContain('#ff0000');
    expect(gradient).toContain('#00ff00');
    expect(gradient).toContain('#0000ff');
  });

  it('applies custom gradient angle', () => {
    const { container } = render(
      <FloppyDisk
        label={{ name: 'Test' }}
        theme={{
          enableGradient: true,
          gradientType: 'linear',
          gradientOptions: { angle: 45 },
        }}
      />,
    );

    const figure = container.querySelector('figure');
    const gradient = figure?.style.getPropertyValue('--label-color');

    // Should contain the custom angle
    expect(gradient).toContain('45deg');
  });
});
