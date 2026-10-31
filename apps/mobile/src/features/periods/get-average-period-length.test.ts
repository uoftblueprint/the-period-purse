import { calculateAveragePeriodLength } from './get-average-period-length';
import type { Period } from './types';

const period = (days: number): Period => ({ start: '2026-01-01', end: '2026-01-01', days });

describe('calculateAveragePeriodLength', () => {
  it('returns null when there are no periods', () => {
    expect(calculateAveragePeriodLength([])).toBeNull();
  });

  it('returns the length of a single period', () => {
    expect(calculateAveragePeriodLength([period(5)])).toBe(5);
  });

  it('averages several periods', () => {
    expect(calculateAveragePeriodLength([period(5), period(4), period(6)])).toBe(5);
  });

  it('rounds to one decimal place', () => {
    // (5 + 6 + 6) / 3 = 5.666…
    expect(calculateAveragePeriodLength([period(5), period(6), period(6)])).toBe(5.7);
  });
});