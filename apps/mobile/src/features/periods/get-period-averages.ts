import type { Period } from './types';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dayNumber(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day) / MS_PER_DAY;
}

export function getPeriodAverages(
  periods: readonly Period[],
  fallbackPeriodLength = 5,
  fallbackCycleLength = 28,
  options: { excludeLatestPeriod?: boolean } = {},
): { periodLength: number; cycleLength: number } {
  const periodLengths = options.excludeLatestPeriod ? periods.slice(1) : periods;
  if (periods.length === 0) {
    return { periodLength: fallbackPeriodLength, cycleLength: fallbackCycleLength };
  }

  const periodLength = periodLengths.length
    ? Math.round(periodLengths.reduce((total, period) => total + period.days, 0) / periodLengths.length)
    : fallbackPeriodLength;
  const cycleLengths = periods.slice(1).map((period, index) =>
    dayNumber(periods[index].start) - dayNumber(period.start),
  );
  const cycleLength = cycleLengths.length
    ? Math.round(cycleLengths.reduce((total, length) => total + length, 0) / cycleLengths.length)
    : fallbackCycleLength;

  return { periodLength, cycleLength };
}