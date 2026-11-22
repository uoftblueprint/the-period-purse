import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import type { AppTheme } from '@/constants/theme';

import { SYMPTOMS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

type Props = { value: string; disabled?: boolean; onChange: (value: string) => void; onFocus: () => void };

/** Keep the growing native text area while applying Paper typography and colors. */
export function SymptomNotesInput({ value, disabled = false, onChange, onFocus }: Props) {
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(124);

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel={SYMPTOMS_ACCESSIBILITY_TEXT.NOTES_INPUT}
        accessibilityState={{ disabled }}
        editable={!disabled}
        multiline
        maxLength={500}
        value={value}
        onChangeText={(text) => onChange(text.slice(0, 500))}
        placeholder="Record a symptom or make a note"
        placeholderTextColor={theme.colors.outlineVariant}
        selectionColor={theme.colors.primary}
        cursorColor={theme.colors.onSurface}
        onContentSizeChange={(event) => setHeight(Math.max(124, Math.min(368, event.nativeEvent.contentSize.height)))}
        onFocus={() => { setFocused(true); onFocus(); }}
        onBlur={() => { setFocused(false); onChange(value.trim()); }}
        style={[styles.input, { height }, focused && styles.focused, disabled && styles.disabled]}
      />
      <Text variant="bodySmall" style={styles.counter}>{value.length}/500</Text>
    </View>
  );
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: { paddingHorizontal: theme.spacing.four, paddingVertical: theme.spacing.two, gap: theme.spacing.one },
  input: { ...theme.fonts.bodyMedium, minHeight: 124, maxHeight: 368, padding: theme.spacing.three, paddingTop: theme.spacing.three, borderRadius: theme.radii.lg, backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface, textAlignVertical: 'top', borderWidth: 1, borderColor: 'transparent' },
  focused: { borderColor: theme.colors.outline, backgroundColor: theme.colors.surface },
  disabled: { opacity: 0.4 },
  counter: { textAlign: 'right', color: theme.colors.outlineVariant },
});
