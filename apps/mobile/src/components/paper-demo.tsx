import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export function PaperDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleLarge">React Native Paper</Text>
        <Text variant="bodyMedium" accessibilityLiveRegion="polite">
          {pressed ? 'Paper button pressed!' : 'Tap the button to test Paper.'}
        </Text>
        <Button mode="contained" onPress={() => setPressed((value) => !value)}>
          {pressed ? 'Reset demo' : 'Test Paper'}
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
  },
  content: {
    gap: 12,
  },
});
