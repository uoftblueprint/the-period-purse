import { FILTER_COLOURS, FILTER_TEXT_COLOURS } from '@/services/utils/constants';
import type { DailyLog } from '@/features/daily-log';

type FlowMark = { selected: true; selectedColor: string; selectedTextColor: string };

/** Presentation of existing flow records only. Never creates or changes a record. */
export function getCalendarFlowMarks(days: readonly DailyLog[]): Record<string, FlowMark> {
  const marks: Record<string, FlowMark> = {};
  for (const day of days) {
    if (day.flow == null) continue;
    const flowKey = day.flow.toUpperCase() as keyof typeof FILTER_COLOURS.FLOW;
    marks[day.date] = {
      selected: true,
      selectedColor: FILTER_COLOURS.FLOW[flowKey],
      selectedTextColor: FILTER_TEXT_COLOURS.FLOW[flowKey],
    };
  }
  return marks;
}
