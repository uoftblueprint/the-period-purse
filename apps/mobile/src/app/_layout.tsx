import '@/global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useFonts, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({ NunitoSans_700Bold });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </ThemeProvider>
  );
}
