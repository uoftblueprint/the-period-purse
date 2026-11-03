import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image, type ImageProps } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoggingColors } from '@/constants/theme';
import BloodDropIcon from '@/assets/icons/logging/launcher/blood_drop.svg';
import PeriodDatesIcon from '@/assets/icons/logging/launcher/calendar_icon_multiple_dates.svg';
import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';

import { LOGGING_OPTIONS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

type Props = { onClose: () => void; onDaily: () => void; onPeriodDates: () => void };

/** Legacy SelectLogOptionOverlay layout; each option opens its own UI-only form. */
export function LoggingOptionsOverlay({ onClose, onDaily, onPeriodDates }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <Pressable
        style={StyleSheet.absoluteFill}
        accessibilityRole="button"
        accessibilityLabel={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.DISMISS}
        onPress={onClose}
      />
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}>
        <Text variant="titleLarge" accessibilityRole="header" style={styles.heading}>What would you like to log?</Text>
        <View style={styles.choices}>
          <Option title={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.DAILY_SYMPTOMS} icon={BloodDropIcon} onPress={onDaily} />
          <Option title={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.MULTIPLE_PERIOD_DATES} icon={PeriodDatesIcon} onPress={onPeriodDates} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.CLOSE}
          onPress={onClose}
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
          <Image source={CloseIcon} accessible={false} tintColor={LoggingColors.text} contentFit="contain" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

function Option({ title, icon, onPress }: {
  title: string; icon: NonNullable<ImageProps['source']>; onPress: () => void;
}) {
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
      <Text variant="bodyMedium" style={styles.optionTitle}>{title}</Text>
      <View style={styles.iconCircle}>
        <Image source={icon} tintColor={LoggingColors.surface} contentFit="contain" style={styles.icon} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.96)', justifyContent: 'flex-end' },
  content: { alignItems: 'center', paddingHorizontal: 20, gap: 32 },
  heading: { textAlign: 'center', color: LoggingColors.text },
  choices: { flexDirection: 'row', justifyContent: 'center', gap: 24, width: '100%', maxWidth: 380 },
  option: { flex: 1, alignItems: 'center', maxWidth: 150, gap: 12 },
  optionTitle: { textAlign: 'center', color: LoggingColors.text, minHeight: 42 },
  iconCircle: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: LoggingColors.option },
  icon: { width: 28, height: 32 },
  closeButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: LoggingColors.surface, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.65 },
});
