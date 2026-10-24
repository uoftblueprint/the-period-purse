import { ScrollView } from 'react-native';
import { List, Switch } from 'react-native-paper';

/**
 * Static settings shell. Interaction and persisted preference values will be added with the settings flows.
 */
export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Remind me to log symptoms"
          description="Every day at 10:00 AM"
          accessibilityLabel="Remind me to log symptoms, currently disabled"
          right={() => <Switch value={false} disabled />}
        />
        <List.Item
          title="Customize notifications"
          accessibilityLabel="Customize notifications, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Account settings</List.Subheader>
        <List.Item
          title="Back Up Account"
          accessibilityLabel="Back Up Account, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Delete Account"
          accessibilityLabel="Delete Account, unavailable"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>
    </ScrollView>
  );
}
