import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

function localDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** Refresh at local midnight and after suspension, including clock/timezone changes. */
export function watchLocalDate(onChange: (today: string) => void): () => void {
  let timer: ReturnType<typeof setTimeout>;
  const refresh = () => {
    clearTimeout(timer);
    const now = new Date();
    onChange(localDateKey(now));
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    timer = setTimeout(refresh, Math.max(1, midnight.getTime() - now.getTime()));
  };
  const subscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') refresh();
  });
  refresh();
  return () => {
    clearTimeout(timer);
    subscription.remove();
  };
}

export function useToday(): string {
  const [today, setToday] = useState(() => localDateKey(new Date()));
  useEffect(() => watchLocalDate(setToday), []);
  return today;
}
