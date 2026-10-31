import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type InfoCardProps = {
  header: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function InfoCard({ header, children, style }: InfoCardProps) {
  return (
    <ThemedView type="backgroundElement" style={[styles.card, style]}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {header}
      </ThemedText>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.three, // old card used borderRadius: 12; 16 is the nearest token
    padding: Spacing.three,
    gap: Spacing.two,
  },
});