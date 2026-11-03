import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';

/**
 * Clean chevron arrow using pure React Native styling so it doesn't
 * depend on external icon font libraries before the Design System ticket is ready.
 */
function ChevronRight({ color }: { color: string }) {
  return (
    <View
      style={[
        styles.chevron,
        { borderTopColor: color, borderRightColor: color },
      ]}
    />
  );
}

/**
 * Static settings shell. Interaction, navigation, and persisted
 * preference values will be hooked up with their respective feature flows.
 */
export default function SettingsScreen() {
  const theme = useTheme();
  const rowStyle = [styles.row, { borderBottomColor: theme.colors.outlineVariant }];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Notifications Section */}
      <List.Section style={styles.section}>
        <List.Subheader>Notifications</List.Subheader>

        <List.Item
          title="Remind me to log symptoms"
          description="Every day at 10:00 AM"
          accessibilityLabel="Remind me to log symptoms, every day at 10:00 AM, currently disabled"
          accessibilityRole="switch"
          right={() => <Switch value={false} disabled />}
          style={rowStyle}
        />

        <List.Item
          title="Customize notifications"
          accessibilityLabel="Customize notifications"
          accessibilityRole="button"
          onPress={() => {
            // Placeholder: Navigate to notification customization
          }}
          right={(props) => (
            <List.Icon
              {...props}
              icon={({ color }) => <ChevronRight color={color} />}
            />
          )}
          style={rowStyle}
        />
      </List.Section>

      {/* Account Settings Section */}
      <List.Section style={styles.section}>
        <List.Subheader>Account settings</List.Subheader>

        <List.Item
          title="Delete Account"
          accessibilityLabel="Delete Account"
          accessibilityRole="button"
          onPress={() => {
            // Placeholder: Trigger delete account modal
          }}
          right={(props) => (
            <List.Icon
              {...props}
              icon={({ color }) => <ChevronRight color={color} />}
            />
          )}
          style={rowStyle}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingTop: 48,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  chevron: {
    width: 9,
    height: 9,
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }],
    alignSelf: 'center',
    marginRight: 6,
  },
});