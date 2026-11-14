import { getPeriodAverages } from './get-period-averages';
import type { Period } from './types';

describe('getPeriodAverages', () => {
  const periods: Period[] = [
    { start: '2026-10-28', end: '2026-11-02', days: 6 },
    { start: '2026-09-30', end: '2026-10-04', days: 5 },
    { start: '2026-09-02', end: '2026-09-06', days: 5 },
  ];

  it('averages logged period lengths and start-date intervals', () => {
    expect(getPeriodAverages(periods)).toEqual({ periodLength: 5, cycleLength: 28 });
  });

  it('calculates a positive cycle length for the logged start dates', () => {
    expect(
      getPeriodAverages([
        { start: '2026-11-12', end: '2026-11-14', days: 3 },
        { start: '2026-11-01', end: '2026-11-03', days: 3 },
      ]).cycleLength,
    ).toBe(11);
  });

  it('uses the configured fallbacks when there is no history', () => {
    expect(getPeriodAverages([], 4, 30)).toEqual({ periodLength: 4, cycleLength: 30 });
  });

  it('uses the cycle fallback until two periods are available', () => {
    expect(getPeriodAverages(periods.slice(0, 1))).toEqual({ periodLength: 6, cycleLength: 28 });
  });
});