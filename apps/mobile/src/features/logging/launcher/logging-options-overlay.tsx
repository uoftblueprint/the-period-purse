import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image, type ImageProps } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoggingColors } from '@/constants/theme';
import BloodDropIcon from '@/assets/icons/logging/launcher/blood_drop.svg';
import PeriodDatesIcon from '@/assets/icons/logging/launcher/calendar_icon_multiple_dates.svg';
import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';

type Props = { onClose: () => void; onDaily: () => void };

/** Legacy SelectLogOptionOverlay layout. Period-date logging remains deferred. */
export function LoggingOptionsOverlay({ onClose, onDaily }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <Pressable
        style={StyleSheet.absoluteFill}
        accessibilityRole="button"
        accessibilityLabel="Dismiss logging options"
        onPress={onClose}
      />
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) + 24 }]}>
        <Text variant="titleLarge" accessibilityRole="header" style={styles.heading}>What would you like to log?</Text>
        <View style={styles.choices}>
          <Option title="Log daily symptoms" icon={BloodDropIcon} onPress={onDaily} />
          {/* TODO: Replace the disabled placeholder and "Coming later" label with
              period-date navigation when that deferred UI is implemented. */}
          <Option title="Log multiple period dates" icon={PeriodDatesIcon} availability="Coming later" />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close logging options"
          onPress={onClose}
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
          <Image source={CloseIcon} accessible={false} tintColor={LoggingColors.text} contentFit="contain" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

function Option({ title, icon, availability, onPress }: {
  title: string; icon: NonNullable<ImageProps['source']>; availability?: string; onPress?: () => void;
}) {
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={availability ? `${title}. ${availability}.` : title}
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
      <Text variant="bodyMedium" style={styles.optionTitle}>{title}</Text>
      <View style={styles.iconCircle}>
        <Image source={icon} tintColor={LoggingColors.surface} contentFit="contain" style={styles.icon} />
      </View>
      {availability && <Text variant="labelSmall" style={styles.availability}>{availability}</Text>}
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
  availability: { color: LoggingColors.muted },
  icon: { width: 28, height: 32 },
  closeButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: LoggingColors.surface, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.65 },
});
