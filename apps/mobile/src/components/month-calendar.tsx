import { useCallback, useRef, useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarList, CalendarUtils, type DateData } from 'react-native-calendars';
import { Button } from 'react-native-paper';

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
  theme?: ComponentProps<typeof CalendarList>['theme'];
};

type DayProps = {
  date?: DateData;
  state?: string;
  onPress?: (date?: DateData) => void;
  marking?: { selected?: boolean; selectedColor?: string; selectedTextColor?: string };
  isSelected?: boolean;
};

const toMonthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year * 12 + month - 1;
};

export function MonthCalendar({ onDayPress, initialDate, pastMonths = 12, markedDates, selectedDate, theme }: MonthCalendarProps) {
  const listRef = useRef<{ scrollToMonth: (date: string) => void }>(null);
  const [today] = useState(() => CalendarUtils.getCalendarDateString(new Date()));
  const [width, setWidth] = useState(0);
  const renderDay = useCallback((props: DayProps) => (
    <Day {...props} isSelected={props.date?.dateString === selectedDate} />
  ), [selectedDate]);

  // CalendarList measures its scroll ranges from the month it opens on,
  // so convert the limits (relative to today) into ranges around that month.
  const [list] = useState(() => {
    const requestedOffset = initialDate ? toMonthIndex(initialDate) - toMonthIndex(today) : 0;
    const inRange = requestedOffset >= -pastMonths && requestedOffset <= FUTURE_MONTHS;
    const offset = inRange ? requestedOffset : 0;
    return {
      current: inRange && initialDate ? initialDate : today,
      pastScrollRange: pastMonths + offset,
      futureScrollRange: FUTURE_MONTHS - offset,
    };
  });

  return (
    <View style={styles.container} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <Button textColor={theme?.todayTextColor} onPress={() => listRef.current?.scrollToMonth(today)} style={styles.todayButton}>
        Today
      </Button>
      {width > 0 && <CalendarList
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
        dayComponent={renderDay}
        animateScroll
      />}
    </View>
  );
}

function Day({ date, state, onPress, marking, isSelected }: DayProps) {
  if (!date) return null;

  const disabled = state === 'disabled';
  const label = new Date(date.year, date.month - 1, date.day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={marking?.selected ? `${label}, recorded flow` : label}
      accessibilityState={{ disabled, selected: isSelected ?? false }}
      disabled={disabled}
      onPress={() => onPress?.(date)}
      style={[
        styles.day,
        marking?.selected && { backgroundColor: marking.selectedColor, borderRadius: 22 },
        state === 'today' && styles.today,
        isSelected && styles.selected,
      ]}>
      <Text style={[disabled && styles.disabled, marking?.selected && { color: marking.selectedTextColor }]}>{date.day}</Text>
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
  disabled: {
    opacity: 0.4,
  },
});
