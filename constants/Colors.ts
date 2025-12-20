/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0B5C60';
const tintColorDark = '#0B5C60';

export const Colors = {
  light: {
    primary: '#0B5C60', // Deep Teal
    secondary: '#D4A373', // Sand/Gold
    accent: '#BC7269', // Muted Red (from Login button)
    background: '#FAFAFA', // Off-white
    surface: '#FFFFFF', // Pure white for cards
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      light: '#FFFFFF',
    },
    border: '#E0E0E0',
    error: '#D32F2F',
    success: '#388E3C',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#0B5C60',
    secondary: '#D4A373',
    accent: '#BC7269',
    background: '#151718',
    surface: '#2A2A2A',
    text: {
      primary: '#ECEDEE',
      secondary: '#9BA1A6',
      light: '#ECEDEE',
    },
    border: '#333333',
    error: '#CF6679',
    success: '#4CAF50',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
