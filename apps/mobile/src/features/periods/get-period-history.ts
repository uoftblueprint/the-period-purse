import type { DailyLog } from '@/features/daily-log';

import type { Period } from './types';

/**
 * Number of consecutive no-flow days that ends a period. A shorter gap
 * stays within the same period.
 */
export const PERIOD_GAP_DAYS = 2;

/** True when the day has any flow. Spotting counts as flow. */
export function isFlowDay(day: DailyLog): boolean {
  return day.flow != null && day.flow !== 'None';
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Calendar days from `from` to `to` (Jan 1 → Jan 5 = 4). Date.UTC returns a
// plain number, so this is free of time zones and DST and never mutates a Date.
function daysBetween(from: string, to: string): number {
  const toDayNumber = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    return Date.UTC(year, month - 1, day) / MS_PER_DAY;
  };
  return toDayNumber(to) - toDayNumber(from);
}

function toPeriod(start: string, end: string): Period {
  return { start, end, days: daysBetween(start, end) + 1 };
}

/**
 * Groups logged flow days into periods, newest first. Days never logged
 * count as no flow. Input order doesn't matter and the input isn't mutated.
 */
export function getPeriodHistory(days: readonly DailyLog[]): Period[] {
  const flowDates = [...new Set(days.filter(isFlowDay).map((day) => day.date))].sort();
  if (flowDates.length === 0) return [];

  const periods: Period[] = [];
  let start = flowDates[0];
  let end = flowDates[0];

  for (const date of flowDates.slice(1)) {
    const noFlowDaysBetween = daysBetween(end, date) - 1;
    if (noFlowDaysBetween >= PERIOD_GAP_DAYS) {
      periods.push(toPeriod(start, end));
      start = date;
    }
    end = date;
  }
  periods.push(toPeriod(start, end));

  return periods.reverse();
}
