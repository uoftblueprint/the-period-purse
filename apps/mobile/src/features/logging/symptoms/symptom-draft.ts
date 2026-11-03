import type { FlowLevel } from '@/features/daily-log';

export type SymptomDraft = { flow: FlowLevel | null; notes: string };

export const emptySymptomDraft = (): SymptomDraft => ({ flow: null, notes: '' });

export function hasSymptomChanges(draft: SymptomDraft): boolean {
  return draft.flow !== null || draft.notes.trim().length > 0;
}

export function toLocalDateKey(date: Date): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((value, index) => String(value).padStart(index === 0 ? 4 : 2, '0'))
    .join('-');
}

function fromLocalDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

/** Always change a fresh Date; the legacy screen mutated selectedDate in place. */
export function shiftSymptomDate(key: string, direction: -1 | 1): string {
  const next = fromLocalDateKey(key);
  next.setDate(next.getDate() + direction);
  return toLocalDateKey(next);
}

export function canLogSymptomDate(key: string, today: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(key)
    && key >= '1000-01-01'
    && key <= today
    && toLocalDateKey(fromLocalDateKey(key)) === key;
}

export function formatSymptomDate(key: string): string {
  return fromLocalDateKey(key).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}
