import { emptyPeriodDatesDraft, hasSelectedPeriodDates, togglePeriodDate } from './period-dates-draft';

describe('temporary period date selection', () => {
  const today = '2026-10-29';

  it('starts empty and leaves completion disabled', () => {
    expect(emptyPeriodDatesDraft()).toEqual({});
    expect(hasSelectedPeriodDates(emptyPeriodDatesDraft())).toBe(false);
  });

  it('toggles arbitrary dates independently without filling a range or mutating the draft', () => {
    const empty = emptyPeriodDatesDraft();
    const first = togglePeriodDate(empty, '2026-10-20', today);
    const second = togglePeriodDate(first, '2026-10-25', today);
    const deselected = togglePeriodDate(second, '2026-10-20', today);

    expect(empty).toEqual({});
    expect(first).toEqual({ '2026-10-20': { marked: true } });
    expect(Object.keys(second)).toEqual(['2026-10-20', '2026-10-25']);
    expect(deselected['2026-10-20'].marked).toBe(false);
    expect(deselected['2026-10-25'].marked).toBe(true);
    expect(hasSelectedPeriodDates(deselected)).toBe(true);
    expect(hasSelectedPeriodDates(togglePeriodDate(deselected, '2026-10-25', today))).toBe(false);
  });

  it('allows today and a real leap day', () => {
    expect(togglePeriodDate({}, today, today)[today].marked).toBe(true);
    expect(togglePeriodDate({}, '2024-02-29', today)['2024-02-29'].marked).toBe(true);
  });

  it.each(['2026-10-30', '2026-02-29', '2026-02-30', '2026-13-01', '2026-10-00', '2026-1-01', '0999-12-31', 'invalid'])('rejects future or invalid date %s', (date) => {
    const draft = emptyPeriodDatesDraft();
    expect(togglePeriodDate(draft, date, today)).toBe(draft);
  });
});
