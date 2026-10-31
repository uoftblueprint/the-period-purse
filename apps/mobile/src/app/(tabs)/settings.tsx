import { ScrollView, StyleSheet } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';

/**
 * Static settings shell. Interaction and persisted preference values will be added with the settings flows.
 */
export default function SettingsScreen() {
  const theme = useTheme();
  const rowStyle = [styles.row, { borderBottomColor: theme.colors.outlineVariant }];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}>
      <List.Section style={styles.section}>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Remind me to log symptoms"
          description="Every day at 10:00 AM"
          accessibilityLabel="Remind me to log symptoms, currently disabled"
          right={() => <Switch value={false} disabled />}
          style={rowStyle}
        />
        <List.Item
          title="Customize notifications"
          accessibilityLabel="Customize notifications, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
          style={rowStyle}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader>Account settings</List.Subheader>
        <List.Item
          title="Back Up Account"
          accessibilityLabel="Back Up Account, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
          style={rowStyle}
        />
        <List.Item
          title="Delete Account"
          accessibilityLabel="Delete Account, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
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
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
