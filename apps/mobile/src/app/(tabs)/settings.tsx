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
    <View
      style={[
        styles.chevronCircle,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.full,
        },
      ]}
    >
      <SymbolView
        name="chevron.right"
        size={14}
        tintColor={theme.colors.futurePeriodDate}
      />
    </View>
  );

  const rowTitleStyle = [
    theme.fonts.bodyMedium,
    { color: theme.colors.onBackground, fontSize: 15 },
  ];

  const rowDescriptionStyle = [
    theme.fonts.bodySmall,
    { color: theme.colors.outlineVariant, fontSize: 12 },
  ];

  const sectionHeaderStyle = [
    theme.fonts.bodyLarge,
    { color: theme.colors.onBackground },
  ];

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
        style={[sectionHeaderStyle, { marginBottom: theme.spacing.two }]}
      >
        Tracking Preferences
      </Text>
      <View style={[styles.trackingRow, { gap: theme.spacing.three }]}>
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
                    borderRadius: theme.radii.lg,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                  },
                ]}
              >
                <SymbolView
                  name={item.icon}
                  size={28}
                  tintColor={theme.colors.onPrimary}
                />
              </View>
              <Text
                style={[
                  theme.fonts.bodyMedium,
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
          style={[sectionHeaderStyle, { marginBottom: theme.spacing.one }]}
        >
          Notifications
        </Text>
        <List.Item
          title="Remind me to log symptoms"
          description="Everyday at 10pm"
          titleStyle={rowTitleStyle}
          descriptionStyle={rowDescriptionStyle}
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
        <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />
        <List.Item
          title="Customize Notifications"
          titleStyle={rowTitleStyle}
          accessibilityLabel="Customize Notifications"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />
      </List.Section>

      {/* Account Settings */}
      <List.Section style={{ marginTop: theme.spacing.three }}>
        <Text
          style={[sectionHeaderStyle, { marginBottom: theme.spacing.one }]}
        >
          Account Settings
        </Text>
        <List.Item
          title="Privacy & Security"
          titleStyle={rowTitleStyle}
          accessibilityLabel="Privacy & Security"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />
        <List.Item
          title="Backup Account"
          titleStyle={rowTitleStyle}
          accessibilityLabel="Backup Account"
          accessibilityRole="button"
          style={styles.row}
          onPress={() => {}}
          right={renderChevron}
        />
        <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />
        <DeleteDataItem />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  chevronCircle: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});