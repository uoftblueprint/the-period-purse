import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    return (
        <View style={styles.card}>
            <View style={styles.cycleDetails}>
                <Text style={styles.header}>Current Cycle:</Text>
                <Cycle
                    periodDays={periodDays}
                    daysSinceLastPeriod={daysSinceLastPeriod}
                    showTip={showTip}
                />
                <Pressable accessibilityRole="button" style={styles.logButton}>
                    <Text style={styles.logButtonText}>Log Period</Text>
                </Pressable>
            </View>
            <View
                style={styles.cycleRing}
                accessibilityRole="progressbar"
                accessibilityLabel={`${cycleDonutPercent}% through the average cycle`}>
                <View style={styles.dayMarker}>
                    <Text style={styles.dayMarkerText}>Day {daysSinceLastPeriod}</Text>
                </View>
            </View>
        </View>
    );
}

export function Cycle({ periodDays, daysSinceLastPeriod, showTip }: CycleProps) {
    return (
        <View style={styles.cycleContent}>
            {daysSinceLastPeriod <= periodDays ? (
                <OnPeriodText periodDays={periodDays} />
            ) : (
                <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod} />
            )}
            {showTip && <Text style={styles.tip}>Your cycle is in its follicular phase.</Text>}
        </View>
    );
}

export function OffPeriodText({ daysSinceLastPeriod }: { daysSinceLastPeriod: number }) {
    return (
        <View style={styles.cycleNumberRow}>
            <Text style={styles.cycleText}>
                Days since last{'\n'}period: <Text style={styles.cycleNumber}>{daysSinceLastPeriod}</Text>
            </Text>
        </View>
    );
}

export function OnPeriodText({ periodDays }: { periodDays: number }) {
    return (
        <View style={styles.cycleNumberRow}>
            <Text style={styles.cycleText}>
                Period days: <Text style={styles.cycleNumber}>{periodDays}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF5F2',
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
        color: '#111111',
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
        color: '#111111',
        fontSize: 19,
        lineHeight: 25,
        fontWeight: '500',
    },
    cycleText: {
        fontFamily: 'LeagueSpartanRegular',
        color: '#111111',
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 170,
    },
    tip: {
        fontFamily: 'LeagueSpartanRegular',
        color: '#4C6964',
        fontSize: 12,
        marginTop: 8,
    },
    logButton: {
        minWidth: 100,
        minHeight: 36,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#6DC5B5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logButtonText: {
        fontFamily: 'LeagueSpartanMedium',
        color: '#111111',
        fontSize: 13,
        fontWeight: '500',
    },
    cycleRing: {
        width: 152,
        height: 152,
        borderWidth: 12,
        borderRadius: 76,
        borderColor: '#6DC5B5',
        backgroundColor: '#FFF5F2',
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
        backgroundColor: '#FFF5F2',
        borderWidth: 2,
        borderColor: '#7B7777',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.18,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    dayMarkerText: {
        fontFamily: 'LeagueSpartanRegular',
        color: '#111111',
        fontSize: 8,
    },
});
