export const MONTH_CALENDAR_ACCESSIBILITY_TEXT = {
  SELECTED_FLOW_DATE: 'Selected date for flow logging',
  RECORDED_FLOW: 'recorded flow',
  PREVIEW_HINT: 'Touch and hold to show the date and recorded flow.',
} as const;

export const CALENDAR_ACTION_ACCESSIBILITY_TEXT = {
  ADD_LOG: 'Add log',
  GO_TO_CALENDAR: 'Go to calendar',
} as const;

export const LOGGING_OPTIONS_ACCESSIBILITY_TEXT = {
  DISMISS: 'Dismiss logging options',
  CLOSE: 'Close logging options',
  DAILY_SYMPTOMS: 'Log daily symptoms',
  MULTIPLE_PERIOD_DATES: 'Log multiple period dates',
} as const;

export const SYMPTOMS_ACCESSIBILITY_TEXT = {
  CLOSE: 'Close symptom logging',
  PREVIOUS_DAY: 'Previous day',
  NEXT_DAY: 'Next day',
  FLOW_SECTION: 'Flow',
  NOTES_SECTION: 'Notes',
  NOTES_INPUT: 'Symptom notes',
  FLOW_SUFFIX: 'flow',
} as const;

export const PERIOD_DATES_ACCESSIBILITY_TEXT = {
  CLOSE: 'Close period date selection',
  FINISH: 'Save period date changes',
  FINISH_HINT: 'Saves the dates you selected or cleared.',
} as const;

export const LOGGING_STATUS_TEXT = {
  LOADING: 'Loading saved symptoms',
  LOAD_ERROR: 'Saved symptoms could not be loaded. Try again before editing.',
  SAVE_ERROR: 'Your changes could not be saved. Please try again.',
  RETRY: 'Try again',
} as const;

export const CALENDAR_LOG_ACCESSIBILITY_TEXT = {
  LOADING_FLOWS: 'Loading recorded flows',
  HOME_TAB: 'Home',
  EXPLORE_TAB: 'Explore',
  LOG_UI_TAB: 'Log UI',
} as const;
