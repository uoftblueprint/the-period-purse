import { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Footer } from '@/components/footer';
import {
  products,
  todaysFact,
  todaysFactPreview,
  type Product,
} from '@/components/learn-content';
import { BottomTabInset, Spacing } from '@/constants/theme';

function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <View style={[styles.art, large && styles.artLarge]}>
      <Image source={product.image} resizeMode="contain" style={styles.productImage} />
    </View>
  );
}

function ProductDetail({ product, goBack }: { product: Product; goBack: () => void }) {
  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <ScrollView contentContainerStyle={styles.detailContent}>
        <Pressable accessibilityRole="button" onPress={goBack} style={styles.back}>
          <Text variant="titleMedium" style={styles.backText}>
            ‹  Learn
          </Text>
        </Pressable>

        <ProductArt product={product} large />
        <Text variant="headlineLarge" style={styles.detailTitle}>
          {product.name.replace('\n', ' ')}
        </Text>
        <Text variant="bodyLarge" style={styles.detailBody}>
          {product.description}
        </Text>

        <Card mode="elevated" style={styles.howToCard}>
          <Card.Content style={styles.howToContent}>
            <Text variant="titleLarge" style={styles.howToTitle}>
              How to Use
            </Text>

            {product.useSections.map((section, sectionIndex) => (
              <View key={section.label ?? sectionIndex} style={styles.useSection}>
                {section.label && (
                  <View style={styles.tag}>
                    <Text variant="labelLarge" style={styles.tagText}>
                      {section.label}
                    </Text>
                  </View>
                )}
                {section.steps.map((step, index) => (
                  <View key={`${sectionIndex}-${index}`} style={styles.step}>
                    <View style={styles.stepBadge}>
                      <Text variant="labelLarge" style={styles.stepNumber}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text variant="bodyLarge" style={styles.stepText}>
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFact, setShowFact] = useState(false);

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} goBack={() => setSelectedProduct(null)} />;
  }
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
          {products.map((product) => (
            <Card
              key={product.id}
              mode="elevated"
              onPress={() => setSelectedProduct(product)}
              accessibilityRole="button"
              accessibilityLabel={`Learn about ${product.name.replace('\n', ' ')}`}
              style={[styles.productCard, { backgroundColor: product.colour }]}>
              <Card.Content style={styles.productCardContent}>
                <ProductArt product={product} />
                <Text variant="titleSmall" style={styles.productName}>
                  {product.name}
                </Text>
              </Card.Content>
            </Card>
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

        {/* 4. Footer at the bottom */}
        <Footer />
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
    justifyContent: 'space-between',
    rowGap: Spacing.three,
  },
  productCard: {
    width: '48%',
    borderRadius: 12,
  },
  productCardContent: {
    minHeight: 165,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  art: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artLarge: {
    width: 130,
    height: 130,
    marginBottom: Spacing.three,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
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
  detailContent: {
    alignItems: 'center',
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
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
  howToCard: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  howToContent: {
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  howToTitle: {
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
  },
  useSection: {
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  tag: {
    alignSelf: 'center',
    backgroundColor: '#72C6B7',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: 20,
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
  },
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#72C6B7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: '#FCFFFE',
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    color: '#000000',
    lineHeight: 22,
  },
});