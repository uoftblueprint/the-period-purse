import { createContext, memo, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { CalendarList, type DateData } from 'react-native-calendars';
import { Button, useTheme, type MD3Theme } from 'react-native-paper';

import { theme as appTheme } from '@/constants/theme';
import { useToday } from '@/hooks/use-today';
import type { FlowLevel } from '@/features/daily-log';
import { FlowIcon } from './flow-icon';

import { MONTH_CALENDAR_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

const FUTURE_MONTHS = 2;
const CALENDAR_HEIGHT = 420;

type MonthCalendarProps = {
  /** Called with the tapped day as YYYY-MM-DD. */
  onDayPress: (date: string) => void;
  /** Preview a date without triggering its normal tap action. */
  onDayLongPress?: (date: string) => void;
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
  onLongPress?: (date?: DateData) => void;
  marking?: { selected?: boolean; selectedColor?: string; selectedTextColor?: string; flow?: FlowLevel };
};

type CalendarTheme = NonNullable<ComponentProps<typeof CalendarList>['theme']>;
type DayContext = { today: string; selectedDate?: string; isFlowSelection: boolean; canPreview: boolean };
const CalendarDayContext = createContext<DayContext | null>(null);
const monthKey = (month: { toString: (format: string) => string }) => month.toString('yyyy-MM');

const toMonthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year * 12 + month - 1;
};

export function MonthCalendar({ onDayPress, onDayLongPress, initialDate, pastMonths = 12, markedDates, selectedDate, markedDatesPurpose = 'recorded-flow', theme, dayComponent, renderHeader }: MonthCalendarProps) {
  const listRef = useRef<{
    scrollToMonth: (date: string) => void;
    scrollToDay: (date: string, offset: number, animated: boolean) => void;
  }>(null);
  const today = useToday();
  const paperTheme = useTheme();
  const calendarTheme = useMemo(() => ({ ...getCalendarTheme(paperTheme), ...theme }), [paperTheme, theme]);
  const [openingDate] = useState(() => initialDate ?? today);
  const scrollOffset = useRef<number | null>(null);
  const [width, setWidth] = useState(0);
  const rememberScrollOffset = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
  }, []);
  const dayContext = useMemo(() => ({
    today, selectedDate, isFlowSelection: markedDatesPurpose === 'flow-selection',
    canPreview: Boolean(onDayLongPress),
  }), [today, selectedDate, markedDatesPurpose, onDayLongPress]);
  const handleDayPress = useCallback((day: DateData) => onDayPress(day.dateString), [onDayPress]);
  const handleDayLongPress = useCallback((day: DateData) => onDayLongPress?.(day.dateString), [onDayLongPress]);

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
          onDayLongPress={handleDayLongPress}
          calendarWidth={width}
          calendarHeight={CALENDAR_HEIGHT}
          onScrollBeginDrag={rememberScrollOffset}
          onScrollEndDrag={rememberScrollOffset}
          onMomentumScrollEnd={rememberScrollOffset}
          markedDates={markedDates}
          theme={calendarTheme}
          dayComponent={dayComponent ?? CalendarDay}
          customHeader={renderHeader ? undefined : MonthHeader}
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
  const { date, state, onPress, onLongPress, marking } = props;
  return <Day
    date={date}
    state={state}
    onPress={onPress}
    onLongPress={context.canPreview ? onLongPress : undefined}
    marking={marking}
    isToday={date?.dateString === context.today}
    isFuture={Boolean(date && date.dateString > context.today)}
    isSelected={date?.dateString === context.selectedDate}
    isFlowSelection={context.isFlowSelection}
  />;
}

const Day = memo(function Day({ date, state, onPress, onLongPress, marking, isSelected, isFlowSelection, isToday, isFuture }: DayProps & {
  isSelected: boolean; isFlowSelection: boolean; isToday: boolean; isFuture: boolean;
}) {
  const theme = useTheme();
  const label = useMemo(() => date ? new Date(date.year, date.month - 1, date.day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }) : '', [date?.year, date?.month, date?.day]);
  if (!date) return null;

  const disabled = state === 'disabled' || isFuture;
  const markingLabel = isFlowSelection
    ? MONTH_CALENDAR_ACCESSIBILITY_TEXT.SELECTED_FLOW_DATE
    : `${marking?.flow ? `${marking.flow} ` : ''}${MONTH_CALENDAR_ACCESSIBILITY_TEXT.RECORDED_FLOW}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={marking?.selected ? `${label}, ${markingLabel}` : label}
      accessibilityHint={onLongPress ? MONTH_CALENDAR_ACCESSIBILITY_TEXT.PREVIEW_HINT : undefined}
      accessibilityState={{ disabled, selected: Boolean(isSelected || (isFlowSelection && marking?.selected)) }}
      disabled={disabled}
      onPress={() => onPress?.(date)}
      onLongPress={onLongPress ? () => onLongPress(date) : undefined}
      style={[
        styles.day,
        marking?.selected && { backgroundColor: marking.selectedColor },
        // Use the same date as the Today button and bounds, including test clocks.
        isToday && [styles.today, { borderColor: theme.colors.outline }],
        isSelected && [styles.selected, { borderColor: theme.colors.onSurface }],
      ]}>
      <Text style={[
        theme.fonts.labelMedium,
        { color: theme.colors.onSurface },
        marking?.selected && { color: marking.selectedTextColor },
        disabled && { color: theme.colors.outlineVariant },
      ]}>{date.day}</Text>
      {marking?.selected && marking.flow && <FlowIcon level={marking.flow} size={14} color={marking.selectedTextColor} />}
    </Pressable>
  );
});

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

function MonthHeader({ month }: { month: { toString: (format: string) => string } }) {
  const theme = useTheme();
  return (
    <View>
      <Text allowFontScaling={false} accessibilityRole="header" style={[theme.fonts.headlineMedium, styles.monthTitle, { color: theme.colors.onBackground }]}>
        {month.toString('MMMM yyyy')}
      </Text>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.weekdays, { backgroundColor: theme.colors.tertiary }]}>
        {WEEKDAY_NAMES.map((name) => (
          <Text allowFontScaling={false} numberOfLines={1} key={name} style={[theme.fonts.labelMedium, styles.weekday, { color: theme.colors.onSurface }]}>{name}</Text>
        ))}
      </View>
    </View>
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
    borderRadius: appTheme.radii.full,
  },
  today: { borderWidth: 1 },
  selected: { borderWidth: 2 },
  monthTitle: {
    marginTop: appTheme.spacing.two,
    marginBottom: appTheme.spacing.two,
    marginHorizontal: appTheme.spacing.one,
  },
  weekdays: {
    flexDirection: 'row',
    marginTop: appTheme.spacing.one,
    paddingTop: appTheme.spacing.three,
    paddingBottom: appTheme.spacing.two,
    borderTopLeftRadius: appTheme.radii.lg,
    borderTopRightRadius: appTheme.radii.lg,
  },
  // flex: 1 lines each label up with the day columns below.
  weekday: { flex: 1, textAlign: 'center' },
});

function getCalendarTheme({ colors }: MD3Theme): CalendarTheme {
  return {
    calendarBackground: 'transparent',
    weekVerticalMargin: appTheme.spacing.half,
    ...{
      'stylesheet.calendar.main': {
        monthView: {
          backgroundColor: colors.tertiary,
          paddingBottom: appTheme.spacing.three,
          borderBottomLeftRadius: appTheme.radii.lg,
          borderBottomRightRadius: appTheme.radii.lg,
        },
      },
    },
  };
}
