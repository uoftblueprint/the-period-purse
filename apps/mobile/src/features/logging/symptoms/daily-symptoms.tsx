import { useCallback, useImperativeHandle, useRef, useState, type ComponentRef, type Ref } from 'react';
import { Image } from 'expo-image';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';
import ArrowIcon from '@/assets/icons/logging/symptoms/arrow.svg';
import FlowIcon from '@/assets/icons/logging/symptoms/flow/flow-medium.svg';
import NotesIcon from '@/assets/icons/logging/symptoms/notes-lines.svg';
import { LoggingColors } from '@/constants/theme';
import { useToday } from '@/hooks/use-today';
import { getLoggedDays, saveDay } from '@/features/daily-log';

import { createDiscardConfirmation } from '../shared/discard-confirmation/discard-confirmation';
import { canLogSymptomDate, emptySymptomDraft, formatSymptomDate, hasSymptomChanges, shiftSymptomDate, symptomDraftFromLog, type SymptomDraft } from './symptom-draft';
import { useLogLoad, useLogSubmission } from '../shared/use-logging-request';
import { SymptomFlowPicker } from './symptom-flow-picker';
import { SymptomNotesInput } from './symptom-notes-input';
import { SymptomSection } from './symptom-section';
import { LOGGING_STATUS_TEXT, SYMPTOMS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

export type DailySymptomsHandle = { requestClose: () => void };
type Props = { initialDate: string; onClose: () => void; ref?: Ref<DailySymptomsHandle> };

/** Edit a saved day's Flow + Notes; publish to the calendar only after Save. */
export function DailySymptoms({ initialDate, onClose, ref }: Props) {
  const insets = useSafeAreaInsets();
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const [date, setDate] = useState(initialDate);
  const loadRecord = useCallback(async () => symptomDraftFromLog(
    (await getLoggedDays()).find((day) => day.date === date),
  ), [date]);
  const { data: baseline, loading, error: loadError, reload } = useLogLoad(loadRecord);
  const { submitting, error: saveError, submit } = useLogSubmission();
  const [edits, setEdits] = useState<{ date: string; draft: SymptomDraft } | null>(null);
  const draft = edits?.date === date ? edits.draft : baseline ?? emptySymptomDraft();
  const busy = loading || loadError || submitting;
  function setDraft(update: (draft: SymptomDraft) => SymptomDraft) {
    setEdits((current) => ({ date, draft: update(current?.date === date ? current.draft : baseline ?? emptySymptomDraft()) }));
  }
  const [flowExpanded, setFlowExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const confirmationRef = useRef<ReturnType<typeof createDiscardConfirmation> | null>(null);
  if (!confirmationRef.current) confirmationRef.current = createDiscardConfirmation(setConfirming);
  const confirmation = confirmationRef.current;
  const dirty = !loading && !loadError && hasSymptomChanges(draft, baseline);
  const today = useToday();

  function requestAction(action: () => void) {
    if (submitting) return;
    Keyboard.dismiss();
    confirmation.requestAction(action, dirty);
  }

  useImperativeHandle(ref, () => ({ requestClose: () => {
    if (submitting) return;
    Keyboard.dismiss();
    confirmation.requestClose(onClose, dirty);
  } }));

  function switchDate(direction: -1 | 1) {
    const next = shiftSymptomDate(date, direction);
    if (busy || !canLogSymptomDate(next, today)) return;
    requestAction(() => {
      setDate(next);
      setEdits(null);
    });
  }

  async function save() {
    if (!dirty || busy) return;
    Keyboard.dismiss();
    if (await submit(() => saveDay({ date, flow: draft.flow, notes: draft.notes.trim() || null }))) onClose();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel={SYMPTOMS_ACCESSIBILITY_TEXT.CLOSE} disabled={submitting} accessibilityState={{ disabled: submitting }} onPress={() => requestAction(onClose)} style={styles.iconButton}>
          <Image source={CloseIcon} tintColor={LoggingColors.text} contentFit="contain" style={styles.closeIcon} />
        </Pressable>
      </View>
      <View style={styles.dateHeader}>
        <DateArrow direction={-1} disabled={busy || !canLogSymptomDate(shiftSymptomDate(date, -1), today)} onPress={() => switchDate(-1)} />
        <View style={styles.dateText}>
          <Text variant="bodyMedium" style={styles.subtitle}>Log your symptoms for:</Text>
          <Text variant="titleMedium" accessibilityRole="header" accessibilityLiveRegion="polite" style={styles.dateLabel}>{formatSymptomDate(date)}</Text>
        </View>
        <DateArrow direction={1} disabled={busy || !canLogSymptomDate(shiftSymptomDate(date, 1), today)} onPress={() => switchDate(1)} />
      </View>
      <ScrollView ref={scroll} style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        {loading ? <ActivityIndicator color={LoggingColors.action} accessibilityLabel={LOGGING_STATUS_TEXT.LOADING} /> : loadError ? (
          <View style={styles.loadError}>
            <Text accessibilityRole="alert" style={styles.subtitle}>{LOGGING_STATUS_TEXT.LOAD_ERROR}</Text>
            <Button onPress={reload}>{LOGGING_STATUS_TEXT.RETRY}</Button>
          </View>
        ) : <>
        <SymptomSection title={SYMPTOMS_ACCESSIBILITY_TEXT.FLOW_SECTION} icon={FlowIcon} active={draft.flow !== null} expanded={flowExpanded} onToggle={() => setFlowExpanded((value) => !value)}>
          <SymptomFlowPicker value={draft.flow} disabled={submitting} onChange={(flow) => setDraft((current) => ({ ...current, flow }))} />
        </SymptomSection>
        <View style={styles.divider} />
        <SymptomSection title={SYMPTOMS_ACCESSIBILITY_TEXT.NOTES_SECTION} icon={NotesIcon} active={draft.notes.trim().length > 0} expanded={notesExpanded} onToggle={() => setNotesExpanded((value) => !value)}>
          <SymptomNotesInput value={draft.notes} disabled={submitting} onChange={(notes) => setDraft((current) => ({ ...current, notes }))} onFocus={() => scroll.current?.scrollToEnd({ animated: true })} />
        </SymptomSection>
        </>}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}>
        {saveError && <Text accessibilityRole="alert" accessibilityLiveRegion="assertive" style={styles.subtitle}>{LOGGING_STATUS_TEXT.SAVE_ERROR}</Text>}
        <Button
          mode="contained"
          disabled={!dirty || busy}
          loading={submitting}
          onPress={save}
          style={styles.saveButton}
          contentStyle={styles.saveContent}>
          Save
        </Button>
      </View>
      <Portal>
        <Dialog visible={confirming} onDismiss={confirmation.keepEditing}>
          <Dialog.Title>Unsaved changes</Dialog.Title>
          <Dialog.Content><Text variant="bodyMedium">Your changes have not been saved. Discard them and continue?</Text></Dialog.Content>
          <Dialog.Actions>
            <Button onPress={confirmation.keepEditing}>Keep editing</Button>
            <Button onPress={confirmation.discard}>Discard</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
}

function DateArrow({ direction, disabled, onPress }: { direction: -1 | 1; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={direction === -1 ? SYMPTOMS_ACCESSIBILITY_TEXT.PREVIOUS_DAY : SYMPTOMS_ACCESSIBILITY_TEXT.NEXT_DAY} disabled={disabled} accessibilityState={{ disabled }} onPress={onPress} style={styles.iconButton}>
      <Image source={ArrowIcon} tintColor={disabled ? LoggingColors.flow.Light : LoggingColors.text} contentFit="contain" style={[styles.arrow, direction === 1 && styles.nextArrow]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: LoggingColors.surface },
  topBar: { paddingHorizontal: 12, alignItems: 'flex-start' },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  closeIcon: { width: 18, height: 18 },
  dateHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 30, backgroundColor: LoggingColors.surface },
  dateText: { flex: 1, alignItems: 'center', gap: 6 },
  subtitle: { color: LoggingColors.muted },
  dateLabel: { fontSize: 20, fontWeight: '600', color: LoggingColors.text, textAlign: 'center' },
  arrow: { width: 9, height: 16 },
  nextArrow: { transform: [{ rotate: '180deg' }] },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },
  loadError: { paddingHorizontal: 28, gap: 12 },
  divider: { height: 2, backgroundColor: LoggingColors.disabled },
  footer: { paddingHorizontal: 28, paddingTop: 16, gap: 12 },
  saveButton: { borderRadius: 10 },
  saveContent: { minHeight: 44 },
});
