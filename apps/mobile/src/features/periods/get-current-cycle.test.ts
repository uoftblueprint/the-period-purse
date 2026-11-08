import type { Period } from './types';
import { getCurrentCycle } from './get-current-cycle';

const recentPeriod: Period = { start: '2026-10-10', end: '2026-10-14', days: 5 };

describe('getCurrentCycle', () => {
    it('returns unavailable values when no periods have been logged', () => {
        expect(getCurrentCycle([], '2026-10-20', 28)).toEqual({
            isOnPeriod: false,
            periodDay: null,
            daysSinceLastPeriod: null,
            cycleDay: null,
            cycleDonutPercent: null,
        });
    });

    it('returns the current day number while flow is logged today', () => {
        const period = { ...recentPeriod, end: '2026-10-12' };

        expect(getCurrentCycle([period], '2026-10-12', 28)).toMatchObject({
            isOnPeriod: true,
            periodDay: 3,
            daysSinceLastPeriod: 0,
            cycleDay: 3,
            cycleDonutPercent: 11,
        });
    });

    it('keeps the period active through the first no-flow day', () => {
        expect(getCurrentCycle([recentPeriod], '2026-10-15', 28)).toMatchObject({
            isOnPeriod: true,
            periodDay: 6,
            daysSinceLastPeriod: 1,
        });
    });

    it('returns days since the last period after the no-flow gap', () => {
        expect(getCurrentCycle([recentPeriod], '2026-10-16', 28)).toMatchObject({
            isOnPeriod: false,
            periodDay: null,
            daysSinceLastPeriod: 2,
            cycleDay: 7,
            cycleDonutPercent: 25,
        });
    });

    it('calculates elapsed days across a month boundary', () => {
        const period: Period = { start: '2026-02-27', end: '2026-03-01', days: 3 };

        expect(getCurrentCycle([period], '2026-03-04', 28).daysSinceLastPeriod).toBe(3);
    });
});