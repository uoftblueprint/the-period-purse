import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type CycleCardProps = {
    periodDays: number;
    daysSinceLastPeriod: number;
    cycleDonutPercent: number;
    showTip: boolean;
};

type CycleProps = Pick<CycleCardProps, 'periodDays' | 'daysSinceLastPeriod' | 'showTip'>;

export function CycleCard({
    periodDays,
    daysSinceLastPeriod,
    cycleDonutPercent,
    showTip,
}: CycleCardProps) {
    const theme = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.cycleDetails}>
                <Text style={[styles.header, { color: theme.colors.onSurface }]}>Current Cycle:</Text>
                <Cycle
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
                accessibilityLabel={`${cycleDonutPercent}% through the average cycle`}>
                <View style={[styles.dayMarker, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline, shadowColor: theme.colors.shadow }]}>
                    <Text style={[styles.dayMarkerText, { color: theme.colors.onSurface }]}>Day {daysSinceLastPeriod}</Text>
                </View>
            </View>
        </View>
    );
}

export function Cycle({ periodDays, daysSinceLastPeriod, showTip }: CycleProps) {
    const theme = useTheme();

    return (
        <View style={styles.cycleContent}>
            {daysSinceLastPeriod <= periodDays ? (
                <OnPeriodText periodDays={periodDays} />
            ) : (
                <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod} />
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
                Days since last{'\n'}period: <Text style={[styles.cycleNumber, { color: theme.colors.onSurface }]}>{daysSinceLastPeriod}</Text>
            </Text>
        </View>
    );
}

export function OnPeriodText({ periodDays }: { periodDays: number }) {
    const theme = useTheme();

    return (
        <View style={styles.cycleNumberRow}>
            <Text style={[styles.cycleText, { color: theme.colors.onSurface }]}>
                Period days: <Text style={[styles.cycleNumber, { color: theme.colors.onSurface }]}>{periodDays}</Text>
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
