import type { Period } from './types';

function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Average length in days of the given periods, rounded to one decimal.
 * Returns null when there are no periods.
 */
export function calculateAveragePeriodLength(periods: readonly Period[]): number | null {
  if (periods.length === 0) return null;
  const totalDays = periods.reduce((sum, period) => sum + period.days, 0);
  return roundToTenth(totalDays / periods.length);
}