/** Persisted flow values shared by validation, logging and presentation. */
export const FLOW_LEVEL = {
  NONE: 'None',
  SPOTTING: 'Spotting',
  LIGHT: 'Light',
  MEDIUM: 'Medium',
  HEAVY: 'Heavy',
} as const;

export const FLOW_LEVELS = Object.values(FLOW_LEVEL);
export type FlowLevel = (typeof FLOW_LEVEL)[keyof typeof FLOW_LEVEL];
