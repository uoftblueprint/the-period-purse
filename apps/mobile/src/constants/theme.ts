import '@/global.css';

import { Platform } from 'react-native';

import { MD3LightTheme, configureFonts } from 'react-native-paper';

//the prior expo template was left intact until the files that reference it elsewhere are resolved

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const FontFamily = {
  leagueSpartan: 'LeagueSpartan_400Regular',
  workSans: 'WorkSans_400Regular',
  nunitoSans: 'NunitoSans_400Regular',
  avenirBook: Platform.select({ ios: 'Avenir-Book', default: 'sans-serif' }),
  avenirHeavy: Platform.select({ ios: 'Avenir-Heavy', default: 'sans-serif' }),
  system: Platform.select({ ios: 'System', default: 'sans-serif' }),
  mono: Platform.select({ ios: 'Menlo', default: 'monospace' }),
};

const brand = {
  turquoise: '#72C6B7',
  black: '#000000',
  lightPink: '#FFF0F0',
  white: '#FFFFFF',
  darkTurqoise: '#5b9f93',
  red: '#E80736',
  pink: '#F28D9A',
  lightTurquoise: '#C6EBE4',
  midLightPink: '#FCC9D1',
  gray: '#e5e5e5',
  darkGray: '#6D6E71',
  transparentBackdrop: 'rgba(0, 0, 0, 0.5)'
} as const;

export const theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.turquoise,
    onPrimary: brand.black,
    surfaceVariant: brand.lightPink,
    surface: brand.white,
    onSurface: brand.black,
    outline: brand.darkTurqoise,
    background: brand.midLightPink,
    onBackground: brand.black,
    onSurfaceVariant: brand.black,
    primaryContainer: brand.turquoise,
    onPrimaryContainer: brand.black,
    loggedPeriodDate: brand.red,
    futurePeriodDate: brand.pink,
    ovulationDate: brand.lightTurquoise,
    majorButton: brand.red,
    text: brand.black,
    secondary: brand.white,
    onSecondary: brand.black,
    secondaryContainer: brand.gray,
    onSecondaryContainer: brand.black,
    error: brand.red,
    onError: brand.black,
    errorContainer: brand.red,
    onErrorContainer: brand.black,
    elevation: {
      level0: 'transparent',
      level1: brand.white, level2: brand.white, level3: brand.white,
      level4: brand.white, level5: brand.white,
    },
    outlineVariant: brand.darkGray,
    surfaceDisabled: brand.darkGray,
    onSurfaceDisabled: brand.white,
    backdrop: brand.transparentBackdrop,
    inverseSurface: brand.darkGray,
    inverseOnSurface: brand.white,
    inversePrimary: brand.turquoise,
    tertiary: brand.lightPink,
    onTertiary: brand.black,
    tertiaryContainer: brand.lightPink,
    onTertiaryContainer: brand.black,
    shadow: brand.black,
    scrim: brand.black
  },
  fonts: configureFonts({ config: {
    header:    { fontFamily: FontFamily.leagueSpartan, fontWeight: '400', fontSize: 30, lineHeight: 30, letterSpacing: 0 },
    subHeader:{ fontFamily: FontFamily.avenirHeavy, fontWeight: '800', fontSize: 15, lineHeight: 15, letterSpacing: -0.3 },
    taskbar: { fontFamily: FontFamily.system, fontWeight: '600', fontSize: 17, lineHeight: 22, letterSpacing: 0 },
    infoBubble:   { fontFamily: FontFamily.workSans,  fontWeight: '400',  fontSize: 10, lineHeight: 10, letterSpacing: -0.2 },
    body: { fontFamily: FontFamily.avenirBook, fontWeight: '400', fontSize: 14, lineHeight: 14, letterSpacing: -0.3 },
    settingsHeader:     { fontFamily: FontFamily.nunitoSans, fontWeight: '400',   fontSize: 15, lineHeight: 15, letterSpacing: 0 },
  } }),
  spacing: {
    half: 2,
    one: 4,
    two: 8,
    three: 16,
    four: 24,
    five: 32,
    six: 64,
  },
  radii: { md: 12, lg: 16, full: 999 },
};

export type AppTheme = typeof theme;
export type ThemeColorName = Exclude<keyof typeof theme.colors, 'elevation'>;