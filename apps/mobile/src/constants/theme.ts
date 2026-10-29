import '@/global.css';

import { Platform, type TextStyle } from 'react-native';

import { MD3LightTheme, configureFonts } from 'react-native-paper';

//the prior expo template was left intact until the files that reference it elsewhere are resolved

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const FontFamily = {
  leagueSpartan: 'LeagueSpartan_400Regular',
  workSans: 'WorkSans_400Regular',
  nunitoSans: 'NunitoSans_400Regular',
  avenirBook: Platform.select({ ios: 'Avenir-Book', default: 'sans-serif' }),
  avenirHeavy: Platform.select({ ios: 'Avenir-Heavy', default: 'sans-serif' }),
  system: Platform.select({ ios: 'System', default: 'sans-serif' }),
};

export const Typography = {
  spartan30:    { fontFamily: FontFamily.leagueSpartan, fontSize: 30, lineHeight: 30, letterSpacing: 0 },
  avenirHeavy15:{ fontFamily: FontFamily.avenirHeavy,   fontSize: 15, lineHeight: 15, letterSpacing: -0.3 },
  sfSemibold17: { fontFamily: FontFamily.system, fontWeight: '600', fontSize: 17, lineHeight: 22, letterSpacing: 0 },
  workSans10:   { fontFamily: FontFamily.workSans,      fontSize: 10, lineHeight: 10, letterSpacing: -0.2 },
  avenirBook14: { fontFamily: FontFamily.avenirBook,    fontSize: 14, lineHeight: 14, letterSpacing: -0.3 },
  nunito15:     { fontFamily: FontFamily.nunitoSans,    fontSize: 15, lineHeight: 15, letterSpacing: 0 },
} satisfies Record<string, TextStyle>;


export const theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#72C6B7',
    onPrimary: '#000000',
    surfaceVariant: '#FFF0F0',
    surface: '#FFFFFF',
    onSurface: '#000000',
    outline: '#5b9f93',
    background: '#FCC9D1',
    onBackground: '#000000',
    onSurfaceVariant: '#000000',
    primaryContainer: '#72C6B7',
    onPrimaryContainer: '#000000',
    //once a colour for a selected button is decided, secondaryContainer and onSecondaryContainer will be added
    loggedPeriodDate: '#E80736',
    futurePeriodDate: '#F28D9A',
    ovulationDate: '#C6EBE4',
    majorButton: '#E80736',
  },
  fonts: configureFonts({ config: { fontFamily: FontFamily.nunitoSans } }),
  typography: Typography,
  spacing: Spacing,
  radii: { md: 12, lg: 16, full: 999 },
};

export type AppTheme = typeof theme;