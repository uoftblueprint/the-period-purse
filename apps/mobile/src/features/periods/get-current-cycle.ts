import { PERIOD_GAP_DAYS } from './get-period-history';
import type { Period } from './types';

export type CurrentCycle = {
    isOnPeriod: boolean;
    periodDay: number | null;
    daysSinceLastPeriod: number | null;
    cycleDay: number | null;
    cycleDonutPercent: number | null;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dayNumber(date: string): number {
    const [year, month, day] = date.split('-').map(Number);
    return Date.UTC(year, month - 1, day) / MS_PER_DAY;
}

export function getCurrentCycle(
    periods: readonly Period[],
    today: string,
    averageCycleLength: number,
): CurrentCycle {
    const latestPeriod = periods[0];
    if (!latestPeriod) {
        return {
            isOnPeriod: false,
            periodDay: null,
            daysSinceLastPeriod: null,
            cycleDay: null,
            cycleDonutPercent: null,
        };
    }

    const daysSinceLastPeriod = Math.max(0, dayNumber(today) - dayNumber(latestPeriod.end));
    const isOnPeriod = daysSinceLastPeriod < PERIOD_GAP_DAYS;
    const periodDay = isOnPeriod ? dayNumber(today) - dayNumber(latestPeriod.start) + 1 : null;
    const cycleDay = Math.max(1, dayNumber(today) - dayNumber(latestPeriod.start) + 1);


    
    return {
        isOnPeriod,
        periodDay,
        daysSinceLastPeriod,
        cycleDay,
        cycleDonutPercent: Math.min(100, Math.round((cycleDay / averageCycleLength) * 100)),
    };
}