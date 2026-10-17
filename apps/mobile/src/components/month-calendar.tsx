import { useRef, useState } from 'react';
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
};

type DayProps = {
  date?: DateData;
  state?: string;
  onPress?: (date?: DateData) => void;
};

const toMonthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year * 12 + month - 1;
};

export function MonthCalendar({ onDayPress, initialDate, pastMonths = 12 }: MonthCalendarProps) {
  const listRef = useRef<{ scrollToMonth: (date: string) => void }>(null);
  const [today] = useState(() => CalendarUtils.getCalendarDateString(new Date()));

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
    <View style={styles.container}>
      <Button onPress={() => listRef.current?.scrollToMonth(today)} style={styles.todayButton}>
        Today
      </Button>
      <CalendarList
        ref={listRef}
        current={list.current}
        pastScrollRange={list.pastScrollRange}
        futureScrollRange={list.futureScrollRange}
        maxDate={today}
        onDayPress={(day) => onDayPress(day.dateString)}
        dayComponent={Day}
        animateScroll
      />
    </View>
  );
}

function Day({ date, state, onPress }: DayProps) {
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
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => onPress?.(date)}
      style={[styles.day, state === 'today' && styles.today]}>
      <Text style={disabled && styles.disabled}>{date.day}</Text>
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
  disabled: {
    opacity: 0.4,
  },
});
