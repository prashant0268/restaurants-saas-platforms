export const colors = {
  // Brand
  primary: {
    50: '#FFF5F0',
    100: '#FFE6D9',
    200: '#FFCBB3',
    300: '#FFB08C',
    400: '#FF9566',
    500: '#FF6B35',
    600: '#E55A2B',
    700: '#CC4A21',
    800: '#B23A17',
    900: '#992A0D',
  },
  secondary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Neutrals
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Order Status Colors
  orderStatus: {
    pending: '#F59E0B',
    confirmed: '#3B82F6',
    preparing: '#8B5CF6',
    ready: '#22C55E',
    picked_up: '#06B6D4',
    out_for_delivery: '#6366F1',
    delivered: '#10B981',
    completed: '#059669',
    cancelled: '#EF4444',
    refunded: '#F97316',
  },

  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F5F5F5',
  },
  backgroundDark: {
    primary: '#171717',
    secondary: '#262626',
    tertiary: '#404040',
  },

  // Text
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    inverse: '#FFFFFF',
    link: '#3B82F6',
  },
  textDark: {
    primary: '#FAFAFA',
    secondary: '#A3A3A3',
    tertiary: '#737373',
    inverse: '#171717',
    link: '#60A5FA',
  },

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = typeof colors;
