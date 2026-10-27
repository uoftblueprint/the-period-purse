import { getLoggedDays, saveDays, type DailyLog, type FlowLevel } from '@/features/daily-log';

import { isFlowDay } from './get-period-history';

const DEFAULT_FLOW: FlowLevel = 'Medium';

/**
 * Marks and unmarks period days in one save. Marking keeps an existing flow
 * level, or sets "Medium" if the day has none. Unmarking clears the flow and
 * keeps the day's other fields. Unmarking a day that was never logged does nothing.
 */
export async function logPeriodDates(
  datesToMark: readonly string[],
  datesToUnmark: readonly string[],
): Promise<void> {
  const existing = new Map((await getLoggedDays()).map((day) => [day.date, day]));
  const changed = new Map<string, DailyLog>();

  // saveDays merges, so only flow is sent and the day's other fields are kept.
  for (const date of datesToMark) {
    const day = existing.get(date);
    if (day && isFlowDay(day)) continue;
    changed.set(date, { date, flow: DEFAULT_FLOW });
  }

  for (const date of datesToUnmark) {
    if (!existing.has(date)) continue;
    changed.set(date, { date, flow: null });
  }

  await saveDays([...changed.values()]);
}
