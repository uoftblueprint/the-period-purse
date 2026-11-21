import { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { todaysFact, todaysFactPreview } from '@/components/learn-content';
import { ProductCard } from '@/components/product-card';
import { productCards } from '@/content/products';
import { BottomTabInset, theme } from '@/constants/theme';
import { Footer } from '@/components/footer';

function FactDetail({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.detailContainer}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Learn"
          style={styles.backButton}
        >
          <Text variant="labelLarge" style={styles.backText}>
            ‹ Learn
          </Text>
        </Pressable>

        <Image
          source={require('@/assets/images/learn/pad.png')}
          resizeMode="contain"
          style={styles.detailMascot}
        />

        <Text variant="headlineMedium" style={styles.detailTitle}>
          Did you know?
        </Text>

        <Text variant="bodyLarge" style={styles.detailBody}>
          {todaysFact()}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function LearnScreen() {
  const [viewingFact, setViewingFact] = useState(false);

  if (viewingFact) {
    return <FactDetail onBack={() => setViewingFact(false)} />;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Did you know? Daily rotating fact */}
        <Card
          mode="elevated"
          onPress={() => setViewingFact(true)}
          accessibilityRole="button"
          accessibilityLabel="Did you know? Tap to read the full daily fact."
          style={styles.factCard}
        >
          <Card.Content style={styles.factCardContent}>
            <View style={styles.factTextColumn}>
              <Text variant="titleLarge" style={styles.factHeading}>
                Did you know?
              </Text>
              <Text variant="bodyMedium" style={styles.factPreview} numberOfLines={2}>
                {todaysFactPreview()}
              </Text>
            </View>
            <Image
              source={require('@/assets/images/learn/pad.png')}
              resizeMode="contain"
              style={styles.factMascot}
            />
          </Card.Content>
        </Card>

        {/* 2. Period products grid */}
        <Text variant="titleMedium" style={styles.sectionPrompt}>
          Tap to learn more about period products.
        </Text>

        <View style={styles.grid}>
          {productCards.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() =>
                router.push({
                  pathname: '/product',
                  params: { id: product.id },
                })
              }
            />
          ))}
        </View>

        {/* 3. Learn more about The Period Purse */}
        <Card mode="elevated" style={styles.learnMoreCard}>
          <Card.Content style={styles.learnMoreContent}>
            <Text variant="titleLarge" style={styles.learnMoreTitle}>
              Learn more about The Period Purse
            </Text>
            <Text variant="bodyMedium" style={styles.learnMoreBody}>
              The Period Purse strives to achieve menstrual equity by providing
              marginalized menstruators with access to free menstrual products
              and reducing the stigma surrounding periods through public education
              and advocacy.
            </Text>
            <Button
              mode="contained"
              onPress={() => Linking.openURL('https://www.theperiodpurse.com/')}
              style={styles.websiteButton}
              labelStyle={styles.websiteButtonLabel}
            >
              Visit our website
            </Button>
          </Card.Content>
        </Card>

        {/* 4. Shared Footer */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF7F2',
  },
  content: {
    paddingHorizontal: theme.spacing.four,
    paddingTop: theme.spacing.three,
    paddingBottom: BottomTabInset + theme.spacing.five,
    gap: theme.spacing.four,
  },
  factCard: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
  },
  factCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.three,
  },
  factTextColumn: {
    flex: 1,
    gap: theme.spacing.one,
  },
  factHeading: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#FFFFFF',
  },
  factPreview: {
    fontFamily: 'NunitoSans_400Regular',
    color: '#0D2C2A',
  },
  factMascot: {
    width: 64,
    height: 76,
  },
  sectionPrompt: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#5C5C5C',
    marginTop: theme.spacing.one,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  learnMoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: theme.spacing.two,
  },
  learnMoreContent: {
    gap: theme.spacing.three,
  },
  learnMoreTitle: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#1F1F1F',
  },
  learnMoreBody: {
    fontFamily: 'NunitoSans_400Regular',
    color: '#4A4A4A',
    lineHeight: 22,
  },
  websiteButton: {
    backgroundColor: '#E63946',
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  websiteButtonLabel: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#FFFFFF',
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.four,
    paddingTop: theme.spacing.three,
    gap: theme.spacing.four,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.one,
  },
  backText: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#E63946',
  },
  detailMascot: {
    width: 110,
    height: 130,
    alignSelf: 'center',
    marginTop: theme.spacing.two,
  },
  detailTitle: {
    fontFamily: 'NunitoSans_700Bold',
    color: '#1F1F1F',
    textAlign: 'center',
  },
  detailBody: {
    fontFamily: 'NunitoSans_400Regular',
    color: '#2D2D2D',
    lineHeight: 24,
  },
});