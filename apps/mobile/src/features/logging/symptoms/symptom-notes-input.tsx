import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';

import { LoggingColors } from '@/constants/theme';

import { SYMPTOMS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

type Props = { value: string; onChange: (value: string) => void; onFocus: () => void };

/** Legacy TextArea behavior, with grayscale focused/blurred presentation. */
export function SymptomNotesInput({ value, onChange, onFocus }: Props) {
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(124);

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel={SYMPTOMS_ACCESSIBILITY_TEXT.NOTES_INPUT}
        multiline
        maxLength={500}
        value={value}
        onChangeText={(text) => onChange(text.slice(0, 500))}
        placeholder="Record a symptom or make a note"
        placeholderTextColor={LoggingColors.muted}
        selectionColor={LoggingColors.text}
        cursorColor={LoggingColors.text}
        onContentSizeChange={(event) => setHeight(Math.max(124, Math.min(368, event.nativeEvent.contentSize.height)))}
        onFocus={() => { setFocused(true); onFocus(); }}
        onBlur={() => { setFocused(false); onChange(value.trim()); }}
        style={[styles.input, { height }, focused && styles.focused]}
      />
      <Text variant="bodySmall" style={styles.counter}>{value.length}/500</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 10, gap: 4 },
  input: { minHeight: 124, maxHeight: 368, padding: 18, paddingTop: 18, borderRadius: 16, backgroundColor: LoggingColors.disabled, color: LoggingColors.text, fontSize: 14, lineHeight: 22, textAlignVertical: 'top', borderWidth: 1, borderColor: 'transparent' },
  focused: { borderColor: LoggingColors.text, backgroundColor: LoggingColors.flow.None },
  counter: { textAlign: 'right', color: LoggingColors.text },
});
