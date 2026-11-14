import { useEffect, useMemo, useState } from 'react';

import { getLoggedDays, subscribeToDailyLog, type DailyLog } from '@/features/daily-log';

import { getPeriodHistory } from './get-period-history';

/**
 * Loads logged days and derives period history. Reloads after any save to
 * the daily log.
 */
export function usePeriodHistory() {
  const [days, setDays] = useState<DailyLog[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    let latestRequest = 0;
    const load = () => {
      const request = ++latestRequest;
      getLoggedDays().then(
        (loaded) => {
          if (!active || request !== latestRequest) return;
          setDays(loaded);
          setError(null);
        },
        (reason: unknown) => {
          if (!active || request !== latestRequest) return;
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        },
      );
    };

    load();
    const unsubscribe = subscribeToDailyLog(load);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const periods = useMemo(() => (days ? getPeriodHistory(days) : []), [days]);

  return {
    isLoading: days === null && error === null,
    error,
    periods,
  };
}
