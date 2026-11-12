import { useCallback, useImperativeHandle, useMemo, useRef, useState, type Ref } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckmarkIcon from '@/assets/icons/logging/period-dates/checkmark.svg';
import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';
import { MonthCalendar } from '@/components/month-calendar';
import { LoggingColors } from '@/constants/theme';
import { getLoggedDays } from '@/features/daily-log';
import { logPeriodDates } from '@/features/periods';

import { createDiscardConfirmation } from '../shared/discard-confirmation/discard-confirmation';
import { toLocalDateKey } from '../symptoms/symptom-draft';
import { useLogLoad, useLogSubmission } from '../shared/use-logging-request';
import { emptyPeriodDatesDraft, getPeriodDateChanges, periodDatesDraftFromLogs, togglePeriodDate, type PeriodDatesDraft } from './period-dates-draft';
import { LOGGING_STATUS_TEXT, PERIOD_DATES_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

export type PeriodDateSelectorHandle = { requestClose: () => void };
type Props = { initialDate: string; onClose: () => void; ref?: Ref<PeriodDateSelectorHandle> };
/** Edit the stored period baseline and persist only marked/unmarked differences. */
export function PeriodDateSelector({ initialDate, onClose, ref }: Props) {
  const insets = useSafeAreaInsets();
  const loadRecords = useCallback(async () => periodDatesDraftFromLogs(await getLoggedDays()), []);
  const { data: baseline, loading, error: loadError, reload } = useLogLoad(loadRecords);
  const { submitting, error: saveError, submit } = useLogSubmission();
  const [edits, setEdits] = useState<PeriodDatesDraft | null>(null);
  const markedDates = edits ?? baseline ?? emptyPeriodDatesDraft();
  const busy = loading || loadError || submitting;
  const handleDayPress = useCallback((date: string) => {
    if (busy) return;
    setEdits((draft) => togglePeriodDate(draft ?? baseline ?? {}, date, toLocalDateKey(new Date())));
  }, [baseline, busy]);
  const [confirming, setConfirming] = useState(false);
  const confirmation = useRef<ReturnType<typeof createDiscardConfirmation> | null>(null);
  if (!confirmation.current) confirmation.current = createDiscardConfirmation(setConfirming);
  const discard = confirmation.current;
  const changes = getPeriodDateChanges(markedDates);
  const dirty = !loading && !loadError && changes.datesToMark.length + changes.datesToUnmark.length > 0;
  const calendarMarks = useMemo(() => Object.fromEntries(
    Object.entries(markedDates)
      .filter(([, value]) => value.marked)
      .map(([date]) => [date, { selected: true, selectedColor: LoggingColors.action, selectedTextColor: LoggingColors.surface }]),
  ), [markedDates]);

  useImperativeHandle(ref, () => ({ requestClose: () => { if (!submitting) discard.requestClose(onClose, dirty); } }));

  async function save() {
    if (!dirty || busy) return;
    if (await submit(() => logPeriodDates(changes.datesToMark, changes.datesToUnmark))) onClose();
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel={PERIOD_DATES_ACCESSIBILITY_TEXT.CLOSE} disabled={submitting} accessibilityState={{ disabled: submitting }} onPress={() => discard.requestAction(onClose, dirty)} style={styles.closeButton}>
          <Image source={CloseIcon} tintColor={LoggingColors.text} contentFit="contain" style={styles.closeIcon} />
        </Pressable>
      </View>
      <View style={styles.heading}>
        <Text variant="titleLarge" accessibilityRole="header" style={styles.title}>Tap date to log period</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Selected dates will have their Flow level set to medium.</Text>
      </View>
      <View style={styles.calendar}>
        {loading ? <ActivityIndicator color={LoggingColors.action} accessibilityLabel={LOGGING_STATUS_TEXT.LOADING} /> : loadError ? (
          <View style={styles.loadError}>
            <Text accessibilityRole="alert" style={styles.subtitle}>{LOGGING_STATUS_TEXT.LOAD_ERROR}</Text>
            <Button onPress={reload}>{LOGGING_STATUS_TEXT.RETRY}</Button>
          </View>
        ) : <View style={styles.calendarContent} pointerEvents={submitting ? 'none' : 'auto'}>
        <MonthCalendar
          initialDate={initialDate}
          markedDates={calendarMarks}
          markedDatesPurpose="flow-selection"
          onDayPress={handleDayPress}
        />
        </View>}
      </View>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 14 }]}>
        {saveError && <Text accessibilityRole="alert" accessibilityLiveRegion="assertive" style={styles.subtitle}>{LOGGING_STATUS_TEXT.SAVE_ERROR}</Text>}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={PERIOD_DATES_ACCESSIBILITY_TEXT.FINISH}
          accessibilityHint={PERIOD_DATES_ACCESSIBILITY_TEXT.FINISH_HINT}
          accessibilityState={{ disabled: !dirty || busy, busy: submitting }}
          disabled={!dirty || busy}
          onPress={save}
          style={[styles.checkmarkButton, (!dirty || busy) && styles.disabledCheckmark]}>
          {submitting ? <ActivityIndicator color={LoggingColors.surface} /> : <Image source={CheckmarkIcon} contentFit="contain" style={styles.checkmarkIcon} />}
        </Pressable>
      </View>
      <Portal>
        <Dialog visible={confirming} onDismiss={discard.keepEditing}>
          <Dialog.Title>Unsaved changes</Dialog.Title>
          <Dialog.Content><Text variant="bodyMedium">Your changes have not been saved. Discard them and continue?</Text></Dialog.Content>
          <Dialog.Actions>
            <Button onPress={discard.keepEditing}>Keep editing</Button>
            <Button onPress={discard.discard}>Discard</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: LoggingColors.surface },
  topBar: { paddingHorizontal: 12, alignItems: 'flex-start' },
  closeButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  closeIcon: { width: 18, height: 18 },
  heading: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 14, alignItems: 'center', gap: 6 },
  title: { color: LoggingColors.text, fontSize: 20, fontWeight: '600', textAlign: 'center' },
  subtitle: { color: LoggingColors.muted, textAlign: 'center' },
  calendar: { flex: 1, paddingHorizontal: 8 },
  calendarContent: { flex: 1 },
  loadError: { padding: 20, gap: 12 },
  footer: { paddingTop: 14, paddingHorizontal: 32, alignItems: 'flex-end', gap: 12 },
  checkmarkButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: LoggingColors.action, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  disabledCheckmark: { opacity: 0.4 },
  checkmarkIcon: { width: 23, height: 18 },
});
