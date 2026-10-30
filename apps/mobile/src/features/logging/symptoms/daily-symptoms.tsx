import { useImperativeHandle, useRef, useState, type ComponentRef, type Ref } from 'react';
import { Image } from 'expo-image';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';
import ArrowIcon from '@/assets/icons/logging/symptoms/arrow.svg';
import FlowIcon from '@/assets/icons/logging/symptoms/flow/flow-medium.svg';
import NotesIcon from '@/assets/icons/logging/symptoms/notes-lines.svg';
import { LoggingColors } from '@/constants/theme';

import { createDiscardConfirmation } from '../shared/discard-confirmation';
import { canLogSymptomDate, emptySymptomDraft, formatSymptomDate, hasSymptomChanges, shiftSymptomDate, toLocalDateKey } from './symptom-draft';
import { SymptomFlowPicker } from './symptom-flow-picker';
import { SymptomNotesInput } from './symptom-notes-input';
import { SymptomSection } from './symptom-section';

export type DailySymptomsHandle = { requestClose: () => void };
type Props = { initialDate: string; onClose: () => void; ref?: Ref<DailySymptomsHandle> };

/** Flow + Notes from legacy LogSymptomsScreen; all changes remain a local draft. */
export function DailySymptoms({ initialDate, onClose, ref }: Props) {
  const insets = useSafeAreaInsets();
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const [date, setDate] = useState(initialDate);
  // TODO: When data integration is in scope, initialize from the selected day's
  // stored record and compare edits against that record. This UI demo starts empty.
  const [draft, setDraft] = useState(emptySymptomDraft);
  const [flowExpanded, setFlowExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const confirmationRef = useRef<ReturnType<typeof createDiscardConfirmation> | null>(null);
  if (!confirmationRef.current) confirmationRef.current = createDiscardConfirmation(setConfirming);
  const confirmation = confirmationRef.current;
  const dirty = hasSymptomChanges(draft);
  const today = toLocalDateKey(new Date());

  function requestAction(action: () => void) {
    Keyboard.dismiss();
    confirmation.requestAction(action, dirty);
  }

  useImperativeHandle(ref, () => ({ requestClose: () => {
    Keyboard.dismiss();
    confirmation.requestClose(onClose, dirty);
  } }));

  function switchDate(direction: -1 | 1) {
    const next = shiftSymptomDate(date, direction);
    if (!canLogSymptomDate(next, today)) return;
    requestAction(() => {
      setDate(next);
      setDraft(emptySymptomDraft());
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close symptom logging" onPress={() => requestAction(onClose)} style={styles.iconButton}>
          <Image source={CloseIcon} tintColor={LoggingColors.text} contentFit="contain" style={styles.closeIcon} />
        </Pressable>
      </View>
      <View style={styles.dateHeader}>
        <DateArrow direction={-1} disabled={!canLogSymptomDate(shiftSymptomDate(date, -1), today)} onPress={() => switchDate(-1)} />
        <View style={styles.dateText}>
          <Text variant="bodyMedium" style={styles.subtitle}>Log your symptoms for:</Text>
          <Text variant="titleMedium" accessibilityRole="header" accessibilityLiveRegion="polite" style={styles.dateLabel}>{formatSymptomDate(date)}</Text>
        </View>
        <DateArrow direction={1} disabled={!canLogSymptomDate(shiftSymptomDate(date, 1), today)} onPress={() => switchDate(1)} />
      </View>
      <ScrollView ref={scroll} style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        <SymptomSection title="Flow" icon={FlowIcon} active={draft.flow !== null} expanded={flowExpanded} onToggle={() => setFlowExpanded((value) => !value)}>
          <SymptomFlowPicker value={draft.flow} onChange={(flow) => setDraft((current) => ({ ...current, flow }))} />
        </SymptomSection>
        <View style={styles.divider} />
        <SymptomSection title="Notes" icon={NotesIcon} active={draft.notes.trim().length > 0} expanded={notesExpanded} onToggle={() => setNotesExpanded((value) => !value)}>
          <SymptomNotesInput value={draft.notes} onChange={(notes) => setDraft((current) => ({ ...current, notes }))} onFocus={() => scroll.current?.scrollToEnd({ animated: true })} />
        </SymptomSection>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}>
        <Button
          mode="contained"
          disabled={!dirty}
          // TODO: Replace this dismiss-only demo action with persistence and
          // loading/error handling. Close only after a successful save.
          onPress={() => { Keyboard.dismiss(); onClose(); }}
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
    <Pressable accessibilityRole="button" accessibilityLabel={direction === -1 ? 'Previous day' : 'Next day'} disabled={disabled} accessibilityState={{ disabled }} onPress={onPress} style={styles.iconButton}>
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
  divider: { height: 2, backgroundColor: LoggingColors.disabled },
  footer: { paddingHorizontal: 28, paddingTop: 16 },
  saveButton: { borderRadius: 10 },
  saveContent: { minHeight: 44 },
});
