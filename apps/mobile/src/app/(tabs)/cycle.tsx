import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CycleCard } from '@/components/CycleCard';
import { MinimizedHistoryCard, type PeriodInterval } from '@/components/CycleHistory';
import { Footer } from '@/components/footer';
import { theme, type AppTheme } from '@/constants/theme';
import { getCurrentCycle, getPeriodAverages, usePeriodHistory } from '@/features/periods';
import { useToday } from '@/hooks/use-today';

const DEFAULTS = {
    AVG_PERIOD_LENGTH: 5,
    AVG_CYCLE_LENGTH: 28,
};

function formatPeriodDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}

function InfoCard({
    header,
    days,
    backgroundColor,
    children,
}: {
    header: string;
    days: number | null;
    backgroundColor: string;
    children: React.ReactNode;
}) {
    const theme = useTheme<AppTheme>();

    return (
        <View style={[styles.infoCard, { backgroundColor }]}>
            <Text style={[theme.fonts.titleMedium, styles.infoHeader, { color: theme.colors.onSurface }]}>{header}</Text>
            <View style={styles.infoContent}>
                {children}
                <Text style={[theme.fonts.titleSmall, styles.daysText, { color: theme.colors.onSurface }]}>
                    {days === null ? '—' : <>{days} <Text style={[theme.fonts.bodyMedium, styles.daysUnit, { color: theme.colors.onSurface }]}>days</Text></>}
                </Text>
            </View>
        </View>
    );
}

export default function CycleScreen() {
    return <CyclePage />;
}

function CyclePage() {
    const theme = useTheme<AppTheme>();
    const { periods, isLoading, error } = usePeriodHistory();
    const today = useToday();
    const averages = getPeriodAverages(
        periods,
        DEFAULTS.AVG_PERIOD_LENGTH,
        DEFAULTS.AVG_CYCLE_LENGTH,
    );
    const avgCycleLength = averages.cycleLength;
    const currentCycle = getCurrentCycle(periods, today, avgCycleLength);
    const completedPeriodCount = periods.length - (currentCycle.isOnPeriod ? 1 : 0);
    const periodLength = getPeriodAverages(
        periods,
        DEFAULTS.AVG_PERIOD_LENGTH,
        DEFAULTS.AVG_CYCLE_LENGTH,
        { excludeLatestPeriod: currentCycle.isOnPeriod },
    ).periodLength;
    // The latest period is still active, so keep it out of completed period history.
    const completedPeriods = currentCycle.isOnPeriod ? periods.slice(1) : periods;
    const intervals: PeriodInterval[] = completedPeriods.map((period) => ({
        start: formatPeriodDate(period.start),
        end: formatPeriodDate(period.end),
        duration: period.days,
    }));

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[theme.fonts.headlineMedium, styles.pageTitle, { color: theme.colors.onBackground }]}>Cycle Tracking:</Text>

                <CycleCard
                    isOnPeriod={currentCycle.isOnPeriod}
                    periodDays={currentCycle.periodDay}
                    daysSinceLastPeriod={currentCycle.daysSinceLastPeriod}
                    cycleDay={currentCycle.cycleDay}
                    cycleDonutPercent={currentCycle.cycleDonutPercent}
                    isLoading={isLoading}
                    hasError={error !== null}
                    showTip={false}
                />

                <View style={styles.cardContainer}>
                    <InfoCard
                        header="Average period"
                        days={completedPeriodCount > 0 ? periodLength : null}
                        backgroundColor={theme.colors.surfaceVariant}>
                        <SymbolView
                            name={{ ios: 'drop.fill', android: 'water_drop', web: 'water_drop' }}
                            size={42}
                            tintColor={theme.colors.onSurface}
                        />
                    </InfoCard>
                    <InfoCard
                        header="Average cycle"
                        days={periods.length > 1 ? avgCycleLength : null}
                        backgroundColor={theme.colors.surfaceVariant}>
                        <SymbolView
                            name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
                            size={42}
                            tintColor={theme.colors.onSurface}
                        />
                    </InfoCard>
                </View>

                <View style={styles.element}>
                    <MinimizedHistoryCard intervals={intervals} />
                </View>

                {<View style={styles.footerContainer}>
                    <Footer />
                </View>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        width: '100%',
        maxWidth: 620,
        alignSelf: 'center',
        minHeight: '100%',
        paddingHorizontal: theme.spacing.three,
        paddingTop: theme.spacing.four,
        paddingBottom: theme.spacing.four,
        gap: theme.spacing.three,
    },
    pageTitle: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '500',
        textAlign: 'left',
        marginLeft: theme.spacing.two,
    },
    cardContainer: {
        flexDirection: 'row',
        gap: theme.spacing.two,
    },
    infoCard: {
        flex: 1,
        minHeight: 132,
        borderRadius: theme.radii.md,
        paddingHorizontal: theme.spacing.two,
        paddingVertical: theme.spacing.two,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoHeader: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: theme.spacing.three,
    },
    infoContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    daysText: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: '500',
    },
    daysUnit: {
        fontSize: 14,
        fontWeight: '500',
    },
    element: {
        width: '100%',
    },
    footerContainer: {
        marginBottom: 70,
    },
});
