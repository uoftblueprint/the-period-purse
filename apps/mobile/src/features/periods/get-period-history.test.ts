import type { DailyLog, FlowLevel } from '@/features/daily-log';

import { getPeriodHistory } from './get-period-history';

const flow = (date: string, level: FlowLevel | null = 'Medium'): DailyLog => ({ date, flow: level });

describe('getPeriodHistory', () => {
  it('returns [] for empty input', () => {
    expect(getPeriodHistory([])).toEqual([]);
  });

  it('handles a single-day period', () => {
    expect(getPeriodHistory([flow('2026-03-10')])).toEqual([
      { start: '2026-03-10', end: '2026-03-10', days: 1 },
    ]);
  });

  it('counts a spotting-only period', () => {
    const days = [flow('2026-03-10', 'Spotting'), flow('2026-03-11', 'Spotting')];
    expect(getPeriodHistory(days)).toEqual([{ start: '2026-03-10', end: '2026-03-11', days: 2 }]);
  });

  it('merges across a one-day gap', () => {
    const days = [flow('2026-03-10'), flow('2026-03-12')];
    expect(getPeriodHistory(days)).toEqual([{ start: '2026-03-10', end: '2026-03-12', days: 3 }]);
  });

  it('splits on a two-day gap', () => {
    const days = [flow('2026-03-10'), flow('2026-03-13')];
    expect(getPeriodHistory(days)).toEqual([
      { start: '2026-03-13', end: '2026-03-13', days: 1 },
      { start: '2026-03-10', end: '2026-03-10', days: 1 },
    ]);
  });

  it('returns a period spanning New Year exactly once', () => {
    const days = ['2025-12-30', '2025-12-31', '2026-01-01', '2026-01-02', '2026-01-03'].map((d) =>
      flow(d),
    );
    expect(getPeriodHistory(days)).toEqual([{ start: '2025-12-30', end: '2026-01-03', days: 5 }]);
  });

  it('gives the same result for unsorted input', () => {
    const sorted = [
      flow('2026-01-01'),
      flow('2026-01-02'),
      flow('2026-01-29'),
      flow('2026-01-30'),
      flow('2026-02-27'),
    ];
    const unsorted = [sorted[3], sorted[0], sorted[4], sorted[2], sorted[1]];
    expect(getPeriodHistory(unsorted)).toEqual(getPeriodHistory(sorted));
  });

  it('ignores "None" and null flow', () => {
    const days = [
      flow('2026-03-08', 'None'),
      flow('2026-03-09', null),
      { date: '2026-03-10' },
      flow('2026-03-11', 'Light'),
      flow('2026-03-14', 'None'),
    ];
    expect(getPeriodHistory(days)).toEqual([{ start: '2026-03-11', end: '2026-03-11', days: 1 }]);
  });

  it('treats "None" days as a gap that splits periods', () => {
    const days = [
      flow('2026-03-10'),
      flow('2026-03-11', 'None'),
      flow('2026-03-12', 'None'),
      flow('2026-03-13'),
    ];
    expect(getPeriodHistory(days)).toHaveLength(2);
  });

  it('counts days inclusively', () => {
    const days = ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05'].map((d) =>
      flow(d),
    );
    expect(getPeriodHistory(days)[0].days).toBe(5);
  });

  it('counts days inclusively across a month boundary', () => {
    const days = [flow('2026-02-27'), flow('2026-03-02')];
    expect(getPeriodHistory(days)).toHaveLength(2);
    expect(getPeriodHistory([flow('2026-02-28'), flow('2026-03-01')])[0].days).toBe(2);
  });

  it('returns periods newest first', () => {
    const days = [flow('2025-11-01'), flow('2026-01-01'), flow('2025-12-01')];
    expect(getPeriodHistory(days).map((p) => p.start)).toEqual([
      '2026-01-01',
      '2025-12-01',
      '2025-11-01',
    ]);
  });

  it('ends an ongoing period at its latest logged flow day', () => {
    const days = [flow('2026-10-24'), flow('2026-10-25')];
    expect(getPeriodHistory(days)[0]).toEqual({ start: '2026-10-24', end: '2026-10-25', days: 2 });
  });

  it('does not mutate its input', () => {
    const days = [flow('2026-01-03'), flow('2026-01-01')];
    const snapshot = structuredClone(days);
    getPeriodHistory(days);
    expect(days).toEqual(snapshot);
  });

  it('ignores duplicate entries for the same date', () => {
    const days = [flow('2026-01-01'), flow('2026-01-01', 'Heavy')];
    expect(getPeriodHistory(days)).toEqual([{ start: '2026-01-01', end: '2026-01-01', days: 1 }]);
  });
});
