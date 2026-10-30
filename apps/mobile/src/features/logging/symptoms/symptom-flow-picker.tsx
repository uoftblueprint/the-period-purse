import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import LightIcon from '@/assets/icons/logging/symptoms/flow/flow-light.svg';
import MediumIcon from '@/assets/icons/logging/symptoms/flow/flow-medium.svg';
import HeavyIcon from '@/assets/icons/logging/symptoms/flow/flow-heavy.svg';
import SpottingIcon from '@/assets/icons/logging/symptoms/flow/flow-spotting.svg';
import NoneIcon from '@/assets/icons/logging/symptoms/flow/flow-none.svg';
import { LoggingColors } from '@/constants/theme';
import type { FlowLevel } from '@/features/daily-log';

const options = [
  { value: 'Light', icon: LightIcon },
  { value: 'Medium', icon: MediumIcon },
  { value: 'Heavy', icon: HeavyIcon },
  { value: 'Spotting', icon: SpottingIcon },
  { value: 'None', icon: NoneIcon },
] as const;

type Props = { value: FlowLevel | null; onChange: (value: FlowLevel | null) => void };

/** Legacy OptionPicker's order, tile sizes, labels, and tap-again-to-clear behavior. */
export function SymptomFlowPicker({ value, onChange }: Props) {
  return (
    <View style={styles.options}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <View key={option.value} style={styles.option}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${option.value} flow`}
              accessibilityState={{ selected }}
              onPress={() => onChange(selected ? null : option.value)}
              style={({ pressed }) => [styles.tile, selected && styles.selected, pressed && styles.pressed]}>
              <Image source={option.icon} tintColor={LoggingColors.text} contentFit="contain" style={styles.icon} />
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
  icon: { width: 32, height: 32 },
  label: { marginTop: 10, color: LoggingColors.text, textAlign: 'center' },
});
