import { describe, it, expect } from 'vitest';
import {
  getAdaptiveTextColor,
  generateGradientCSS,
  generateLabelGradient,
  GradientGenerationOptions,
} from '../gradientUtils';

describe('gradientUtils', () => {
  describe('getAdaptiveTextColor', () => {
    it('returns white for dark colors', () => {
      const darkColors = ['hsl(240, 50%, 20%)', 'hsl(250, 50%, 25%)'];
      expect(getAdaptiveTextColor(darkColors)).toBe('#ffffff');
    });

    it('returns black for light colors', () => {
      const lightColors = ['hsl(60, 50%, 85%)', 'hsl(70, 50%, 90%)'];
      expect(getAdaptiveTextColor(lightColors)).toBe('#000000');
    });

    it('handles single color', () => {
      const singleColor = ['hsl(0, 0%, 50%)'];
      const result = getAdaptiveTextColor(singleColor);
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('handles multiple colors', () => {
      const multipleColors = [
        'hsl(120, 50%, 50%)',
        'hsl(180, 50%, 50%)',
        'hsl(240, 50%, 50%)',
      ];
      const result = getAdaptiveTextColor(multipleColors);
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe('generateGradientCSS', () => {
    const mockRandom = () => 0.5;

    it('generates linear gradient with default angle', () => {
      const colors = ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'];
      const result = generateGradientCSS(colors, 'linear', mockRandom);
      expect(result).toContain('linear-gradient');
      expect(result).toContain('deg');
      expect(result).toContain('hsl(0, 50%, 50%)');
      expect(result).toContain('hsl(120, 50%, 50%)');
    });

    it('generates linear gradient with custom angle', () => {
      const colors = ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'];
      const result = generateGradientCSS(colors, 'linear', mockRandom, 45);
      expect(result).toContain('linear-gradient(45deg');
    });

    it('generates radial gradient', () => {
      const colors = ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'];
      const result = generateGradientCSS(colors, 'radial', mockRandom);
      expect(result).toContain('radial-gradient');
      expect(result).toContain('circle at');
    });

    it('generates conic gradient', () => {
      const colors = ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'];
      const result = generateGradientCSS(colors, 'conic', mockRandom);
      expect(result).toContain('conic-gradient');
      expect(result).toContain('from');
    });

    it('returns default gradient for empty colors array', () => {
      const result = generateGradientCSS([], 'linear', mockRandom);
      expect(result).toContain('linear-gradient');
      expect(result).toContain('#667eea');
      expect(result).toContain('#764ba2');
    });

    it('returns single color when only one color provided', () => {
      const colors = ['hsl(0, 50%, 50%)'];
      const result = generateGradientCSS(colors, 'linear', mockRandom);
      expect(result).toBe('hsl(0, 50%, 50%)');
    });

    it('distributes color stops evenly', () => {
      const colors = [
        'hsl(0, 50%, 50%)',
        'hsl(120, 50%, 50%)',
        'hsl(240, 50%, 50%)',
      ];
      const result = generateGradientCSS(colors, 'linear', mockRandom);
      expect(result).toContain('0%');
      expect(result).toContain('50%');
      expect(result).toContain('100%');
    });
  });

  describe('generateLabelGradient', () => {
    it('generates deterministic gradient for same label name', () => {
      const result1 = generateLabelGradient('Test Label', 'linear');
      const result2 = generateLabelGradient('Test Label', 'linear');
      expect(result1.gradient).toBe(result2.gradient);
      expect(result1.textColor).toBe(result2.textColor);
      expect(result1.textShadow).toBe(result2.textShadow);
    });

    it('generates different gradients for different label names', () => {
      const result1 = generateLabelGradient('Label A', 'linear');
      const result2 = generateLabelGradient('Label B', 'linear');
      expect(result1.gradient).not.toBe(result2.gradient);
    });

    it('generates linear gradient when specified', () => {
      const result = generateLabelGradient('Test', 'linear');
      expect(result.gradient).toContain('linear-gradient');
    });

    it('generates radial gradient when specified', () => {
      const result = generateLabelGradient('Test', 'radial');
      expect(result.gradient).toContain('radial-gradient');
    });

    it('generates conic gradient when specified', () => {
      const result = generateLabelGradient('Test', 'conic');
      expect(result.gradient).toContain('conic-gradient');
    });

    it('generates auto gradient type', () => {
      const result = generateLabelGradient('Test', 'auto');
      expect(result.gradient).toMatch(
        /linear-gradient|radial-gradient|conic-gradient/,
      );
    });

    it('uses custom seed when provided', () => {
      const options: GradientGenerationOptions = { seed: 12345 };
      const result1 = generateLabelGradient(
        'Different Label',
        'linear',
        options,
      );
      const result2 = generateLabelGradient('Another Label', 'linear', options);
      expect(result1.gradient).toBe(result2.gradient);
    });

    it('uses custom colors when provided', () => {
      const customColors = ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'];
      const options: GradientGenerationOptions = { colors: customColors };
      const result = generateLabelGradient('Test', 'linear', options);
      expect(result.colors).toEqual(customColors);
      expect(result.gradient).toContain('hsl(0, 50%, 50%)');
      expect(result.gradient).toContain('hsl(120, 50%, 50%)');
    });

    it('uses custom angle when provided', () => {
      const options: GradientGenerationOptions = { angle: 90 };
      const result = generateLabelGradient('Test', 'linear', options);
      expect(result.gradient).toContain('linear-gradient(90deg');
    });

    it('returns appropriate text color', () => {
      const result = generateLabelGradient('Test', 'linear');
      expect(result.textColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(['#ffffff', '#000000']).toContain(result.textColor);
    });

    it('returns appropriate text shadow for white text', () => {
      // Use dark colors to ensure white text
      const options: GradientGenerationOptions = {
        colors: ['hsl(0, 50%, 20%)', 'hsl(120, 50%, 20%)'],
      };
      const result = generateLabelGradient('Test', 'linear', options);
      expect(result.textColor).toBe('#ffffff');
      expect(result.textShadow).toContain('rgba(0, 0, 0');
    });

    it('returns appropriate text shadow for black text', () => {
      // Use light colors to ensure black text
      const options: GradientGenerationOptions = {
        colors: ['hsl(0, 50%, 90%)', 'hsl(120, 50%, 90%)'],
      };
      const result = generateLabelGradient('Test', 'linear', options);
      expect(result.textColor).toBe('#000000');
      expect(result.textShadow).toContain('rgba(255, 255, 255');
    });

    it('handles empty label name', () => {
      const result = generateLabelGradient('', 'linear');
      expect(result.gradient).toBeTruthy();
      expect(result.textColor).toBeTruthy();
      expect(result.textShadow).toBeTruthy();
      expect(result.colors.length).toBeGreaterThan(0);
    });

    it('returns colors array in result', () => {
      const result = generateLabelGradient('Test', 'linear');
      expect(Array.isArray(result.colors)).toBe(true);
      expect(result.colors.length).toBeGreaterThan(0);
      result.colors.forEach((color) => {
        expect(color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
      });
    });

    it('handles very long label names', () => {
      const longLabel = 'A'.repeat(1000);
      const result = generateLabelGradient(longLabel, 'linear');
      expect(result.gradient).toBeTruthy();
      expect(result.textColor).toBeTruthy();
    });

    it('handles special characters in label name', () => {
      const specialLabel = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const result = generateLabelGradient(specialLabel, 'linear');
      expect(result.gradient).toBeTruthy();
      expect(result.textColor).toBeTruthy();
    });

    it('handles unicode characters in label name', () => {
      const unicodeLabel = '你好世界 🌍 مرحبا';
      const result = generateLabelGradient(unicodeLabel, 'linear');
      expect(result.gradient).toBeTruthy();
      expect(result.textColor).toBeTruthy();
    });

    it('combines multiple options correctly', () => {
      const options: GradientGenerationOptions = {
        seed: 42,
        colors: ['hsl(0, 50%, 50%)', 'hsl(120, 50%, 50%)'],
        angle: 180,
      };
      const result = generateLabelGradient('Test', 'linear', options);
      expect(result.gradient).toContain('linear-gradient(180deg');
      expect(result.colors).toEqual(options.colors);
    });
  });
});
