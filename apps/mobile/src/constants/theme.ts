import "@/global.css";

import { Platform } from "react-native";

import { MD3LightTheme, configureFonts } from "react-native-paper";

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const FontFamily = {
  leagueSpartan: "LeagueSpartan_400Regular",
  workSans: "WorkSans_400Regular",
  nunitoSans: "NunitoSans_400Regular",
  avenirBook: Platform.select({ ios: "Avenir-Book", default: "sans-serif" }),
  avenirHeavy: Platform.select({ ios: "Avenir-Heavy", default: "sans-serif" }),
  system: Platform.select({ ios: "System", default: "sans-serif" }),
  mono: Platform.select({ ios: "Menlo", default: "monospace" }),
};

const brand = {
  turquoise: "#72C6B7",
  black: "#000000",
  lightPink: "#FFF0F0",
  white: "#FFFFFF",
  darkTurquoise: "#5b9f93",
  red: "#E80736",
  pink: "#F28D9A",
  lightTurquoise: "#C6EBE4",
  midLightPink: "#FCC9D1",
  gray: "#e5e5e5",
  darkGray: "#6D6E71",
  transparentBackdrop: "rgba(0, 0, 0, 0.5)",
} as const;

export const theme = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,

    //Primary
    primary: brand.turquoise,
    onPrimary: brand.black,
    primaryContainer: brand.turquoise,
    onPrimaryContainer: brand.black,
    inversePrimary: brand.turquoise,
    inverseSurface: brand.darkGray,
    inverseOnSurface: brand.white,

    //Secondary
    secondary: brand.white,
    onSecondary: brand.black,
    secondaryContainer: brand.gray,
    onSecondaryContainer: brand.black,

    //Tertiary
    tertiary: brand.lightPink,
    onTertiary: brand.black,
    tertiaryContainer: brand.lightPink,
    onTertiaryContainer: brand.black,

    //Surfaces
    surface: brand.white,
    onSurface: brand.black,
    surfaceVariant: brand.lightPink,
    onSurfaceVariant: brand.black,
    surfaceDisabled: brand.darkGray,
    onSurfaceDisabled: brand.black,

    //Brand-Specific
    loggedPeriodDate: brand.red,
    futurePeriodDate: brand.pink,
    ovulationDate: brand.lightTurquoise,
    majorButton: brand.red,
    text: brand.black,

    //Error
    error: brand.red,
    onError: brand.black,
    errorContainer: brand.red,
    onErrorContainer: brand.black,

    //Elevation
    elevation: {
      level0: "transparent",
      level1: brand.white,
      level2: brand.white,
      level3: brand.white,
      level4: brand.white,
      level5: brand.white,
    },

    //Outline
    outline: brand.darkTurquoise,
    outlineVariant: brand.darkGray,

    //Background
    background: brand.midLightPink,
    onBackground: brand.black,

    //Edges
    backdrop: brand.transparentBackdrop,
    shadow: brand.black,
    scrim: brand.black,
  },
  fonts: configureFonts({
    config: {
      appHeader: {
        fontFamily: FontFamily.leagueSpartan,
        fontWeight: "400",
        fontSize: 40,
        lineHeight: 30,
        letterSpacing: 0,
      },
      header: {
        fontFamily: FontFamily.leagueSpartan,
        fontWeight: "400",
        fontSize: 30,
        lineHeight: 30,
        letterSpacing: 0,
      },
      subHeader: {
        fontFamily: FontFamily.leagueSpartan,
        fontWeight: "400",
        fontSize: 25,
        lineHeight: 30,
        letterSpacing: 0,
      },
      bodyHeader: {
        fontFamily: FontFamily.avenirHeavy,
        fontWeight: "800",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: -0.3,
      },
      taskbar: {
        fontFamily: FontFamily.system,
        fontWeight: "600",
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: 0,
      },
      infoBubble: {
        fontFamily: FontFamily.workSans,
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 10,
        letterSpacing: -0.2,
      },
      body: {
        fontFamily: FontFamily.avenirBook,
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: -0.3,
      },
      settingsHeader: {
        fontFamily: FontFamily.nunitoSans,
        fontWeight: "400",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
      },
    },
  }),
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
export type ThemeColorName = Exclude<keyof typeof theme.colors, "elevation">;

// Intentionally grayscale until the user requests brand styling.
// TODO: Replace these temporary logging tokens with the shared Paper theme from
// issue #3 once colors are approved; keep grayscale until then.
export const LoggingColors = {
  background: '#FFFFFF',
  action: '#242424',
  option: '#555555',
  surface: '#FFFFFF',
  text: '#242424',
  muted: '#6D6D6D',
  disabled: '#EEEEEE',
  flow: {
    None: '#F5F5F5',
    Spotting: '#EEEEEE',
    Light: '#CCCCCC',
    Medium: '#888888',
    Heavy: '#444444',
  },
} as const;
