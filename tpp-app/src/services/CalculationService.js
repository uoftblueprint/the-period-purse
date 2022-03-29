import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL, KEYS} from "./utils/constants";
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import {getCalendarByYear, getDaysDiffInclusive, getSymptomsFromCalendar} from "./utils/helpers";
import CycleService from "./cycle/CycleService";
import { GETStoredYears } from "./utils/helpers";


/**
 * Returns Array of the Symptoms of the last three days
 * @return {Array} of size 3
 */
const GETLastThreeDaysSymptoms = async () => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const twoDaysEarlier = subDays(today, 2);

    var calendar = await getCalendarByYear(today.getFullYear());
    const todaySymptoms = await getSymptomsFromCalendar(
        calendar,
        today.getDay(),
        today.getMonth() + 1,
        today.getFullYear()
    );

    if (today.getFullYear() !== yesterday.getFullYear()) {
        calendar = await getCalendarByYear(yesterday.getFullYear());
    }
    const yesterdaySymptoms = await getSymptomsFromCalendar(
        calendar,
        yesterday.getDay(),
        yesterday.getMonth() + 1,
        yesterday.getFullYear()
    );

    if (yesterday.getFullYear() !== twoDaysEarlier.getFullYear()) {
        calendar = await getCalendarByYear(twoDaysEarlier.getFullYear());
    }
    const twoDaysEarlierSymptoms = await getSymptomsFromCalendar(
        calendar,
        twoDaysEarlier.getDay(),
        twoDaysEarlier.getMonth() + 1,
        twoDaysEarlier.getFullYear()
    );

    return [twoDaysEarlierSymptoms, yesterdaySymptoms, todaySymptoms];
};

/**
 * Returns True if today is the day a period is over, False otherwise i.e. matches period patten of X _ _
 * @return {boolean} Resolves into a boolean indicating if period is over today
 */
export const isPeriodOver = async () => {
    const lastThreeDaysSymptoms = await GETLastThreeDaysSymptoms();
    const twoDaysEarlierSymptoms = lastThreeDaysSymptoms[0];
    const yesterdaySymptoms = lastThreeDaysSymptoms[1];
    const todaySymptoms = lastThreeDaysSymptoms[2];

    const todayPeriod = (todaySymptoms.flow == null && todaySymptoms.flow === FLOW_LEVEL.NONE);
    const yesterdayNoPeriod = (yesterdaySymptoms.flow == null && yesterdaySymptoms.flow === FLOW_LEVEL.NONE);
    const twoDaysEarlierNoPeriod = (twoDaysEarlierSymptoms.flow != null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE);
    return todayPeriod && yesterdayNoPeriod && twoDaysEarlierNoPeriod;
};

/**
 * Returns True if today is the start of a period, False otherwise i.e. matches period pattern of _ _ X
 * @return {boolean} Returns a boolean indicating if period has started today
 */
export const isPeriodStarting = async () => {
    const lastThreeDaysSymptoms = await GETLastThreeDaysSymptoms();
    const twoDaysEarlierSymptoms = lastThreeDaysSymptoms[0];
    const yesterdaySymptoms = lastThreeDaysSymptoms[1];
    const todaySymptoms = lastThreeDaysSymptoms[2];

    const todayPeriod = (todaySymptoms.flow != null && todaySymptoms.flow !== FLOW_LEVEL.NONE);
    const yesterdayNoPeriod = (yesterdaySymptoms.flow == null && yesterdaySymptoms.flow === FLOW_LEVEL.NONE);
    const twoDaysEarlierNoPeriod = (twoDaysEarlierSymptoms.flow == null && twoDaysEarlierSymptoms.flow === FLOW_LEVEL.NONE);
    return todayPeriod && yesterdayNoPeriod && twoDaysEarlierNoPeriod;
}

/**
 * Calculates the average period length of the user.
 */
export const calculateAveragePeriodLength = async () => new Promise( async (resolve, reject) => {
    // Only calculate Average Period Length once period is over
    if (isPeriodOver()) {
        // Record all period intervals
        let completeHistory = [];

        // Get all Years
        GETStoredYears()
            .then((years) => {
                years.forEach(async (year) => {
                    completeHistory.push.apply(await CycleService.GETCycleHistoryByYear(year));
                });
            })
            .catch((e) => {
                console.log(`calculateAveragePeriodLength error: ${JSON.stringify(error)}`);
                reject();
            });

        // Use reduce to find average
        const averagePeriodLength = completeHistory.reduce(function (sum, interval) {
            return sum + interval.periodDays;
        }, 0) / completeHistory.length;

        await AsyncStorage.Set(
            KEYS.AVERAGE_PERIOD_LENGTH, JSON.stringify(averagePeriodLength)
        ).then(() => {
            console.log(`Recalculated ${KEYS.AVERAGE_PERIOD_LENGTH} as ${averagePeriodLength}`)
            resolve();
        }).catch((error) => {
            console.log(`calculateAveragePeriodLength error: ${JSON.stringify(error)}`);
            reject();
        });
    }

    // Else don't calculate, do nothing
});

/**
 * Calculates the average cycle length of the user.
 */
export const calculateAverageCycleLength = async () => new Promise( async (resolve, reject) => {
    // Only calculate Average Cycle Length once period is starting and cycle is over
    if (isPeriodStarting()) {
        let completeHistory = [];

        // Get all Years
        GETStoredYears()
            .then((years) => {
                years.forEach(async (year) => {
                    completeHistory.push.apply(await CycleService.GETCycleHistoryByYear(year));
                });
            })
            .catch((e) => {
                console.log(`calculateAverageCycleLength error: ${JSON.stringify(error)}`);
                reject();
            });

        // Use map and reduce to find average
        const averageCycleLength = completeHistory
            // Map to difference of days
            .map((interval, index) => {
                index === 0 ? 0 : getDaysDiffInclusive(completeHistory[index-1].start, interval.start)
             })
            // Remove 0th index
            .slice(1)
            // Find average
            .reduce((sum, cycleDays) => {
                return sum + cycleDays;
        }, 0) / completeHistory.length;

        await AsyncStorage.Set(
            KEYS.AVERAGE_CYCLE_LENGTH, JSON.stringify(averageCycleLength)
        ).then(() => {
            console.log(`Recalculated ${KEYS.AVERAGE_CYCLE_LENGTH} as ${averageCycleLength}`)
            resolve();
        }).catch((error) => {
            console.log(`calculateAverageCycleLength error: ${JSON.stringify(error)}`);
            reject();
        });
    }

    // Else don't calculate, do nothing
});