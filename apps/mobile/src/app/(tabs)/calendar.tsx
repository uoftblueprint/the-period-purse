import { Platform, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LegendButton } from '@/components/legend-button';
import { MonthCalendar } from '@/components/month-calendar';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function CalendarScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <Text accessibilityRole="header" variant="titleLarge">
            Calendar
          </Text>
          <View style={styles.legend}>
            <LegendButton />
          </View>
        </View>
        <MonthCalendar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // The web tab bar sits above the page content.
    paddingTop: Platform.OS === 'web' ? Spacing.six : 0,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 72,
  },
  // Matches the previous CalendarScreen: top-right, above the calendar.
  legend: {
    position: 'absolute',
    right: 20,
  },
});
