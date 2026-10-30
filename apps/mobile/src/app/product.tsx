/**
 * Dynamic Details Page
 *
 * A single reusable screen that reads the selected id (via Expo Router's useLocalSearchParams) 
 * Shows a single period product (illustration, summary and step-by-step
 * "How to Use" instructions). 
 *
 * Informational content comes from `productCards` in `@/content/products`.
 */

import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { type Product, productCards } from '@/content/products';

/**
 * Looks up a product by its string id.
 * @param id - The product id from the route, e.g. "pads".
 * @returns The matching product, or `null` if none exists.
 */
function findProduct(id: string): Product | null {
    return productCards.find((product) => product.id === id) ?? null;
}

/**
 * Details screen for the product mentioned in the `id` route parameter.
 * @throws an error if the id does not match any product in `productCards`.
 */
export default function DetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const product = findProduct(id);

    if (product == null) {
        throw new Error('Product id does not correspond to product in database!');
    }

    const goBack = () => (router.canGoBack() ? router.back() : router.replace('/product-grid'));

    return (
        <SafeAreaProvider style={styles.container}>
            {/* This screen makes its own back button, so hide the default header. */}
            <Stack.Screen options={{ headerShown: false }} />

            {/* "‹ Learn" back button */}
            <Pressable
                onPress={goBack}
                style={styles.back}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={12}
            >
                <Text style={styles.backButtonArrow}>{'<'}</Text>
                <Text style={styles.backButtonLabel}>Learn</Text>
            </Pressable>

            <ScrollView contentContainerStyle={styles.scroll}>
                <Image
                    source={product.illustration}
                    style={styles.hero}
                    resizeMode="contain"
                    accessibilityLabel={`${product.name} illustration`}
                />

                <Text style={styles.title} accessibilityRole="header">
                    {product.name}
                </Text>
                <Text style={styles.body}>{product.summary}</Text>

                {/* "How to Use" card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle} accessibilityRole="header">
                        How to Use
                    </Text>

                    {/* A product has one or more step lists; tampons have two
                    ("With applicator" / "Without applicator"), so each list
                    gets an optional label and its own numbering from 1. */}
                    {product.StepPaths.map((group, g) => (
                        <View key={group.label ?? g}>
                            {/*Show label if it exists (e.g. for tampons it will show With/without applicator) */}
                            {group.label ? <Text style={styles.groupLabel}>{group.label}</Text> : null}

                            {group.steps.map((step, i) => (
                                // accessible since it groups the step in a view so a screen reader announces
                                // it as one item, e.g. "Step 1: Remove the wrapper".
                                <View
                                    key={i}
                                    style={styles.step}
                                    accessible
                                    accessibilityLabel={`Step ${i + 1}: ${step.text}`}
                                >
                                    <View style={styles.stepRow}>
                                        <View style={styles.numberCircle}>
                                            <Text style={styles.numberText}>{i + 1}</Text>
                                        </View>
                                        <Text style={styles.stepText}>{step.text}</Text>
                                    </View>
                                    <Image source={step.image} style={styles.stepImage} resizeMode="contain" />
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

// Styles heavily inspired from the legacy app. *Temporary until design guide goes up*
const TEAL = '#45BFAE';
const CREAM = '#FFF4EE';

const styles = StyleSheet.create({
    container: {
        paddingTop: "10%",
        flex: 1,
        backgroundColor: CREAM,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 4,
    },
    backButtonArrow: {
        fontSize: 28,
        lineHeight: 28,
        color: TEAL,
        marginRight: 4,
    },
    backButtonLabel: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 16,
        color: TEAL,
    },
    scroll: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 120,
    },
    hero: {
        width: 130,
        height: 100,
        marginTop: 8,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 32,
        lineHeight: 38,
        textAlign: 'center',
        color: '#000',
        marginBottom: 16,
    },
    body: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        color: '#1A1A1A',
        marginBottom: 28,
    },
    card: {
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    cardTitle: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#000',
        marginBottom: 16,
    },
    groupLabel: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 18,
        color: '#000',
        marginTop: 8,
        marginBottom: 12,
    },
    step: {
        marginBottom: 20,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    numberCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: TEAL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontFamily: 'NunitoSans_700Bold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    stepText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 22,
        color: '#000',
    },
    stepImage: {
        width: '100%',
        height: 170,
        marginTop: 12,
    },
});