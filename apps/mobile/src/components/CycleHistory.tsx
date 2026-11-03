import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useTheme } from 'react-native-paper';

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
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const visibleIntervals = expanded ? intervals : intervals.slice(0, 2);

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Period History</Text>
            {onPeriod && <Text style={[styles.onPeriodLabel, { color: theme.colors.error }]}>CURRENT PERIOD</Text>}
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
    const theme = useTheme();

    return (
        <View style={[styles.intervalRow, !isFirst && [styles.intervalDivider, { borderTopColor: theme.colors.outline }]]}>
            <Text style={[styles.periodText, { color: theme.colors.onSurface }]}>{interval.start} - {interval.end}</Text>
        </View>
    );
}

export function ShowMore({ expanded, onPress }: { expanded: boolean; onPress: () => void }) {
    const theme = useTheme();

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Show fewer periods' : 'Show more periods'}
            onPress={onPress}
            style={({ pressed }) => [styles.showMoreButton, { backgroundColor: theme.colors.primary }, pressed && styles.pressed]}>
            <Text style={[styles.showMoreText, { color: theme.colors.onPrimary }]}>{expanded ? 'Show Less' : 'See More'}</Text>
        </Pressable>
    );
}

export function NothingLogged() {
    const theme = useTheme();
    return <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>No period history yet.</Text>;
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 22,
    },
    title: {
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 13,
    },
    onPeriodLabel: {
        fontFamily: 'LeagueSpartanBold',
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
    },
    periodText: {
        fontFamily: 'LeagueSpartanRegular',
        fontSize: 21,
        fontWeight: '500',
        textAlign: 'left',
    },
    showMoreButton: {
        minHeight: 48,
        marginTop: 18,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showMoreText: {
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 18,
        fontWeight: '500',
    },
    pressed: {
        opacity: 0.65,
    },
    emptyText: {
        fontFamily: 'LeagueSpartanRegular',
        fontSize: 13,
        paddingVertical: 20,
    },
});
