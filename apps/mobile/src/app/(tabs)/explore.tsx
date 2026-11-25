import { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useDailyFact } from '@/components/learn-content';
import { ProductCard } from '@/components/product-card';
import { productCards } from '@/content/products';
import { BottomTabInset, type AppTheme } from '@/constants/theme';
import { Footer } from '@/components/footer';

function FactDetail({ fact, onBack }: { fact: string; onBack: () => void }) {
  const theme = useTheme<AppTheme>();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View
        style={[
          styles.detailContainer,
          {
            paddingHorizontal: theme.spacing.four,
            paddingTop: theme.spacing.three,
            gap: theme.spacing.four,
          },
        ]}
      >
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Learn"
          style={[styles.backButton, { paddingVertical: theme.spacing.one }]}
        >
          <Text
            style={[
              theme.fonts.titleMedium,
              { color: theme.colors.majorButton },
            ]}
          >
            ‹ Learn
          </Text>
        </Pressable>

        <Image
          source={require('@/assets/images/learn/pad.png')}
          resizeMode="contain"
          style={[styles.detailMascot, { marginTop: theme.spacing.two }]}
        />

        <Text
          style={[
            theme.fonts.headlineMedium,
            styles.detailTitle,
            { color: theme.colors.onBackground },
          ]}
        >
          Did you know?
        </Text>

        <Text
          style={[
            theme.fonts.bodyLarge,
            { color: theme.colors.onBackground },
          ]}
        >
          {fact}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function LearnScreen() {
  const theme = useTheme<AppTheme>();
  const { fact, preview } = useDailyFact();
  const [viewingFact, setViewingFact] = useState(false);

  if (viewingFact) {
    return <FactDetail fact={fact} onBack={() => setViewingFact(false)} />;
  }

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.four,
          paddingTop: theme.spacing.three,
          paddingBottom: BottomTabInset + theme.spacing.five,
          gap: theme.spacing.four,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Did you know? Daily rotating fact */}
        <Card
          mode="elevated"
          onPress={() => setViewingFact(true)}
          accessibilityRole="button"
          accessibilityLabel="Did you know? Tap to read the full daily fact."
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radii.lg,
          }}
        >
          <Card.Content
            style={[styles.factCardContent, { gap: theme.spacing.three }]}
          >
            <View style={[styles.factTextColumn, { gap: theme.spacing.one }]}>
              <Text
                style={[
                  theme.fonts.titleLarge,
                  { color: theme.colors.surface },
                ]}
              >
                Did you know?
              </Text>
              <Text
                style={[
                  theme.fonts.bodyMedium,
                  { color: theme.colors.onPrimary },
                ]}
                numberOfLines={2}
              >
                {preview}
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
        <Text
          style={[
            theme.fonts.titleMedium,
            {
              color: theme.colors.onBackground,
              marginTop: theme.spacing.one,
            },
          ]}
        >
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
        <Card
          mode="elevated"
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radii.lg,
            marginTop: theme.spacing.two,
          }}
        >
          <Card.Content style={{ gap: theme.spacing.three }}>
            <Text
              style={[
                theme.fonts.titleLarge,
                { color: theme.colors.onSurface },
              ]}
            >
              Learn more about The Period Purse
            </Text>
            <Text
              style={[
                theme.fonts.bodyMedium,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              The Period Purse strives to achieve menstrual equity by providing
              marginalized menstruators with access to free menstrual products
              and reducing the stigma surrounding periods through public education
              and advocacy.
            </Text>
            <Button
              mode="contained"
              onPress={() => Linking.openURL('https://www.theperiodpurse.com/')}
              buttonColor={theme.colors.majorButton}
              textColor={theme.colors.surface}
              style={{
                borderRadius: theme.radii.full,
                alignSelf: 'flex-start',
              }}
              labelStyle={theme.fonts.titleMedium}
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
  },
  factCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  factTextColumn: {
    flex: 1,
  },
  factMascot: {
    width: 64,
    height: 76,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  detailContainer: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  detailMascot: {
    width: 110,
    height: 130,
    alignSelf: 'center',
  },
  detailTitle: {
    textAlign: 'center',
  },
});