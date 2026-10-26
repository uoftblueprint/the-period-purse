export type FlowLevel = 'None' | 'Spotting' | 'Light' | 'Medium' | 'Heavy';

/**
 * Everything logged for one calendar day. Other symptoms will be added here
 * as optional fields by later features.
 */
export type DailyLog = {
  /** Local calendar date as YYYY-MM-DD. */
  date: string;
  flow?: FlowLevel | null;
};
