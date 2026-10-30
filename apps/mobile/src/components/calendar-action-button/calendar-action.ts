type CalendarActionHandlers = {
  onNavigateToCalendar: () => void;
  onOpenLogging: () => void;
};

/** Select the icon and action together so logging is only available on the calendar. */
export function getCalendarAction(isCalendarPage: boolean, handlers: CalendarActionHandlers) {
  return isCalendarPage
    ? { icon: 'plus' as const, accessibilityLabel: 'Add log', onPress: handlers.onOpenLogging }
    : { icon: 'calendar' as const, accessibilityLabel: 'Go to calendar', onPress: handlers.onNavigateToCalendar };
}
