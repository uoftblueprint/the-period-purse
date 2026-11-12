import { ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';

import { usePeriodHistory } from '../use-period-history';
import { PeriodHistoryList } from './period-history-list';

type PeriodHistoryProps = {
  limit?: number;
  onShowMore?: () => void;
};

/**
 * The period history widget. Loads stored logs and shows them with
 * PeriodHistoryList, plus loading and error states.
 */
export function PeriodHistory({ limit, onShowMore }: PeriodHistoryProps) {
  const { isLoading, error, periods } = usePeriodHistory();

  if (isLoading) return <ActivityIndicator accessibilityLabel="Loading period history" />;
  if (error) {
    return (
      <ThemedText type="small" themeColor="textSecondary">
        Couldn&apos;t load period history.
      </ThemedText>
    );
  }

  return <PeriodHistoryList periods={periods} limit={limit} onShowMore={onShowMore} />;
}
