import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Image, type ImageProps } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { AppTheme } from '@/constants/theme';
import BloodDropIcon from '@/assets/icons/logging/launcher/blood_drop.svg';
import PeriodDatesIcon from '@/assets/icons/logging/launcher/calendar_icon_multiple_dates.svg';
import CloseIcon from '@/assets/icons/logging/shared/close_icon.svg';

import { LOGGING_OPTIONS_ACCESSIBILITY_TEXT } from '@/utils/accessibility-text';

type Props = { onClose: () => void; onDaily: () => void; onPeriodDates: () => void };

/** Legacy SelectLogOptionOverlay layout; each option opens its logging form. */
export function LoggingOptionsOverlay({ onClose, onDaily, onPeriodDates }: Props) {
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <Pressable
        style={StyleSheet.absoluteFill}
        accessibilityRole="button"
        accessibilityLabel={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.DISMISS}
        onPress={onClose}
      />
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, theme.spacing.three) + theme.spacing.four }]}>
        <Text variant="headlineSmall" accessibilityRole="header" style={styles.heading}>What would you like to log?</Text>
        <View style={styles.choices}>
          <Option title={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.DAILY_SYMPTOMS} icon={BloodDropIcon} onPress={onDaily} />
          <Option title={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.MULTIPLE_PERIOD_DATES} icon={PeriodDatesIcon} onPress={onPeriodDates} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={LOGGING_OPTIONS_ACCESSIBILITY_TEXT.CLOSE}
          onPress={onClose}
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
          <Image source={CloseIcon} accessible={false} tintColor={theme.colors.onSurface} contentFit="contain" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

function Option({ title, icon, onPress }: {
  title: string; icon: NonNullable<ImageProps['source']>; onPress: () => void;
}) {
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
      <Text variant="bodyMedium" style={styles.optionTitle}>{title}</Text>
      <View style={styles.iconCircle}>
        <Image source={icon} tintColor={theme.colors.onPrimary} contentFit="contain" style={styles.icon} />
      </View>
    </Pressable>
  );
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'flex-end' },
  content: { alignItems: 'center', paddingHorizontal: theme.spacing.four, gap: theme.spacing.five },
  heading: { textAlign: 'center', color: theme.colors.onSurface },
  choices: { flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.four, width: '100%', maxWidth: 380 },
  option: { flex: 1, alignItems: 'center', maxWidth: 150, gap: theme.spacing.three },
  optionTitle: { textAlign: 'center', color: theme.colors.onSurface, minHeight: 42 },
  iconCircle: { width: 76, height: 76, borderRadius: theme.radii.full, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary },
  icon: { width: 28, height: 32 },
  closeButton: { width: 64, height: 64, borderRadius: theme.radii.full, backgroundColor: theme.colors.surfaceVariant, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.65 },
});
