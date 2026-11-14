import { canLogSymptomDate } from '../symptoms/symptom-draft';
import type { DailyLog } from '@/features/daily-log';
import { isFlowDay } from '@/features/periods';

export type PeriodDatesDraft = Record<string, { marked: boolean; originalMarked?: boolean }>;

export const emptyPeriodDatesDraft = (): PeriodDatesDraft => ({});

export function periodDatesDraftFromLogs(days: readonly DailyLog[]): PeriodDatesDraft {
  return Object.fromEntries(days.filter(isFlowDay).map((day) => [day.date, { marked: true, originalMarked: true }]));
}

export function getPeriodDateChanges(draft: PeriodDatesDraft) {
  const datesToMark: string[] = [];
  const datesToUnmark: string[] = [];
  for (const [date, value] of Object.entries(draft)) {
    if (value.marked && !value.originalMarked) datesToMark.push(date);
    if (!value.marked && value.originalMarked) datesToUnmark.push(date);
  }
  return { datesToMark, datesToUnmark };
}

export function hasSelectedPeriodDates(draft: PeriodDatesDraft): boolean {
  return Object.values(draft).some((date) => date.marked);
}

export function togglePeriodDate(draft: PeriodDatesDraft, date: string, today: string): PeriodDatesDraft {
  if (!canLogSymptomDate(date, today)) return draft;
  return { ...draft, [date]: { ...draft[date], marked: !draft[date]?.marked } };
}
