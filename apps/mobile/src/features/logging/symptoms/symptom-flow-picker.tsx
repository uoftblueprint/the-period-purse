import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FlowIcon } from '@/components/flow-icon';
import { LoggingColors } from '@/constants/theme';
import { FLOW_LEVEL, type FlowLevel } from '@/features/daily-log';

import { SYMPTOMS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

const options = [
  { value: FLOW_LEVEL.LIGHT },
  { value: FLOW_LEVEL.MEDIUM },
  { value: FLOW_LEVEL.HEAVY },
  { value: FLOW_LEVEL.SPOTTING },
  { value: FLOW_LEVEL.NONE },
] as const;

type Props = { value: FlowLevel | null; disabled?: boolean; onChange: (value: FlowLevel | null) => void };

/** Legacy OptionPicker's order, tile sizes, labels, and tap-again-to-clear behavior. */
export function SymptomFlowPicker({ value, disabled = false, onChange }: Props) {
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
              style={({ pressed }) => [styles.tile, selected && styles.selected, pressed && styles.pressed]}>
              <FlowIcon level={option.value} color={LoggingColors.text} />
            </Pressable>
            <Text variant="bodyMedium" style={styles.label}>{option.value}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { flexDirection: 'row', flexWrap: 'wrap', maxWidth: 327, alignSelf: 'center', paddingBottom: 10 },
  option: { width: 75, alignItems: 'center', marginHorizontal: 17, marginTop: 25, marginBottom: 30 },
  tile: { width: 75, height: 75, borderRadius: 16, backgroundColor: LoggingColors.disabled, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  selected: { backgroundColor: LoggingColors.flow.Light, borderColor: LoggingColors.text },
  pressed: { opacity: 0.65 },
  label: { marginTop: 10, color: LoggingColors.text, textAlign: 'center' },
});
