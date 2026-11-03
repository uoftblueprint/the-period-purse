import { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { todaysFact, todaysFactPreview } from '@/components/learn-content';
import { ProductCard } from '@/components/product-card';
import { productCards } from '@/content/products';
import { BottomTabInset, Spacing } from '@/constants/theme';

function FactDetail({ goBack }: { goBack: () => void }) {
  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <View style={styles.factDetail}>
        <Pressable accessibilityRole="button" onPress={goBack} style={styles.back}>
          <Text variant="titleMedium" style={styles.backText}>
            ‹  Learn
          </Text>
        </Pressable>
        <Image
          source={require('@/assets/images/learn/pad.png')}
          resizeMode="contain"
          style={styles.factDetailImage}
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
  const [showFact, setShowFact] = useState(false);

  if (showFact) {
    return <FactDetail goBack={() => setShowFact(false)} />;
  }

  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 1. Did You Know Fact Card at the top */}
        <Card
          mode="elevated"
          onPress={() => setShowFact(true)}
          accessibilityRole="button"
          accessibilityLabel="Read today’s period fact"
          style={styles.factCard}>
          <Card.Content style={styles.factCardContent}>
            <View style={styles.factCopy}>
              <Text variant="titleMedium" style={styles.factTitle}>
                Did you know?
              </Text>
              <Text variant="bodyMedium" style={styles.factBody}>
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

        {/* 2. Period Product Info Heading & Grid */}
        <Text variant="titleSmall" style={styles.sectionHint}>
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

        {/* 3. Learn more about The Period Purse white box component */}
        <Card mode="elevated" style={styles.learnMoreCard}>
          <Card.Content style={styles.learnMoreContent}>
            <Text variant="titleMedium" style={styles.learnMoreTitle}>
              Learn more about The Period Purse
            </Text>
            <Text variant="bodyMedium" style={styles.learnMoreBody}>
              The Period Purse strives to achieve menstrual equity by providing people who
              menstruate with access to free menstrual products, and to reduce the stigma
              surrounding periods through public education and advocacy.
            </Text>
            <Button
              mode="contained"
              buttonColor="#73C7B7"
              textColor="#000000"
              labelStyle={styles.websiteButtonLabel}
              style={styles.websiteButton}
              onPress={() => Linking.openURL('https://www.theperiodpurse.com')}>
              Visit the website
            </Button>
          </Card.Content>
        </Card>

        {/* 4. Footer will be imported from PR #16 once merged */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
  },
  factCard: {
    backgroundColor: '#72C6B7',
    borderRadius: 12,
  },
  factCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  factCopy: {
    flex: 1,
    gap: Spacing.two,
  },
  factTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  factBody: {
    color: '#000000',
    lineHeight: 20,
  },
  factMascot: {
    width: 72,
    height: 72,
  },
  sectionHint: {
    color: '#6D6E71',
    fontWeight: '800',
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8, 
  },
  learnMoreCard: {
    marginTop: Spacing.four,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  learnMoreContent: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  learnMoreTitle: {
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
  },
  learnMoreBody: {
    color: '#000000',
    lineHeight: 20,
    textAlign: 'center',
  },
  websiteButton: {
    borderRadius: 8,
    marginTop: Spacing.one,
  },
  websiteButtonLabel: {
    fontWeight: '800',
  },
  factDetail: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.four,
  },
  factDetailImage: {
    width: 140,
    height: 140,
    marginTop: Spacing.six,
    marginBottom: Spacing.four,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    marginBottom: Spacing.three,
  },
  backText: {
    color: '#5A9F93',
    fontWeight: '800',
  },
  detailTitle: {
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
  detailBody: {
    color: '#000000',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
});