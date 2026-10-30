/**
 * Reusable ProductCard Component
 * A square, tappable card showing a product's illustration and name.
 * Used in the product grid; tapping it opens the product's details.
 */

import {Image, StyleSheet, useWindowDimensions, type StyleProp, type ViewStyle} from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useState } from 'react';
import type { Product } from '@/content/products';

type ProductCardProps = {
  /** The product to display. */
  product: Product;
  /** Called when the card is pressed. */
  onPress: () => void;
  /** Optional extra styles, merged over the card's defaults. */
  style?: StyleProp<ViewStyle>;
};

/**
 * Square card with the product illustration above its name.
 *
 * The card measures the screen and sets explicit pixel sizes, because
 * flex/aspectRatio sizing inside Paper's `Card.Content` collapsed the
 * content to zero height and hid the image and title, and it wasn't clear how to fix that without math.
 *
 * 
 * 
 * @param props.product - The product to display.
 * @param props.onPress - Called when the card is pressed.
 * @param props.style - Optional extra styles, merged over the card's defaults.
 * @returns A pressable card element.
 */
export function ProductCard({ product, onPress, style }: ProductCardProps) {
  const { width } = useWindowDimensions();
  // Grid has 5% padding on each side (90% usable); There are two cards, 8px margin around each one of em
  const size = Math.min(Math.floor((width * 0.9) / 2) - 16, 220);
  const [pressed, setPressed] = useState(false);

  return (
    <Card
      mode="elevated"
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="button"
      accessibilityLabel={product.name}
      accessibilityHint="Opens product details"
      style={[styles.card, { width: size, height: size }, style, pressed && styles.pressed]}
    >
      <Card.Content style={[styles.content, { height: size }]}>
        <Image
          source={product.illustration}
          style={{ width: size * 0.5, height: size * 0.5, marginBottom: 8 }}
          resizeMode="contain"
        />
        <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
  },
  pressed: {
  opacity: 0.7, 
  }, 
});