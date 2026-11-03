import { z } from 'zod';

import { FLOW_LEVELS } from './flow-levels';

export { FLOW_LEVEL, FLOW_LEVELS } from './flow-levels';
export type { FlowLevel } from './flow-levels';

/**
 * Everything logged for one calendar day. Other symptoms will be added here
 * as optional fields by later features. Each optional field ends in
 * `.catch(undefined)` so an invalid stored value is removed without dropping
 * the rest of the day.
 */
export const DailyLogSchema = z.object({
  /** Local calendar date as YYYY-MM-DD. */
  date: z.iso.date(),
  flow: z.enum(FLOW_LEVELS).nullable().optional().catch(undefined),
  notes: z.string().max(500).nullable().optional().catch(undefined),
});

export type DailyLog = z.infer<typeof DailyLogSchema>;
