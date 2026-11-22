import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { FlowIcon } from '@/components/flow-icon';
import type { AppTheme } from '@/constants/theme';
import { FLOW_LEVEL, type FlowLevel } from '@/features/daily-log';

import { SYMPTOMS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

const options = [
  { value: FLOW_LEVEL.LIGHT, color: 'flowLight' },
  { value: FLOW_LEVEL.MEDIUM, color: 'flowMedium' },
  { value: FLOW_LEVEL.HEAVY, color: 'flowHeavy' },
  { value: FLOW_LEVEL.SPOTTING, color: 'flowSpotting' },
  { value: FLOW_LEVEL.NONE, color: 'flowNone' },
] as const;

type Props = { value: FlowLevel | null; disabled?: boolean; onChange: (value: FlowLevel | null) => void };

/** Legacy OptionPicker's order, tile sizes, labels, and tap-again-to-clear behavior. */
export function SymptomFlowPicker({ value, disabled = false, onChange }: Props) {
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);
  return (
    <View style={styles.options}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <View key={option.value} style={styles.option}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${option.value} ${SYMPTOMS_ACCESSIBILITY_TEXT.FLOW_SUFFIX}`}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onChange(selected ? null : option.value)}
              style={({ pressed }) => [styles.tile, { backgroundColor: theme.colors[option.color] }, selected && styles.selected, disabled && styles.disabled, pressed && styles.pressed]}>
              <FlowIcon level={option.value} color={theme.colors.onSurface} />
            </Pressable>
            <Text variant="bodyMedium" style={styles.label}>{option.value}</Text>
          </View>
        );
      })}
    </View>
  );
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  options: { flexDirection: 'row', flexWrap: 'wrap', maxWidth: 327, alignSelf: 'center', paddingBottom: 10 },
  option: { width: 75, alignItems: 'center', marginHorizontal: 17, marginTop: 25, marginBottom: 30 },
  tile: { width: 75, height: 75, borderRadius: theme.radii.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: theme.colors.onSurface },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.65 },
  label: { marginTop: theme.spacing.two, color: theme.colors.onSurface, textAlign: 'center' },
});
