import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type CycleCardProps = {
    isOnPeriod: boolean;
    periodDays: number | null;
    daysSinceLastPeriod: number | null;
    cycleDay: number | null;
    cycleDonutPercent: number | null;
    showTip: boolean;
};

type CycleProps = Pick<CycleCardProps, 'isOnPeriod' | 'periodDays' | 'daysSinceLastPeriod' | 'showTip'>;

export function CycleCard({
    isOnPeriod,
    periodDays,
    daysSinceLastPeriod,
    cycleDay,
    cycleDonutPercent,
    showTip,
}: CycleCardProps) {
    const theme = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.cycleDetails}>
                <Text style={[styles.header, { color: theme.colors.onSurface }]}>Current Cycle:</Text>
                <Cycle
                    isOnPeriod={isOnPeriod}
                    periodDays={periodDays}
                    daysSinceLastPeriod={daysSinceLastPeriod}
                    showTip={showTip}
                />
                <Pressable accessibilityRole="button" style={[styles.logButton, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.logButtonText, { color: theme.colors.onPrimary }]}>Log Period</Text>
                </Pressable>
            </View>
            <View
                style={[styles.cycleRing, { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}
                accessibilityRole="progressbar"
                accessibilityLabel={cycleDonutPercent === null
                    ? 'Cycle progress unavailable'
                    : `${cycleDonutPercent}% through the average cycle`}>
                {cycleDay !== null && (
                    <View style={[styles.dayMarker, {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.outline,
                        shadowColor: theme.colors.shadow,
                    }]}>
                        <Text style={[styles.dayMarkerText, { color: theme.colors.onSurface }]}>Day {cycleDay}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export function Cycle({ isOnPeriod, periodDays, daysSinceLastPeriod, showTip }: CycleProps) {
    const theme = useTheme();

    return (
        <View style={styles.cycleContent}>
            {isOnPeriod && periodDays !== null ? (
                <OnPeriodText periodDays={periodDays} />
            ) : daysSinceLastPeriod !== null ? (
                <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod} />
            ) : (
                <Text style={[styles.cycleText, { color: theme.colors.onSurfaceVariant }]}>Log a period to start tracking.</Text>
            )}
            {showTip && <Text style={[styles.tip, { color: theme.colors.onSurfaceVariant }]}>Your cycle is in its follicular phase.</Text>}
        </View>
    );
}

export function OffPeriodText({ daysSinceLastPeriod }: { daysSinceLastPeriod: number }) {
    const theme = useTheme();

    return (
        <View style={styles.cycleNumberRow}>
            <Text style={[styles.cycleText, { color: theme.colors.onSurface }]}>
                <Text style={[styles.cycleNumber, { color: theme.colors.onSurface }]}>{daysSinceLastPeriod}</Text> days since last period
            </Text>
        </View>
    );
}

export function OnPeriodText({ periodDays }: { periodDays: number }) {
    const theme = useTheme();

    return (
        <View style={styles.cycleNumberRow}>
            <Text style={[styles.cycleText, { color: theme.colors.onSurface }]}>
                Day <Text style={[styles.cycleNumber, { color: theme.colors.onSurface }]}>{periodDays}</Text> of period
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
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
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'flex-start',
    },
    cycleContent: {
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    cycleNumberRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    cycleNumber: {
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 19,
        lineHeight: 25,
        fontWeight: '500',
    },
    cycleText: {
        fontFamily: 'LeagueSpartanRegular',
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 170,
    },
    tip: {
        fontFamily: 'LeagueSpartanRegular',
        fontSize: 12,
        marginTop: 8,
    },
    logButton: {
        minWidth: 100,
        minHeight: 36,
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logButtonText: {
        fontFamily: 'LeagueSpartanMedium',
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
        top: -9,
        left: -9,
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
        fontFamily: 'LeagueSpartanRegular',
        fontSize: 8,
    },
});
