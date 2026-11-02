/**
 * TEMPORARY Product grid screen for viewing purposes. Intend to integrate with the learn page by jadyn
 *
 * Shows every product in `productCards` as a tappable card, two per row.
 * Tapping a card opens the corresponding details screen.
 */

import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/product-card';
import { productCards } from '@/content/products';

/**
 * Scrollable grid of product cards.
 *
 * Cards wrap onto new rows (see containerRow); the card component sizes
 * itself so that two fit per row.
 */
export default function ProductGridScreen() {

  return (

    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.containerRow}>
          {productCards.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => router.push(`/product?id=${product.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

// Styles heavily inspired from the legacy app. *Temporary until design guide goes up*
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    backgroundColor: '#FCC9D1'
  },
  cardContainer: {
    flexGrow: 1,
    paddingHorizontal: '5%',
    paddingTop: '10%',
    marginBottom: 75,
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
