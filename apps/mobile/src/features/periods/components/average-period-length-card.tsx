import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { InfoCard } from '@/components/ui/info-card';

import { calculateAveragePeriodLength } from '../get-average-period-length';
import { usePeriodHistory } from '../use-period-history';

export function AveragePeriodLengthCard() {
  const { isLoading, error, periods } = usePeriodHistory();

  // useMemo recomputes only when `periods` changes, not on every render
  const average = useMemo(() => calculateAveragePeriodLength(periods), [periods]);

  return (
    <InfoCard header="Average period length">
      {isLoading ? (
        <ActivityIndicator accessibilityLabel="Loading average period length" />
      ) : error ? (
        <ThemedText type="small" themeColor="textSecondary">
          Couldn&apos;t load your average.
        </ThemedText>
      ) : average === null ? (
        <ThemedText type="small" themeColor="textSecondary">
          Please start logging to learn more.
        </ThemedText>
      ) : (
        <ThemedText type="subtitle" style={styles.value}>
          {average} {average === 1 ? 'day' : 'days'}
        </ThemedText>
      )}
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  // `subtitle` is 32px, which is large for a half-width card; scale it down.
  value: { fontSize: 24, lineHeight: 32 },
});