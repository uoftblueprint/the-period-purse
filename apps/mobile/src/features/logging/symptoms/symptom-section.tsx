import { useEffect, type ReactNode } from 'react';
import { Image, type ImageProps } from 'expo-image';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import AccordionArrowIcon from '@/assets/icons/logging/symptoms/arrow_accordion.svg';
import { LoggingColors } from '@/constants/theme';

type Props = {
  title: string;
  icon: NonNullable<ImageProps['source']>;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
};

/** Measure the body independently so both expansion and collapse animate its full height. */
export function SymptomSection({ title, icon, active, expanded, onToggle, children }: Props) {
  const progress = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(expanded ? 1 : 0, {
      duration: 220,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, [expanded, progress]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight.value * progress.value,
    opacity: progress.value,
  }));
  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        onPress={() => { if (expanded) Keyboard.dismiss(); onToggle(); }}
        style={styles.header}>
        <View style={styles.title}>
          <Image source={icon} tintColor={active ? LoggingColors.text : LoggingColors.muted} contentFit="contain" style={styles.icon} />
          <Text variant="labelLarge" style={[styles.label, active && styles.active]}>{title}</Text>
        </View>
        <Animated.View style={arrowStyle}>
          <Image source={AccordionArrowIcon} tintColor={LoggingColors.muted} contentFit="contain" style={styles.chevron} />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[styles.body, bodyStyle]}
        pointerEvents={expanded ? 'auto' : 'none'}
        accessibilityElementsHidden={!expanded}
        importantForAccessibility={expanded ? 'auto' : 'no-hide-descendants'}>
        <View style={styles.measurement} onLayout={(event) => { contentHeight.value = event.nativeEvent.layout.height; }}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 28 },
  title: { flexDirection: 'row', alignItems: 'center', gap: 21 },
  icon: { width: 24, height: 24 },
  label: { fontSize: 14, fontWeight: '700', color: LoggingColors.muted },
  active: { color: LoggingColors.text },
  chevron: { width: 14, height: 10 },
  body: { overflow: 'hidden' },
  measurement: { position: 'absolute', top: 0, left: 0, right: 0 },
});
