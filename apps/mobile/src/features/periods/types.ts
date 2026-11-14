export type Period = {
  /** First flow day, YYYY-MM-DD. */
  start: string;
  /** Last flow day, YYYY-MM-DD. For an ongoing period, the latest logged flow day. */
  end: string;
  /** Length in days, counting both start and end. */
  days: number;
};
