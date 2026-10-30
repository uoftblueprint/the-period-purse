import { useCallback, useMemo, useRef, useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarList, type DateData } from 'react-native-calendars';
import { Button } from 'react-native-paper';

import { useToday } from '@/hooks/use-today';
import { FILTER_TEXT_COLOURS } from '@/services/utils/constants';

import { MONTH_CALENDAR_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

const FUTURE_MONTHS = 2;

type MonthCalendarProps = {
  /** Called with the tapped day as YYYY-MM-DD. */
  onDayPress: (date: string) => void;
  /** Month to open on, as YYYY-MM-DD. Read on mount; defaults to today. */
  initialDate?: string;
  /** How many months before today the user can scroll back. */
  pastMonths?: number;
  /** Optional presentation of existing logs; this component never saves a day. */
  markedDates?: ComponentProps<typeof CalendarList>['markedDates'];
  selectedDate?: string;
  /** Distinguish unsaved multi-date selections from existing flow records. */
  markedDatesPurpose?: 'recorded-flow' | 'flow-selection';
  theme?: ComponentProps<typeof CalendarList>['theme'];
  /** Optional rendering for temporary date-selection UIs. */
  dayComponent?: ComponentProps<typeof CalendarList>['dayComponent'];
  renderHeader?: ComponentProps<typeof CalendarList>['renderHeader'];
};

type DayProps = {
  date?: DateData;
  state?: string;
  onPress?: (date?: DateData) => void;
  marking?: { selected?: boolean; selectedColor?: string; selectedTextColor?: string };
  isSelected?: boolean;
  isFlowSelection?: boolean;
};

const toMonthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year * 12 + month - 1;
};

export function MonthCalendar({ onDayPress, initialDate, pastMonths = 12, markedDates, selectedDate, markedDatesPurpose = 'recorded-flow', theme, dayComponent, renderHeader }: MonthCalendarProps) {
  const listRef = useRef<{ scrollToMonth: (date: string) => void }>(null);
  const today = useToday();
  const [width, setWidth] = useState(0);
  const renderDay = useCallback((props: DayProps) => (
    <Day {...props} isSelected={props.date?.dateString === selectedDate} isFlowSelection={markedDatesPurpose === 'flow-selection'} />
  ), [selectedDate, markedDatesPurpose]);

  // CalendarList measures its scroll ranges from the month it opens on,
  // so convert the limits (relative to today) into ranges around that month.
  const list = useMemo(() => {
    const requestedOffset = initialDate ? toMonthIndex(initialDate) - toMonthIndex(today) : 0;
    const inRange = requestedOffset >= -pastMonths && requestedOffset <= FUTURE_MONTHS;
    const offset = inRange ? requestedOffset : 0;
    return {
      current: inRange && initialDate ? initialDate : today,
      pastScrollRange: pastMonths + offset,
      futureScrollRange: FUTURE_MONTHS - offset,
    };
  }, [initialDate, pastMonths, today]);

  return (
    <View style={styles.container} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <Button textColor={theme?.todayTextColor} onPress={() => listRef.current?.scrollToMonth(today)} style={styles.todayButton}>
        Today
      </Button>
      {width > 0 && <CalendarList
        // CalendarList keeps its initial month in a ref. Remount only when that
        // anchor month changes so refreshed bounds use the same month as the list.
        key={list.current.slice(0, 7)}
        ref={listRef}
        current={list.current}
        pastScrollRange={list.pastScrollRange}
        futureScrollRange={list.futureScrollRange}
        maxDate={today}
        onDayPress={(day) => onDayPress(day.dateString)}
        calendarWidth={width}
        calendarHeight={420}
        markedDates={markedDates}
        theme={theme}
        dayComponent={dayComponent ?? renderDay}
        renderHeader={renderHeader}
        animateScroll
      />}
    </View>
  );
}

function Day({ date, state, onPress, marking, isSelected, isFlowSelection }: DayProps) {
  if (!date) return null;

  const disabled = state === 'disabled';
  const label = new Date(date.year, date.month - 1, date.day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const markingLabel = isFlowSelection
    ? MONTH_CALENDAR_ACCESSIBILITY_TEXT.SELECTED_FLOW_DATE
    : MONTH_CALENDAR_ACCESSIBILITY_TEXT.RECORDED_FLOW;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={marking?.selected ? `${label}, ${markingLabel}` : label}
      accessibilityState={{ disabled, selected: Boolean(isSelected || (isFlowSelection && marking?.selected)) }}
      disabled={disabled}
      onPress={() => onPress?.(date)}
      style={[
        styles.day,
        marking?.selected && { backgroundColor: marking.selectedColor, borderRadius: 22 },
        state === 'today' && styles.today,
        isSelected && styles.selected,
      ]}>
      <Text style={[marking?.selected && { color: marking.selectedTextColor }, disabled && styles.disabledText]}>{date.day}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todayButton: {
    alignSelf: 'flex-end',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  today: {
    borderWidth: 1,
    borderRadius: 22,
  },
  selected: { borderWidth: 2, borderRadius: 22, borderColor: '#242424' },
  disabledText: {
    color: FILTER_TEXT_COLOURS.DISABLED,
  },
});
