import { getCalendarAction } from './calendar-action';

describe('calendar action button', () => {
  it('navigates to the calendar from another page without opening logging options', () => {
    const actions: string[] = [];
    const button = getCalendarAction(false, {
      onNavigateToCalendar: () => actions.push('navigate'),
      onOpenLogging: () => actions.push('logging'),
    });

    expect(button.icon).toBe('calendar');
    expect(button.accessibilityLabel).toBe('Go to calendar');
    button.onPress();
    expect(actions).toEqual(['navigate']);
  });

  it('shows plus and opens logging options only on the calendar page', () => {
    const actions: string[] = [];
    const button = getCalendarAction(true, {
      onNavigateToCalendar: () => actions.push('navigate'),
      onOpenLogging: () => actions.push('logging'),
    });

    expect(button.icon).toBe('plus');
    expect(button.accessibilityLabel).toBe('Add log');
    button.onPress();
    expect(actions).toEqual(['logging']);
  });
});
