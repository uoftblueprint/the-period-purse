import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '@/constants/theme';

type CycleCardProps = {
    isOnPeriod: boolean;
    periodDays: number | null;
    daysSinceLastPeriod: number | null;
    cycleDay: number | null;
    cycleDonutPercent: number | null;
    isLoading: boolean;
    hasError: boolean;
    showTip: boolean;
};

type CycleProps = Pick<CycleCardProps, 'isOnPeriod' | 'periodDays' | 'daysSinceLastPeriod' | 'showTip'>;

export function CycleCard({
    isOnPeriod,
    periodDays,
    daysSinceLastPeriod,
    cycleDay,
    cycleDonutPercent,
    isLoading,
    hasError,
    showTip,
}: CycleCardProps) {
    const theme = useTheme<AppTheme>();
    const ringSize = 152;
    const ringBorderWidth = 12;
    const markerSize = 38;
    const markerAngle = ((cycleDonutPercent ?? 0) / 100) * Math.PI * 2 - Math.PI / 2;
    const markerRadius = (ringSize - ringBorderWidth) / 2;
    const markerPosition = {
        left: (ringSize - markerSize) / 2 + markerRadius * Math.cos(markerAngle) - ringBorderWidth,
        top: (ringSize - markerSize) / 2 + markerRadius * Math.sin(markerAngle) - ringBorderWidth,
    };

    return (
        <View style={[styles.card, {
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.radii.lg,
        }]}>
            <View style={styles.cycleDetails}>
                <Text style={[theme.fonts.titleMedium, styles.header, { color: theme.colors.onSurface }]}>
                    Current Cycle:
                </Text>

                {isLoading ? (
                    <ActivityIndicator
                        accessibilityLabel="Loading cycle data"
                        style={styles.status}
                    />
                ) : hasError ? (
                    <Text style={[theme.fonts.bodyMedium, styles.statusText, { color: theme.colors.onSurfaceVariant }]}>
                        Couldn&apos;t load your cycle data.
                    </Text>
                ) : (
                    <>
                        <Cycle
                            isOnPeriod={isOnPeriod}
                            periodDays={periodDays}
                            daysSinceLastPeriod={daysSinceLastPeriod}
                            showTip={showTip}
                        />

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.push('/logging-demo')}
                            style={[
                                styles.logButton,
                                {
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: theme.radii.full,
                                },
                            ]}
                        >
                            <Text style={[theme.fonts.labelLarge, styles.logButtonText, { color: theme.colors.onPrimary }]}>
                                Log Period
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>

            <View
                style={[
                    styles.cycleRing,
                    {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.surfaceVariant,
                    },
                ]}
                accessibilityRole="progressbar"
                accessibilityLabel={
                    cycleDonutPercent === null
                        ? 'Cycle progress unavailable'
                        : `${cycleDonutPercent}% through the average cycle`
                }
            >
                {cycleDay !== null && (
                    <View
                        style={[
                            styles.dayMarker,
                            markerPosition,
                            {
                                backgroundColor: theme.colors.surfaceVariant,
                                borderColor: theme.colors.outline,
                                shadowColor: theme.colors.shadow,
                            },
                        ]}
                    >
                        <Text style={[theme.fonts.labelSmall, styles.dayMarkerText, { color: theme.colors.onSurface }]}>
                            Day {cycleDay}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export function Cycle({ isOnPeriod, periodDays, daysSinceLastPeriod, showTip }: CycleProps) {
    const theme = useTheme<AppTheme>();

    return (
        <View style={styles.cycleContent}>
            {isOnPeriod && periodDays !== null ? (
                <OnPeriodText periodDays={periodDays} />
            ) : daysSinceLastPeriod !== null ? (
                <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod} />
            ) : (
                <Text style={[theme.fonts.bodyLarge, styles.cycleText, { color: theme.colors.onSurfaceVariant }]}>Log a period to start tracking.</Text>
            )}
            {showTip && <Text style={[theme.fonts.bodySmall, styles.tip, { color: theme.colors.onSurfaceVariant }]}>Your cycle is in its follicular phase.</Text>}
        </View>
    );
}

export function OffPeriodText({ daysSinceLastPeriod }: { daysSinceLastPeriod: number }) {
    const theme = useTheme<AppTheme>();

    return (
        <View style={styles.cycleNumberRow}>
            <Text style={[theme.fonts.bodyLarge, styles.cycleText, { color: theme.colors.onSurface }]}>
                <Text style={[theme.fonts.titleSmall, styles.cycleNumber, { color: theme.colors.onSurface }]}>{daysSinceLastPeriod}</Text> days since last period
            </Text>
        </View>
    );
}

export function OnPeriodText({ periodDays }: { periodDays: number }) {
    const theme = useTheme<AppTheme>();

    return (
        <View style={styles.cycleNumberRow}>
            <Text style={[theme.fonts.bodyLarge, styles.cycleText, { color: theme.colors.onSurface }]}>
                Day <Text style={[theme.fonts.titleSmall, styles.cycleNumber, { color: theme.colors.onSurface }]}>{periodDays}</Text> of period
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        minHeight: 180,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cycleDetails: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 8,
    },
    header: {
        fontSize: 20,
        lineHeight: 26,
        alignSelf: 'flex-start',
    },
    cycleContent: {
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    status: {
        marginTop: 24,
        marginBottom: 32,
    },
    statusText: {
        fontSize: 15,
        lineHeight: 20,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    cycleNumberRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    cycleNumber: {
        fontSize: 19,
        lineHeight: 25,
        fontWeight: '500',
    },
    cycleText: {
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 170,
    },
    tip: {
        fontSize: 12,
        marginTop: 8,
    },
    logButton: {
        minWidth: 100,
        minHeight: 36,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logButtonText: {
        fontSize: 13,
        fontWeight: '500',
    },
    cycleRing: {
        width: 152,
        height: 152,
        borderWidth: 12,
        borderRadius: 76,
        marginHorizontal: 4,
    },
    dayMarker: {
        position: 'absolute',
        minWidth: 38,
        height: 38,
        paddingHorizontal: 4,
        borderRadius: 19,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOpacity: 0.18,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    dayMarkerText: {
        fontSize: 8,
    },
});
