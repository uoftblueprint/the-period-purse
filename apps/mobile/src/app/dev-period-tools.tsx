// TEMPORARY!!!!!!
// TODO: PLEASE DELETE THIS FILE!


import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getLoggedDays, saveDays } from '@/features/daily-log';
import { AveragePeriodLengthCard, PeriodHistory, logPeriodDates } from '@/features/periods';

// TEMPORARY test helper. Delete before opening a PR.
const PERIOD_A = ['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04', '2026-08-05']; // 5 days
const PERIOD_B = ['2026-09-01', '2026-09-02', '2026-09-03']; // 3 days
const PERIOD_C = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07']; // 7 days

async function clearAll() {
  // Setting flow to null (instead of deleting the storage key) goes through
  // saveDays, which notifies the hook so the screen refreshes.
  const days = await getLoggedDays();
  await saveDays(days.map((d) => ({ date: d.date, flow: null })));
}

export default function DevPeriodTools() {
  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="subtitle">Dev period tools</ThemedText>

          <AveragePeriodLengthCard />

          <ThemedText type="small" themeColor="textSecondary">
            Expected: A=5, then A+B=4, then A+B+C=5, then clear = no data.
          </ThemedText>

          <Button mode="contained-tonal" onPress={() => logPeriodDates(PERIOD_A, [])}>
            Add period A (5 days)
          </Button>
          <Button mode="contained-tonal" onPress={() => logPeriodDates(PERIOD_B, [])}>
            Add period B (3 days)
          </Button>
          <Button mode="contained-tonal" onPress={() => logPeriodDates(PERIOD_C, [])}>
            Add period C (7 days)
          </Button>
          <Button mode="outlined" onPress={() => logPeriodDates([], PERIOD_C.slice(-2))}>
            Remove last 2 days of C
          </Button>
          <Button mode="outlined" onPress={clearAll}>
            Clear all
          </Button>

          <ThemedText type="smallBold">Period history (from the other PR)</ThemedText>
          <PeriodHistory />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
});