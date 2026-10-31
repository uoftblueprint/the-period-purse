import { canLogSymptomDate } from '../symptoms/symptom-draft';

export type PeriodDatesDraft = Record<string, { marked: boolean }>;

export const emptyPeriodDatesDraft = (): PeriodDatesDraft => ({});

export function hasSelectedPeriodDates(draft: PeriodDatesDraft): boolean {
  return Object.values(draft).some((date) => date.marked);
}

export function togglePeriodDate(draft: PeriodDatesDraft, date: string, today: string): PeriodDatesDraft {
  if (!canLogSymptomDate(date, today)) return draft;
  return { ...draft, [date]: { marked: !draft[date]?.marked } };
}
