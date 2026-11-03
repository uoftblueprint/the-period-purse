import { canLogSymptomDate, emptySymptomDraft, formatSymptomDate, hasSymptomChanges, shiftSymptomDate, symptomDraftFromLog, toLocalDateKey } from './symptom-draft';

describe('symptom logging date navigation', () => {
  it('uses the local calendar date without mutating the supplied Date', () => {
    const date = new Date(2026, 0, 1, 0, 15);
    const timestamp = date.getTime();
    expect(toLocalDateKey(date)).toBe('2026-01-01');
    expect(date.getTime()).toBe(timestamp);
  });

  it.each([
    ['2026-01-01', -1, '2025-12-31'],
    ['2024-02-28', 1, '2024-02-29'],
    ['2024-02-29', 1, '2024-03-01'],
    ['2026-03-08', 1, '2026-03-09'],
    ['2026-11-01', -1, '2026-10-31'],
  ] as const)('moves %s by %s day to %s', (date, direction, expected) => {
    expect(shiftSymptomDate(date, direction)).toBe(expected);
  });

  it('allows today and past days, and rejects future or invalid dates', () => {
    expect(canLogSymptomDate('2026-10-29', '2026-10-29')).toBe(true);
    expect(canLogSymptomDate('2026-10-28', '2026-10-29')).toBe(true);
    expect(canLogSymptomDate('2026-10-30', '2026-10-29')).toBe(false);
    expect(canLogSymptomDate('2026-02-30', '2026-10-29')).toBe(false);
    expect(canLogSymptomDate('0999-12-31', '2026-10-29')).toBe(false);
  });

  it('formats the date shown in the legacy heading', () => {
    expect(formatSymptomDate('2026-10-29')).toBe('October 29, 2026');
  });
});

describe('temporary symptom draft', () => {
  it('initializes editable flow and notes from a saved record', () => {
    expect(symptomDraftFromLog({ date: '2026-10-29', flow: 'Light', notes: 'A note' })).toEqual({ flow: 'Light', notes: 'A note' });
    expect(symptomDraftFromLog()).toEqual(emptySymptomDraft());
  });

  it('compares against the saved baseline, including clearing and reverting', () => {
    const baseline = { flow: 'Heavy' as const, notes: 'A note' };
    expect(hasSymptomChanges({ ...baseline }, baseline)).toBe(false);
    expect(hasSymptomChanges(emptySymptomDraft(), baseline)).toBe(true);
    expect(hasSymptomChanges({ ...baseline, notes: 'Edited' }, baseline)).toBe(true);
    expect(hasSymptomChanges({ ...baseline, notes: ' A note  ' }, baseline)).toBe(false);
  });

  it('starts empty, with whitespace-only notes leaving Save disabled', () => {
    expect(hasSymptomChanges(emptySymptomDraft())).toBe(false);
    expect(hasSymptomChanges({ flow: null, notes: '  \n ' })).toBe(false);
  });

  it('treats None as an explicit flow choice and enables notes-only drafts', () => {
    expect(hasSymptomChanges({ flow: 'None', notes: '' })).toBe(true);
    expect(hasSymptomChanges({ flow: 'Light', notes: '' })).toBe(true);
    expect(hasSymptomChanges({ flow: null, notes: 'A note' })).toBe(true);
  });

  it('does not carry edits into the next empty draft', () => {
    const first = emptySymptomDraft();
    first.flow = 'Heavy';
    first.notes = 'Temporary';
    expect(emptySymptomDraft()).toEqual({ flow: null, notes: '' });
  });
});
