import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import type { Period } from '../types';

type PeriodHistoryItemProps = {
  period: Period;
};

/** Formats a YYYY-MM-DD string for display, e.g. "Jan 5, 2026". */
function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function PeriodHistoryItem({ period }: PeriodHistoryItemProps) {
  return (
    <ThemedView>
      <ThemedText>
        {formatDate(period.start)} – {formatDate(period.end)}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {period.days}-day period
      </ThemedText>
    </ThemedView>
  );
}
