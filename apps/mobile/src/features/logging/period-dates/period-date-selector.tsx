import { useCallback, useImperativeHandle, useMemo, useRef, useState, type Ref } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckmarkIcon from '@/assets/icons/logging/period-dates/checkmark.svg';
import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';
import { MonthCalendar } from '@/components/month-calendar';
import { LoggingColors } from '@/constants/theme';

import { createDiscardConfirmation } from '../shared/discard-confirmation';
import { toLocalDateKey } from '../symptoms/symptom-draft';
import { emptyPeriodDatesDraft, hasSelectedPeriodDates, togglePeriodDate } from './period-dates-draft';
import { PERIOD_DATES_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

export type PeriodDateSelectorHandle = { requestClose: () => void };
type Props = { initialDate: string; onClose: () => void; ref?: Ref<PeriodDateSelectorHandle> };
/** Uses the shared calendar presentation; only the local marks and checkmark are specific to this flow. */
export function PeriodDateSelector({ initialDate, onClose, ref }: Props) {
  const insets = useSafeAreaInsets();
  const [markedDates, setMarkedDates] = useState(emptyPeriodDatesDraft);
  const handleDayPress = useCallback((date: string) => {
    setMarkedDates((draft) => togglePeriodDate(draft, date, toLocalDateKey(new Date())));
  }, []);
  const [confirming, setConfirming] = useState(false);
  const confirmation = useRef<ReturnType<typeof createDiscardConfirmation> | null>(null);
  if (!confirmation.current) confirmation.current = createDiscardConfirmation(setConfirming);
  const discard = confirmation.current;
  const dirty = hasSelectedPeriodDates(markedDates);
  const calendarMarks = useMemo(() => Object.fromEntries(
    Object.entries(markedDates)
      .filter(([, value]) => value.marked)
      .map(([date]) => [date, { selected: true, selectedColor: LoggingColors.action, selectedTextColor: LoggingColors.surface }]),
  ), [markedDates]);

  useImperativeHandle(ref, () => ({ requestClose: () => discard.requestClose(onClose, dirty) }));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel={PERIOD_DATES_ACCESSIBILITY_TEXT.CLOSE} onPress={() => discard.requestAction(onClose, dirty)} style={styles.closeButton}>
          <Image source={CloseIcon} tintColor={LoggingColors.text} contentFit="contain" style={styles.closeIcon} />
        </Pressable>
      </View>
      <View style={styles.heading}>
        <Text variant="titleLarge" accessibilityRole="header" style={styles.title}>Tap date to log period</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Select the dates that are part of your period.</Text>
      </View>
      <View style={styles.calendar}>
        <MonthCalendar
          initialDate={initialDate}
          markedDates={calendarMarks}
          markedDatesPurpose="flow-selection"
          onDayPress={handleDayPress}
        />
      </View>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 14 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={PERIOD_DATES_ACCESSIBILITY_TEXT.FINISH}
          accessibilityHint={PERIOD_DATES_ACCESSIBILITY_TEXT.FINISH_HINT}
          accessibilityState={{ disabled: !dirty }}
          disabled={!dirty}
          // TODO: Load stored period marks and differences against that baseline when
          // persistence will be done in ticket #21. For newly selected dates, set Flow Medium only
          // when flow is null/None; preserve other levels. Clear flow to null for
          // newly deselected dates, refresh the calendar and recalculate averages.
          onPress={onClose}
          style={[styles.checkmarkButton, !dirty && styles.disabledCheckmark]}>
          <Image source={CheckmarkIcon} contentFit="contain" style={styles.checkmarkIcon} />
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
  footer: { paddingTop: 14, paddingRight: 32, alignItems: 'flex-end' },
  checkmarkButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: LoggingColors.action, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  disabledCheckmark: { opacity: 0.4 },
  checkmarkIcon: { width: 23, height: 18 },
});
