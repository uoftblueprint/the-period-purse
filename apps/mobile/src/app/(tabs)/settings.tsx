import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Divider, List, Switch, Text, useTheme } from "react-native-paper";
import { SymbolView } from "expo-symbols";
import type { AppTheme } from "@/constants/theme";
import { DeleteDataItem } from "@/features/settings/components/delete-data-item";

const TRACKING_ITEMS = [
  { key: "mood", label: "Mood", icon: "face.smiling" },
  { key: "exercise", label: "Exercise", icon: "figure.run" },
  { key: "sleep", label: "Sleep", icon: "moon.fill" },
  { key: "cramps", label: "Cramps", icon: "bolt.fill" },
] as const;

export default function SettingsScreen() {
  const theme = useTheme<AppTheme>();
  const [remindSymptoms, setRemindSymptoms] = useState(true);
  const [selectedTracking, setSelectedTracking] = useState<string[]>([
    "mood",
    "exercise",
    "sleep",
    "cramps",
  ]);

  const toggleTracking = (key: string) => {
    setSelectedTracking((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const renderChevron = () => (
    <SymbolView
      name="chevron.right"
      size={16}
      tintColor={theme.colors.futurePeriodDate}
      style={styles.chevron}
    />
  );

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.three,
        paddingTop: theme.spacing.five,
        paddingBottom: theme.spacing.four,
      }}
    >
      {/* Tracking Preferences */}
      <Text
        variant="labelMedium"
        style={[
          styles.sectionHeader,
          {
            color: theme.colors.onBackground,
            marginBottom: theme.spacing.two,
          },
        ]}
      >
        Tracking Preferences
      </Text>
      <View style={[styles.trackingRow, { gap: theme.spacing.two }]}>
        {TRACKING_ITEMS.map((item) => {
          const isSelected = selectedTracking.includes(item.key);
          return (
            <Pressable
              key={item.key}
              onPress={() => toggleTracking(item.key)}
              accessibilityRole="button"
              accessibilityLabel={`Toggle ${item.label} tracking`}
              accessibilityState={{ selected: isSelected }}
              style={styles.trackingItem}
            >
              <View
                style={[
                  styles.trackingTile,
                  {
                    borderRadius: theme.radii.md,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                  },
                ]}
              >
                <SymbolView
                  name={item.icon}
                  size={26}
                  tintColor={theme.colors.onPrimary}
                />
              </View>
              <Text
                variant="bodySmall"
                style={[
                  styles.trackingLabel,
                  {
                    color: theme.colors.onBackground,
                    marginTop: theme.spacing.one,
                  },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notifications */}
      <List.Section style={{ marginTop: theme.spacing.four }}>
        <Text
          variant="labelMedium"
          style={[
            styles.sectionHeader,
            {
              color: theme.colors.onBackground,
              marginBottom: theme.spacing.one,
            },
          ]}
        >
          Notifications
        </Text>
        <List.Item
          title="Remind me to log symptoms"
          description="Everyday at 10pm"
          accessibilityLabel="Remind me to log symptoms, everyday at 10pm"
          accessibilityRole="switch"
          style={styles.row}
          right={() => (
            <Switch
              value={remindSymptoms}
              onValueChange={setRemindSymptoms}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Customize Notifications"
          accessibilityLabel="Customize Notifications"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={styles.divider} />
      </List.Section>

      {/* Account Settings */}
      <List.Section style={{ marginTop: theme.spacing.three }}>
        <Text
          variant="labelMedium"
          style={[
            styles.sectionHeader,
            {
              color: theme.colors.onBackground,
              marginBottom: theme.spacing.one,
            },
          ]}
        >
          Account Settings
        </Text>
        <List.Item
          title="Privacy & Security"
          accessibilityLabel="Privacy & Security"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Backup Account"
          accessibilityLabel="Backup Account"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={styles.divider} />
        <DeleteDataItem />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  sectionHeader: {
    fontWeight: "700",
  },
  trackingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trackingItem: {
    flex: 1,
    alignItems: "center",
  },
  trackingTile: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trackingLabel: {
    textAlign: "center",
  },
  row: {
    paddingHorizontal: 0,
  },
  chevron: {
    alignSelf: "center",
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});