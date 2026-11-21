/**
 * Dynamic Details Page
 *
 * A single reusable screen that reads the selected id (via Expo Router's useLocalSearchParams) 
 * Shows a single period product (illustration, summary and step-by-step
 * "How to Use" instructions). 
 *
 * Informational content comes from `productCards` in `@/content/products`.
 */

import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Icon } from 'react-native-paper';
import type { AppTheme } from '@/constants/theme';
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
 * Shows a recovery link if the id does not match any product in `productCards`.
 */
export default function DetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const product = findProduct(id);
    const theme = useTheme<AppTheme>();
    const styles = createStyles(theme);

    if (product == null) {
        return (
            <SafeAreaProvider style={styles.container}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.missingProduct}>
                    <Text variant="bodyMedium" style={styles.body}>Product not found.</Text>
                    <Link href="/product-grid" style={styles.backButtonLabel}>Browse products</Link>
                </View>
            </SafeAreaProvider>
        );
    }

    const goBack = () => (router.canGoBack() ? router.back() : router.replace('/product-grid'));

    return (
        <SafeAreaProvider style={styles.container}>
            {/* This screen makes its own back button, so hide the default header. */}
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} />

            {/* "‹ Learn" back button */}
            <Pressable
                onPress={goBack}
                style={styles.back}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={12}
            >
                <Icon source="chevron-left" size={24} color={theme.colors.onBackground}/>
                <Text variant="titleMedium" style={styles.backButtonLabel}>Learn</Text>
            </Pressable>

            <ScrollView contentContainerStyle={styles.scroll}>
                <Image
                    source={product.illustration}
                    style={styles.hero}
                    resizeMode="contain"
                    accessibilityLabel={`${product.name} illustration`}
                />

                <Text variant="headlineLarge" style={styles.title} accessibilityRole="header">
                    {product.name}
                </Text>
                <Text variant="bodyMedium" style={styles.body}>{product.summary}</Text>

                {/* "How to Use" card */}
                <Card mode="elevated" style={styles.card}>
                    <Card.Content>
                        <Text variant="headlineMedium" style={styles.cardTitle} accessibilityRole="header">
                            How to Use
                        </Text>

                        {/* A product has one or more step lists; tampons have two
                    ("With applicator" / "Without applicator"), so each list
                    gets an optional label and its own numbering from 1. */}
                        {product.StepPaths.map((group, g) => (
                            <View key={group.label ?? g}>
                                {/*Show label if it exists (e.g. for tampons it will show With/without applicator) */}
                                {group.label ? <Text variant="titleSmall" style={styles.groupLabel}>{group.label}</Text> : null}

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
                                                <Text variant="titleMedium" style={styles.numberText}>{i + 1}</Text>
                                            </View>
                                            <Text variant="bodyMedium" style={styles.stepText}>{step.text}</Text>
                                        </View>
                                        <Image source={step.image} style={styles.stepImage} resizeMode="contain" />
                                    </View>
                                ))}
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaProvider>
    );
}

// Styles heavily inspired from the legacy app. *Temporary until design guide goes up*
const createStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        paddingTop: "10%",
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    missingProduct: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 4,
    },
    backButtonArrow: {
        color: theme.colors.onBackground,
        marginRight: 4,
    },
    backButtonLabel: {
        color: theme.colors.onBackground,
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
        textAlign: 'center',
        color: '#000',
        marginBottom: 16,
    },
    body: {
        textAlign: 'center',
        color: theme.colors.onBackground,
        marginBottom: 28,
    },
    card: {
        alignSelf: 'stretch',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    cardTitle: {
        textAlign: 'center',
        color: '#000',
        marginBottom: 16,
    },
    groupLabel: {
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
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: theme.colors.onPrimary,
    },
    stepText: {
        flex: 1,
        color: '#000',
    },
    stepImage: {
        width: '100%',
        height: 170,
        marginTop: 12,
    },
});
