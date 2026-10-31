import { CALENDAR_ACTION_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

type CalendarActionHandlers = {
  onNavigateToCalendar: () => void;
  onOpenLogging: () => void;
};

/** Select the icon and action together so logging is only available on the calendar. */
export function getCalendarAction(isCalendarPage: boolean, handlers: CalendarActionHandlers) {
  return isCalendarPage
    ? { icon: 'plus' as const, accessibilityLabel: CALENDAR_ACTION_ACCESSIBILITY_TEXT.ADD_LOG, onPress: handlers.onOpenLogging }
    : { icon: 'calendar' as const, accessibilityLabel: CALENDAR_ACTION_ACCESSIBILITY_TEXT.GO_TO_CALENDAR, onPress: handlers.onNavigateToCalendar };
}
