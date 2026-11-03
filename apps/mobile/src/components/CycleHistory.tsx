import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

export type PeriodInterval = {
    start: string;
    end: string;
    duration: number;
};

type CycleHistoryProps = {
    intervals: PeriodInterval[];
    onPeriod: boolean;
};

export function MinimizedHistoryCard({ intervals, onPeriod }: CycleHistoryProps) {
    const [expanded, setExpanded] = useState(false);
    const visibleIntervals = expanded ? intervals : intervals.slice(0, 2);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Period History</Text>
            {onPeriod && <Text style={styles.onPeriodLabel}>CURRENT PERIOD</Text>}
            {intervals.length === 0 ? (
                <NothingLogged />
            ) : (
                <>
                    {visibleIntervals.map((interval, index) => (
                        <Interval key={`${interval.start}-${interval.end}`} interval={interval} isFirst={index === 0} />
                    ))}
                    {intervals.length > 2 && <ShowMore expanded={expanded} onPress={() => setExpanded(!expanded)} />}
                </>
            )}
        </View>
    );
}

export function Interval({ interval, isFirst }: { interval: PeriodInterval; isFirst: boolean }) {
    return (
        <View style={[styles.intervalRow, !isFirst && styles.intervalDivider]}>
            <Text style={styles.periodText}>{interval.start} - {interval.end}</Text>
        </View>
    );
}

export function ShowMore({ expanded, onPress }: { expanded: boolean; onPress: () => void }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Show fewer periods' : 'Show more periods'}
            onPress={onPress}
            style={({ pressed }) => [styles.showMoreButton, pressed && styles.pressed]}>
            <Text style={styles.showMoreText}>{expanded ? 'Show Less' : 'See More'}</Text>
        </Pressable>
    );
}

export function NothingLogged() {
    return <Text style={styles.emptyText}>No period history yet.</Text>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF5F2',
        borderRadius: 18,
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 22,
    },
    title: {
        fontFamily: 'LeagueSpartanMedium',
        color: '#111111',
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 13,
    },
    onPeriodLabel: {
        fontFamily: 'LeagueSpartanBold',
        color: '#A64C55',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.8,
        marginBottom: 5,
    },
    intervalRow: {
        minHeight: 66,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    intervalDivider: {
        borderTopWidth: 1,
        borderTopColor: '#514747',
    },
    periodText: {
        fontFamily: 'LeagueSpartanRegular',
        color: '#111111',
        fontSize: 21,
        fontWeight: '500',
        textAlign: 'left',
    },
    showMoreButton: {
        minHeight: 48,
        marginTop: 18,
        borderRadius: 24,
        backgroundColor: '#6DC5B5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    showMoreText: {
        fontFamily: 'LeagueSpartanMedium',
        color: '#111111',
        fontSize: 18,
        fontWeight: '500',
    },
    pressed: {
        opacity: 0.65,
    },
    emptyText: {
        fontFamily: 'LeagueSpartanRegular',
        color: '#75696A',
        fontSize: 13,
        paddingVertical: 20,
    },
});
