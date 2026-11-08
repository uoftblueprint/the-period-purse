import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
} from '@expo-google-fonts/league-spartan';

import { CycleCard } from '@/components/CycleCard';
import { MinimizedHistoryCard, type PeriodInterval } from '@/components/CycleHistory';
// import { Footer } from '@/components/Footer';
import { getCurrentCycle, usePeriodHistory } from '@/features/periods';

const cycleTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6DC5B5',
        onPrimary: '#111111',
        secondary: '#B9E0D8',
        onSecondary: '#111111',
        secondaryContainer: '#FFDBDB',
        onSecondaryContainer: '#111111',
        tertiary: '#277F73',
        background: '#F8C5D0',
        onBackground: '#111111',
        surface: '#FFF5F2',
        onSurface: '#111111',
        onSurfaceVariant: '#514747',
        outline: '#514747',
        error: '#A64C55',
    },
};

const DEFAULTS = {
    AVG_PERIOD_LENGTH: 5,
    AVG_CYCLE_LENGTH: 28,
};

function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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
    days: number;
    backgroundColor: string;
    children: React.ReactNode;
}) {
    const theme = useTheme();

    return (
        <View style={[styles.infoCard, { backgroundColor }]}>
            <Text style={[styles.infoHeader, { color: theme.colors.onSurface }]}>{header}</Text>
            <View style={styles.infoContent}>
                {children}
                <Text style={[styles.daysText, { color: theme.colors.onSurface }]}>
                    {days} <Text style={[styles.daysUnit, { color: theme.colors.onSurface }]}>days</Text>
                </Text>
            </View>
        </View>
    );
}

export default function CycleScreen() {
    return (
        <PaperProvider theme={cycleTheme}>
            <CyclePage />
        </PaperProvider>
    );
}

function CyclePage() {
    const theme = useTheme();
    const { periods } = usePeriodHistory();
    const [fontsLoaded] = useFonts({
        LeagueSpartanRegular: LeagueSpartan_400Regular,
        LeagueSpartanMedium: LeagueSpartan_500Medium,
        LeagueSpartanSemiBold: LeagueSpartan_600SemiBold,
        LeagueSpartanBold: LeagueSpartan_700Bold,
    });
    const avgCycleLength = DEFAULTS.AVG_CYCLE_LENGTH;
    const currentCycle = getCurrentCycle(periods, getTodayDate(), avgCycleLength);
    const intervals: PeriodInterval[] = periods.map((period) => ({
        start: formatPeriodDate(period.start),
        end: formatPeriodDate(period.end),
        duration: period.days,
    }));

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.pageTitle, { color: theme.colors.onBackground }]}>Cycle Tracking:</Text>

                <CycleCard
                    isOnPeriod={currentCycle.isOnPeriod}
                    periodDays={currentCycle.periodDay}
                    daysSinceLastPeriod={currentCycle.daysSinceLastPeriod}
                    cycleDay={currentCycle.cycleDay}
                    cycleDonutPercent={currentCycle.cycleDonutPercent}
                    showTip={false}
                />

                <View style={styles.cardContainer}>
                    <InfoCard
                        header="Average period"
                        days={DEFAULTS.AVG_PERIOD_LENGTH}
                        backgroundColor={theme.colors.secondaryContainer}>
                        <SymbolView
                            name={{ ios: 'drop.fill', android: 'water_drop', web: 'water_drop' }}
                            size={42}
                            tintColor={theme.colors.onSecondaryContainer}
                        />
                    </InfoCard>
                    <InfoCard
                        header="Average cycle"
                        days={avgCycleLength}
                        backgroundColor={theme.colors.secondary}>
                        <SymbolView
                            name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
                            size={42}
                            tintColor={theme.colors.onSecondary}
                        />
                    </InfoCard>
                </View>

                <View style={styles.element}>
                    <MinimizedHistoryCard intervals={intervals} onPeriod={currentCycle.isOnPeriod} />
                </View>

                {/* <View style={styles.footerContainer}>
                    <Footer />
                </View> */}
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
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 26,
        gap: 24,
    },
    pageTitle: {
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '500',
    },
    cardContainer: {
        flexDirection: 'row',
        gap: 18,
    },
    infoCard: {
        flex: 1,
        minHeight: 132,
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoHeader: {
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
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
        fontFamily: 'LeagueSpartanMedium',
        fontSize: 17,
        lineHeight: 23,
        fontWeight: '500',
    },
    daysUnit: {
        fontFamily: 'LeagueSpartanRegular',
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
