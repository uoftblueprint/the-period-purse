import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { CalendarUtils } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MonthCalendar } from '@/components/month-calendar';
import { CalendarActionButton } from '@/components/calendar-action-button';
import { LoggingColors, type AppTheme } from '@/constants/theme';

import { getCalendarFlowMarks } from './calendar-flow-marks';
import { LoggingModal, type LoggingMode } from '../logging-modal';
import { useCalendarLogs } from './use-calendar-logs';
import { CALENDAR_LOG_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

export function CalendarLogScreen() {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // TODO: Replace the demo path here and in onNavigateToCalendar with the final
  // calendar route when the shared action is mounted in app-wide navigation.
  const isCalendarPage = usePathname() === '/logging-demo';
  const { days, loading, error, reload } = useCalendarLogs();
  const [selectedDate, setSelectedDate] = useState(() => CalendarUtils.getCalendarDateString(new Date()));
  const [previewDate, setPreviewDate] = useState<string | null>(null);
  const endPreview = useCallback(() => setPreviewDate(null), []);
  const displayedDate = previewDate ?? selectedDate;
  const [loggingMode, setLoggingMode] = useState<LoggingMode>(null);
  const openDay = useCallback((date: string) => {
    setPreviewDate(null);
    setSelectedDate(date);
    setLoggingMode('symptoms');
  }, []);
  useEffect(() => {
    if (!isCalendarPage) {
      setLoggingMode(null);
      setPreviewDate(null);
    }
  }, [isCalendarPage]);
  const markedDates = useMemo(() => getCalendarFlowMarks(days), [days]);
  const selected = days.find((day) => day.date === displayedDate);
  const [year, month, day] = displayedDate.split('-').map(Number);
  const dateLabel = new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <View style={[styles.screen, {
      backgroundColor: theme.colors.background,
      // TODO: Replace this padding with the final navigation inset when everything is integrated.
      paddingTop: Platform.OS === 'web' ? 96 : insets.top,
      paddingBottom: Platform.OS === 'web' ? 0 : insets.bottom,
    }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" accessibilityRole="header" style={styles.title}>Your calendar</Text>
        <Text variant="bodyMedium" style={styles.subtitle} accessibilityLiveRegion="polite">
          {dateLabel} · {selected?.flow ? `${selected.flow} flow` : 'No flow recorded'}
        </Text>
      </View>
      {loading && <ActivityIndicator size="small" color={LoggingColors.action} accessibilityLabel={CALENDAR_LOG_ACCESSIBILITY_TEXT.LOADING_FLOWS} />}
      {error && (
        <View style={styles.error}>
          <Text style={styles.subtitle}>Recorded flows couldn’t be loaded.</Text>
          <Button textColor={LoggingColors.option} onPress={reload}>Try again</Button>
        </View>
      )}
      <View style={styles.calendar}>
        <MonthCalendar
          onDayPress={openDay}
          onDayLongPress={setPreviewDate}
          onDayPreviewEnd={endPreview}
          selectedDate={displayedDate}
          markedDates={markedDates}
          theme={{ monthTextColor: LoggingColors.text, todayTextColor: LoggingColors.text }}
        />
      </View>
      {/* TODO: Move this shared action into the final app-wide bottom navigation.
          Remove this preview bar and its bottomBar/bottomBarSurface styles then. */}
      <View style={styles.bottomBar}>
        <View pointerEvents="none" style={[styles.bottomBarSurface, { backgroundColor: theme.colors.background }]} />
        <CalendarActionButton
          isCalendarPage={isCalendarPage}
          onNavigateToCalendar={() => router.navigate('/logging-demo')}
          onOpenLogging={() => setLoggingMode('choose')}
        />
      </View>
      {/* TODO: REMOVE BOTTOM TAB when current ios tabs are removed (for the sake of development)
          What this does is reduce the bottom tabs so you can see the current UI.
          Delete this entire compact row and its demoTabs/demoTab/demoTabLabel/activeTab
          styles when final navigation lands. Also remove the matching hidden-tab
          workaround in components/app-tabs.tsx. */}
      {Platform.OS !== 'web' && (
        <View style={styles.demoTabs} accessibilityRole="tablist">
          <Pressable accessibilityRole="tab" accessibilityLabel={CALENDAR_LOG_ACCESSIBILITY_TEXT.LEARN_TAB} onPress={() => router.navigate('/learn')} style={styles.demoTab}>
            <Text style={styles.demoTabLabel}>{CALENDAR_LOG_ACCESSIBILITY_TEXT.LEARN_TAB}</Text>
          </Pressable>
          <Pressable accessibilityRole="tab" accessibilityLabel={CALENDAR_LOG_ACCESSIBILITY_TEXT.SETTINGS_TAB} onPress={() => router.navigate('/settings')} style={styles.demoTab}>
            <Text style={styles.demoTabLabel}>{CALENDAR_LOG_ACCESSIBILITY_TEXT.SETTINGS_TAB}</Text>
          </Pressable>
          <Pressable accessibilityRole="tab" accessibilityLabel={CALENDAR_LOG_ACCESSIBILITY_TEXT.PRODUCTS_TAB} onPress={() => router.navigate('/product-grid')} style={styles.demoTab}>
            <Text style={styles.demoTabLabel}>{CALENDAR_LOG_ACCESSIBILITY_TEXT.PRODUCTS_TAB}</Text>
          </Pressable>
          <View accessible accessibilityRole="tab" accessibilityLabel={CALENDAR_LOG_ACCESSIBILITY_TEXT.LOG_UI_TAB} accessibilityState={{ selected: true }} style={styles.demoTab}>
            <Text style={[styles.demoTabLabel, styles.activeTab]}>{CALENDAR_LOG_ACCESSIBILITY_TEXT.LOG_UI_TAB}</Text>
          </View>
        </View>
      )}
      <LoggingModal
        mode={isCalendarPage ? loggingMode : null}
        initialDate={selectedDate}
        onClose={() => setLoggingMode(null)}
        onDaily={() => setLoggingMode('symptoms')}
        onPeriodDates={() => setLoggingMode('period-dates')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20, gap: 8 },
  title: { fontWeight: '600', color: LoggingColors.text },
  subtitle: { color: LoggingColors.text },
  error: { paddingHorizontal: 24, alignItems: 'flex-start' },
  calendar: { flex: 1, marginHorizontal: 16, overflow: 'hidden', backgroundColor: LoggingColors.surface },
  // TODO: Remove these preview-bar styles after the shared action moves to final navigation.
  bottomBar: { height: 80, alignItems: 'center' },
  bottomBarSurface: { position: 'absolute', top: 32, left: 0, right: 0, bottom: 0, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: LoggingColors.disabled },
  // TODO: Remove this compact demo navigation style group together with the row above.
  demoTabs: { flexDirection: 'row', justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: LoggingColors.disabled },
  demoTab: { flex: 1, height: 32, alignItems: 'center', justifyContent: 'center' },
  demoTabLabel: { fontSize: 11, color: LoggingColors.muted },
  activeTab: { fontWeight: '700', color: LoggingColors.text },
});
