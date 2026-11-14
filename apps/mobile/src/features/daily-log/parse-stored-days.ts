import { z } from 'zod';

import { DailyLogSchema, type DailyLog } from './types';

export type StoredDays = Record<string, DailyLog>;

const StoredDaySchema = DailyLogSchema.loose();

const StoredObjectSchema = z.record(z.string(), z.unknown());

/**
 * Parses the stored daily log. Data is only on this device and the user can't
 * repair it, so nothing here throws:
 * - missing, invalid JSON, or not an object: no days
 * - a day that isn't an object with a YYYY-MM-DD date matching its key: dropped
 * - a field with an invalid value: removed, the rest of the day kept
 */
export function parseStoredDays(raw: string | null): StoredDays {
  if (!raw) return {};
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return {};
  }
  const stored = StoredObjectSchema.safeParse(json);
  if (!stored.success) return {};

  const days: StoredDays = {};
  for (const [date, value] of Object.entries(stored.data)) {
    const day = StoredDaySchema.safeParse(value);
    if (day.success && day.data.date === date) days[date] = day.data;
  }
  return days;
}
