import { LoggingColors } from '@/constants/theme';
import type { DailyLog } from '@/features/daily-log';

type FlowMark = { selected: true; selectedColor: string; selectedTextColor: string };

/** Presentation of existing flow records only. Never creates or changes a record. */
export function getCalendarFlowMarks(days: readonly DailyLog[]): Record<string, FlowMark> {
  const marks: Record<string, FlowMark> = {};
  for (const day of days) {
    if (day.flow == null || day.flow === 'None') continue;
    marks[day.date] = {
      selected: true,
      selectedColor: LoggingColors.flow[day.flow],
      selectedTextColor: day.flow === 'Heavy' ? '#FFFFFF' : LoggingColors.text,
    };
  }
  return marks;
}
