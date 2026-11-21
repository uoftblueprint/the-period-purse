import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

import CalendarIcon from '@/assets/icons/calendar-action-button/calendar_icon.svg';
import PlusIcon from '@/assets/icons/calendar-action-button/plus_sign.svg';
import { LoggingColors } from '@/constants/theme';

import { getCalendarAction } from './calendar-action';

export type CalendarActionButtonProps = {
  isCalendarPage: boolean;
  onNavigateToCalendar: () => void;
  onOpenLogging: () => void;
  style?: StyleProp<ViewStyle>;
};

/** The host supplies page context, navigation, and placement for the eventual app-wide mount. */
export function CalendarActionButton({ isCalendarPage, onNavigateToCalendar, onOpenLogging, style }: CalendarActionButtonProps) {
  const action = getCalendarAction(isCalendarPage, { onNavigateToCalendar, onOpenLogging });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={action.accessibilityLabel}
      onPress={action.onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}>
      <Image
        accessible={false}
        pointerEvents="none"
        source={action.icon === 'plus' ? PlusIcon : CalendarIcon}
        tintColor={LoggingColors.surface}
        contentFit="contain"
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: LoggingColors.action,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.96 }] },
  icon: { width: 28, height: 32 },
});
