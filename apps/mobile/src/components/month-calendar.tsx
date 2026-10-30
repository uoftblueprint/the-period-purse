import { createContext, memo, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { CalendarList, type DateData } from 'react-native-calendars';
import { Button } from 'react-native-paper';

import { useToday } from '@/hooks/use-today';
import { FILTER_TEXT_COLOURS } from '@/services/utils/constants';

import { MONTH_CALENDAR_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

const FUTURE_MONTHS = 2;
const CALENDAR_HEIGHT = 420;

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
};

type DayContext = { today: string; selectedDate?: string; isFlowSelection: boolean };
const CalendarDayContext = createContext<DayContext | null>(null);
const monthKey = (month: { toString: (format: string) => string }) => month.toString('yyyy-MM');

const toMonthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year * 12 + month - 1;
};

export function MonthCalendar({ onDayPress, initialDate, pastMonths = 12, markedDates, selectedDate, markedDatesPurpose = 'recorded-flow', theme, dayComponent, renderHeader }: MonthCalendarProps) {
  const listRef = useRef<{
    scrollToMonth: (date: string) => void;
    scrollToDay: (date: string, offset: number, animated: boolean) => void;
  }>(null);
  const today = useToday();
  const [openingDate] = useState(() => initialDate ?? today);
  const scrollOffset = useRef<number | null>(null);
  const [width, setWidth] = useState(0);
  const rememberScrollOffset = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
  }, []);
  const dayContext = useMemo(() => ({
    today, selectedDate, isFlowSelection: markedDatesPurpose === 'flow-selection',
  }), [today, selectedDate, markedDatesPurpose]);
  const handleDayPress = useCallback((day: DateData) => onDayPress(day.dateString), [onDayPress]);

  // CalendarList measures its scroll ranges from the month it opens on,
  // so convert the limits (relative to today) into ranges around that month.
  const list = useMemo(() => {
    const requestedOffset = toMonthIndex(openingDate) - toMonthIndex(today);
    const inRange = requestedOffset >= -pastMonths && requestedOffset <= FUTURE_MONTHS;
    const offset = inRange ? requestedOffset : 0;
    return {
      current: inRange ? openingDate : today,
      pastScrollRange: pastMonths + offset,
      futureScrollRange: FUTURE_MONTHS - offset,
    };
  }, [openingDate, pastMonths, today]);

  const previousList = useRef(list);
  useLayoutEffect(() => {
    const previous = previousList.current;
    if (previous.current.slice(0, 7) !== list.current.slice(0, 7)) {
      // The previous anchor fell outside the available range.
      scrollOffset.current = null;
    } else if (previous.pastScrollRange !== list.pastScrollRange) {
      const previousOffset = scrollOffset.current ?? previous.pastScrollRange * CALENDAR_HEIGHT;
      // Keep the same month and fractional position visible when leading rows shift.
      // CalendarList's imperative API ignores an exact zero offset; use one pixel.
      const nextOffset = Math.max(1, previousOffset + (list.pastScrollRange - previous.pastScrollRange) * CALENDAR_HEIGHT);
      listRef.current?.scrollToDay(
        `${list.current.slice(0, 7)}-01`,
        nextOffset - list.pastScrollRange * CALENDAR_HEIGHT,
        false,
      );
      scrollOffset.current = nextOffset;
    }
    previousList.current = list;
  }, [list]);

  return (
    <CalendarDayContext.Provider value={dayContext}>
      <View style={styles.container} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
        <Button textColor={theme?.todayTextColor} onPress={() => listRef.current?.scrollToMonth(today)} style={styles.todayButton}>
          Today
        </Button>
        {width > 0 && <CalendarList
          // Keep month rows mounted across rollover; reset only if the anchor expires.
          key={list.current.slice(0, 7)}
          keyExtractor={monthKey}
          ref={listRef}
          current={list.current}
          pastScrollRange={list.pastScrollRange}
          futureScrollRange={list.futureScrollRange}
          maxDate={today}
          onDayPress={handleDayPress}
          calendarWidth={width}
          calendarHeight={CALENDAR_HEIGHT}
          onScrollBeginDrag={rememberScrollOffset}
          onScrollEndDrag={rememberScrollOffset}
          onMomentumScrollEnd={rememberScrollOffset}
          markedDates={markedDates}
          theme={theme}
          dayComponent={dayComponent ?? CalendarDay}
          renderHeader={renderHeader}
          animateScroll
        />}
      </View>
    </CalendarDayContext.Provider>
  );
}

// A stable component type prevents Calendar's dayComponent prop from remounting
// every cell when selection or today changes. Only changed visuals reach Day.
function CalendarDay(props: DayProps) {
  const context = useContext(CalendarDayContext);
  if (!context) return null;
  const { date, state, onPress, marking } = props;
  return <Day
    date={date}
    state={state}
    onPress={onPress}
    marking={marking}
    isToday={date?.dateString === context.today}
    isFuture={Boolean(date && date.dateString > context.today)}
    isSelected={date?.dateString === context.selectedDate}
    isFlowSelection={context.isFlowSelection}
  />;
}

const Day = memo(function Day({ date, state, onPress, marking, isSelected, isFlowSelection, isToday, isFuture }: DayProps & {
  isSelected: boolean; isFlowSelection: boolean; isToday: boolean; isFuture: boolean;
}) {
  const label = useMemo(() => date ? new Date(date.year, date.month - 1, date.day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }) : '', [date?.year, date?.month, date?.day]);
  if (!date) return null;

  const disabled = state === 'disabled' || isFuture;
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
        // Use the same date as the Today button and bounds, including test clocks.
        isToday && styles.today,
        isSelected && styles.selected,
      ]}>
      <Text style={[marking?.selected && { color: marking.selectedTextColor }, disabled && styles.disabledText]}>{date.day}</Text>
    </Pressable>
  );
});

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
