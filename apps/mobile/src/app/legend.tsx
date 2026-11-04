import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Surface, Text, useTheme } from 'react-native-paper';

import { FILTER_COLOURS } from '@/constants/calendar';
import { Spacing } from '@/constants/theme';

const LEGEND_SECTIONS = [
  {
    title: 'Period Flow',
    items: [
      { label: 'Heavy', colour: FILTER_COLOURS.FLOW.HEAVY },
      { label: 'Medium', colour: FILTER_COLOURS.FLOW.MEDIUM },
      { label: 'Light', colour: FILTER_COLOURS.FLOW.LIGHT },
      { label: 'Spotting', colour: FILTER_COLOURS.FLOW.SPOTTING },
      { label: 'None', colour: FILTER_COLOURS.FLOW.NONE },
    ],
  },
  {
    title: 'Cramps',
    items: [
      { label: 'Terrible', colour: FILTER_COLOURS.CRAMPS.TERRIBLE },
      { label: 'Bad', colour: FILTER_COLOURS.CRAMPS.BAD },
      { label: 'Neutral', colour: FILTER_COLOURS.CRAMPS.NEUTRAL },
      { label: 'Good', colour: FILTER_COLOURS.CRAMPS.GOOD },
      { label: 'None', colour: FILTER_COLOURS.CRAMPS.NONE },
    ],
  },
  {
    title: 'Sleep',
    items: [
      { label: 'More than 10 hours', colour: FILTER_COLOURS.SLEEP.HEAVY },
      { label: '8–10 hours', colour: FILTER_COLOURS.SLEEP.MEDIUM },
      { label: '6–8 hours', colour: FILTER_COLOURS.SLEEP.LIGHT },
      { label: 'Less than 6 hours', colour: FILTER_COLOURS.SLEEP.LITTLE },
    ],
  },
  {
    title: 'Exercise',
    items: [
      { label: 'More than 60 minutes', colour: FILTER_COLOURS.EXERCISE.HEAVY },
      { label: '40–60 minutes', colour: FILTER_COLOURS.EXERCISE.MEDIUM },
      { label: '20–40 minutes', colour: FILTER_COLOURS.EXERCISE.LIGHT },
      { label: 'Less than 20 minutes', colour: FILTER_COLOURS.EXERCISE.LITTLE },
    ],
  },
] as const;

export default function LegendScreen() {
  const theme = useTheme();
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction accessibilityLabel="Go back" onPress={goBack} />
        <Appbar.Content title="Legend" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {LEGEND_SECTIONS.map((section) => (
          <Surface
            key={section.title}
            elevation={1}
            style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Text accessibilityRole="header" style={styles.sectionTitle} variant="titleMedium">
              {section.title}
            </Text>

            <View style={styles.items}>
              {section.items.map((item) => (
                <View key={item.label} style={styles.item}>
                  <View
                    accessibilityLabel={`${item.label} colour indicator`}
                    style={[styles.indicator, { backgroundColor: item.colour }]}
                  />
                  <Text style={styles.itemLabel} variant="bodyMedium">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </Surface>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.three,
    padding: Spacing.three,
    paddingBottom: Spacing.five,
  },
  card: {
    borderRadius: 12,
    padding: Spacing.three,
  },
  sectionTitle: {
    marginBottom: Spacing.three,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.three,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 24,
    paddingRight: Spacing.two,
    width: '50%',
  },
  indicator: {
    borderRadius: 3,
    height: 22,
    marginRight: Spacing.two,
    width: 22,
  },
  itemLabel: {
    flex: 1,
  },
});
