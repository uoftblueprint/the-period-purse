import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '@/constants/theme';

export type PeriodInterval = {
    start: string;
    end: string;
    duration: number;
};

type CycleHistoryProps = {
    intervals: PeriodInterval[];
};

export function MinimizedHistoryCard({ intervals, onPeriod }: CycleHistoryProps) {
    const theme = useTheme<AppTheme>();
    const [expanded, setExpanded] = useState(false);
    const visibleIntervals = expanded ? intervals : intervals.slice(0, 2);

    return (
        <View style={[
            styles.card,
            {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: theme.radii.md,
            },
        ]}>
            <Text style={[theme.fonts.titleMedium, styles.title, { color: theme.colors.onSurface }]}>
                Period History
            </Text>
            {onPeriod && (
                <Text style={[theme.fonts.labelSmall, styles.onPeriodLabel, { color: theme.colors.error }]}>
                    CURRENT PERIOD
                </Text>
            )}
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
    const theme = useTheme<AppTheme>();

    return (
        <View style={[styles.intervalRow, !isFirst && { borderTopColor: theme.colors.outlineVariant }, !isFirst && styles.intervalDivider]}>
            <Text style={[theme.fonts.bodyLarge, styles.periodText, { color: theme.colors.onSurface }]}>{interval.start} - {interval.end}</Text>
        </View>
    );
}

export function ShowMore({ expanded, onPress }: { expanded: boolean; onPress: () => void }) {
    const theme = useTheme<AppTheme>();

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Show fewer periods' : 'Show more periods'}
            onPress={onPress}
            style={({ pressed }) => [styles.showMoreButton, { backgroundColor: theme.colors.primary, borderRadius: theme.radii.full }, pressed && styles.pressed]}>
            <Text style={[theme.fonts.labelLarge, styles.showMoreText, { color: theme.colors.onPrimary }]}>{expanded ? 'Show Less' : 'See More'}</Text>
        </Pressable>
    );
}

export function NothingLogged() {
    const theme = useTheme<AppTheme>();

    return <Text style={[theme.fonts.bodySmall, styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>No period history yet.</Text>;
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 22,
    },
    title: {
        fontSize: 22,
        lineHeight: 28,
        marginBottom: 13,
    },
    onPeriodLabel: {
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
        fontSize: 21,
        fontWeight: '500',
        textAlign: 'left',
    },
    showMoreButton: {
        minHeight: 48,
        marginTop: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showMoreText: {
        fontSize: 18,
        fontWeight: '500',
    },
    pressed: {
        opacity: 0.65,
    },
    emptyText: {
        fontSize: 13,
        paddingVertical: 20,
    },
});
