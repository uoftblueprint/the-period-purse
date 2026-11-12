import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
} from '@expo-google-fonts/league-spartan';

import { CycleCard } from '@/components/CycleCard';
import { MinimizedHistoryCard, type PeriodInterval } from '@/components/CycleHistory';
import { Footer } from '@/components/Footer';

const DEFAULTS = {
    AVG_PERIOD_LENGTH: 5,
    AVG_CYCLE_LENGTH: 28,
    DAYS_SINCE_LAST_PERIOD: 12,
    INTERVALS: [
        { start: 'Oct 12', end: 'Oct 16', duration: 5 },
        { start: 'Sep 14', end: 'Sep 18', duration: 5 },
        { start: 'Aug 17', end: 'Aug 21', duration: 5 },
        { start: 'Jul 20', end: 'Jul 24', duration: 5 },
    ] satisfies PeriodInterval[],
};

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
    return (
        <View style={[styles.infoCard, { backgroundColor }]}>
            <Text style={styles.infoHeader}>{header}</Text>
            <View style={styles.infoContent}>
                {children}
                <Text style={styles.daysText}>
                    {days} <Text style={styles.daysUnit}>days</Text>
                </Text>
            </View>
        </View>
    );
}

export default function CycleScreen() {
    const [fontsLoaded] = useFonts({
        LeagueSpartanRegular: LeagueSpartan_400Regular,
        LeagueSpartanMedium: LeagueSpartan_500Medium,
        LeagueSpartanSemiBold: LeagueSpartan_600SemiBold,
        LeagueSpartanBold: LeagueSpartan_700Bold,
    });
    const [loaded] = useState(true);
    const [avgPeriodLength] = useState(DEFAULTS.AVG_PERIOD_LENGTH);
    const [avgCycleLength] = useState(DEFAULTS.AVG_CYCLE_LENGTH);
    const daysSinceLastPeriod = DEFAULTS.DAYS_SINCE_LAST_PERIOD;
    const periodDays = DEFAULTS.AVG_PERIOD_LENGTH;
    const cycleDonutPercent = Math.round((daysSinceLastPeriod / avgCycleLength) * 100);

    if (!loaded || !fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.pageTitle}>Cycle Tracking:</Text>

                <CycleCard
                    periodDays={periodDays}
                    daysSinceLastPeriod={daysSinceLastPeriod}
                    cycleDonutPercent={cycleDonutPercent}
                    showTip={false}
                />

                <View style={styles.cardContainer}>
                    <InfoCard
                        header="Average period"
                        days={avgPeriodLength}
                        backgroundColor="#FFDBDB">
                        <SymbolView
                            name={{ ios: 'drop.fill', android: 'water_drop', web: 'water_drop' }}
                            size={42}
                            tintColor="#000000"
                        />
                    </InfoCard>
                    <InfoCard
                        header="Average cycle"
                        days={avgCycleLength}
                        backgroundColor="#B9E0D8">
                        <SymbolView
                            name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
                            size={42}
                            tintColor="#000000"
                        />
                    </InfoCard>
                </View>

                <View style={styles.element}>
                    <MinimizedHistoryCard intervals={DEFAULTS.INTERVALS} onPeriod={false} />
                </View>

                <View style={styles.footerContainer}>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8C5D0',
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
        color: '#111111',
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
        color: '#111111',
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
        color: '#111111',
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
