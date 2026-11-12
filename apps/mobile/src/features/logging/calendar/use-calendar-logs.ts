import { useCallback, useEffect, useRef, useState } from 'react';

import { getLoggedDays, subscribeToDailyLog, type DailyLog } from '@/features/daily-log';

/** Read the app's existing daily logs; subscribe without writing any data. */
export function useCalendarLogs() {
  const [days, setDays] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const requestId = useRef(0);

  const reload = useCallback(() => {
    const request = ++requestId.current;
    setLoading(true);
    getLoggedDays().then(
      (loaded) => {
        if (request !== requestId.current) return;
        setDays(loaded);
        setError(false);
        setLoading(false);
      },
      () => {
        if (request !== requestId.current) return;
        setError(true);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    reload();
    const unsubscribe = subscribeToDailyLog(reload);
    return () => {
      ++requestId.current;
      unsubscribe();
    };
  }, [reload]);

  return { days, loading, error, reload };
}
