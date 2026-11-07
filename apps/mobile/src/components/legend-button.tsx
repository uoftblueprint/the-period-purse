import { type Href, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const LEGEND_ROUTE = '/legend' as Href;

/** Opens the calendar legend. Intended for placement in the Calendar screen header. */
export function LegendButton() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <IconButton
      accessibilityLabel="Open legend"
      accessibilityRole="button"
      icon={({ color, size }) => (
        <View style={[styles.icon, { borderColor: color, height: size, width: size }]}>
          <Text style={[styles.questionMark, { color }]}>?</Text>
        </View>
      )}
      iconColor={theme.colors.primary}
      onPress={() => router.push(LEGEND_ROUTE)}
      size={24}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
  },
  questionMark: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
});
