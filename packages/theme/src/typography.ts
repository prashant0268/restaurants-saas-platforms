export const fontFamilies = {
  heading: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Menlo, Monaco, monospace',
} as const;

export const fontFamiliesNative = {
  heading: 'Inter-Bold',
  headingMedium: 'Inter-SemiBold',
  body: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
  mono: 'JetBrainsMono-Regular',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const lineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const letterSpacings = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;
