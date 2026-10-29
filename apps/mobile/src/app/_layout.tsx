import { DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { LeagueSpartan_400Regular } from '@expo-google-fonts/league-spartan';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { theme } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.onSurface,
    border: theme.colors.outline,
  },
};

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    WorkSans_400Regular,
    NunitoSans_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={navigationTheme}>
      <PaperProvider theme={theme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </PaperProvider>
    </ThemeProvider>
  );
}
