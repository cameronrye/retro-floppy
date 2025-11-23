import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FloppyDisk } from '../FloppyDisk';

describe('Color Manipulation Functions', () => {
  describe('lightenColor', () => {
    it('lightens a dark color', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#000000' }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      // Should be lighter than black
      expect(highlight).toBeTruthy();
      expect(highlight).not.toBe('#000000');
      expect(highlight).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('lightens a medium color', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#808080' }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      expect(highlight).toBeTruthy();
      expect(highlight).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles 3-digit hex colors', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#abc' }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      expect(highlight).toBeTruthy();
      expect(highlight).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles colors without # prefix', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '2a2a2a' }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      expect(highlight).toBeTruthy();
      expect(highlight).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles invalid color gracefully', () => {
      const invalidColor = 'not-a-color';
      const { container } = render(
        <FloppyDisk theme={{ diskColor: invalidColor }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      // Should return original color when invalid
      expect(highlight).toBe(invalidColor);
    });

    it('does not exceed RGB maximum (255)', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#ffffff' }} />,
      );
      const figure = container.querySelector('figure');
      const highlight = figure?.style.getPropertyValue('--floppy-highlight');

      // Should still be white or very close to it
      expect(highlight).toBe('#ffffff');
    });
  });

  describe('darkenColor', () => {
    it('darkens a light color', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#ffffff' }} />,
      );
      const figure = container.querySelector('figure');
      const shadow = figure?.style.getPropertyValue('--floppy-shadow');

      // Should be darker than white
      expect(shadow).toBeTruthy();
      expect(shadow).not.toBe('#ffffff');
      expect(shadow).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('darkens a medium color', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#808080' }} />,
      );
      const figure = container.querySelector('figure');
      const shadow = figure?.style.getPropertyValue('--floppy-shadow');

      expect(shadow).toBeTruthy();
      expect(shadow).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles 3-digit hex colors', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#fed' }} />,
      );
      const figure = container.querySelector('figure');
      const shadow = figure?.style.getPropertyValue('--floppy-shadow');

      expect(shadow).toBeTruthy();
      expect(shadow).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles invalid color gracefully', () => {
      const invalidColor = 'invalid';
      const { container } = render(
        <FloppyDisk theme={{ diskColor: invalidColor }} />,
      );
      const figure = container.querySelector('figure');
      const shadow = figure?.style.getPropertyValue('--floppy-shadow');

      // Should return original color when invalid
      expect(shadow).toBe(invalidColor);
    });

    it('does not go below RGB minimum (0)', () => {
      const { container } = render(
        <FloppyDisk theme={{ diskColor: '#000000' }} />,
      );
      const figure = container.querySelector('figure');
      const shadow = figure?.style.getPropertyValue('--floppy-shadow');

      // Should still be black
      expect(shadow).toBe('#000000');
    });
  });

  describe('Color adjustment consistency', () => {
    it('produces consistent results for same input', () => {
      const { container: container1 } = render(
        <FloppyDisk theme={{ diskColor: '#2a2a2a' }} />,
      );
      const { container: container2 } = render(
        <FloppyDisk theme={{ diskColor: '#2a2a2a' }} />,
      );

      const highlight1 = container1
        .querySelector('figure')
        ?.style.getPropertyValue('--floppy-highlight');
      const highlight2 = container2
        .querySelector('figure')
        ?.style.getPropertyValue('--floppy-highlight');

      expect(highlight1).toBe(highlight2);
    });
  });
});
