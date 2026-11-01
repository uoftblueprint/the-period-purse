import AsyncStorage from '@react-native-async-storage/async-storage';

import { parseStoredDays, type StoredDays } from './parse-stored-days';
import type { DailyLog } from './types';

// The only module that touches AsyncStorage for logged days.
// Stored shape: a JSON object of DailyLog keyed by date.
export const DAILY_LOG_STORAGE_KEY = 'dailyLog:days:v1';

const listeners = new Set<() => void>();

// Serializes writes so concurrent saves can't overwrite each other's days.
let writeQueue: Promise<void> = Promise.resolve();

async function readStoredDays(): Promise<StoredDays> {
  return parseStoredDays(await AsyncStorage.getItem(DAILY_LOG_STORAGE_KEY));
}

/** All logged days, sorted oldest first. */
export async function getLoggedDays(): Promise<DailyLog[]> {
  const stored = await readStoredDays();
  return Object.values(stored).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Saves days, merging each into any existing entry for the same date, so
 * fields not passed are kept. To clear a field, set it to null.
 */
export function saveDays(days: readonly DailyLog[]): Promise<void> {
  const write = writeQueue.then(async () => {
    if (days.length === 0) return;
    const stored = await readStoredDays();
    const next = { ...stored };
    for (const day of days) {
      next[day.date] = { ...next[day.date], ...day };
    }
    await AsyncStorage.setItem(DAILY_LOG_STORAGE_KEY, JSON.stringify(next));
    listeners.forEach((listener) => listener());
  });
  // Keep the queue alive if this write fails; the caller still sees the error.
  writeQueue = write.catch(() => {});
  return write;
}

/** Saves one day, merging it into any existing entry for that date. */
export function saveDay(day: DailyLog): Promise<void> {
  return saveDays([day]);
}

/** Calls `listener` after every successful save. Returns an unsubscribe function. */
export function subscribeToDailyLog(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
