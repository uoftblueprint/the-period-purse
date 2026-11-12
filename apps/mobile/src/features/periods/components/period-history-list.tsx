import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

import type { Period } from '../types';
import { PeriodHistoryItem } from './period-history-item';

type PeriodHistoryListProps = {
  /** Periods to show, newest first. */
  periods: readonly Period[];
  /** Show at most this many periods. Shows all when omitted. */
  limit?: number;
  /** Shows a "Show More" link when some periods are hidden by `limit`. */
  onShowMore?: () => void;
};

/** Period history list. Display only: pass it the periods to show. */
export function PeriodHistoryList({ periods, limit, onShowMore }: PeriodHistoryListProps) {
  const visible = limit === undefined ? periods : periods.slice(0, limit);
  const hasMore = visible.length < periods.length;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="smallBold">Period History</ThemedText>

      {periods.length === 0 ? (
        <ThemedText type="small" themeColor="textSecondary">
          Please start logging to learn more.
        </ThemedText>
      ) : (
        visible.map((period) => <PeriodHistoryItem key={period.start} period={period} />)
      )}

      {hasMore && onShowMore && (
        <Pressable accessibilityRole="button" onPress={onShowMore}>
          <ThemedText type="linkPrimary">Show More</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
});
