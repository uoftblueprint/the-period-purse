import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL, KEYS} from "./utils/constants";
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import {getCalendarByYear, getSymptomsFromCalendar} from "./utils/helpers";
import CycleService from "./cycle/CycleService";

/**
 * Returns True if today is the day a period is over, False otherwise i.e. matches period patten of X _ _
 * @return {boolean} Resolves into a boolean indicating if period is over today
 */
const isPeriodOver = async () => {
    const today = TODO;
    const yesterday = TODO;
    const twoDaysEarlier = TODO;
};

/**
 * Returns True if today is the start of a period, False otherwise i.e. matches period pattern of _ _ X
 * @return {boolean} Returns a boolean indicating if period has started today
 */
const isPeriodStarting = async () => {
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

    const todayPeriod = (todaySymptoms.flow != null && todaySymptoms.flow !== FLOW_LEVEL.NONE);
    const yesterdayNoPeriod = (yesterdaySymptoms.flow == null && yesterdaySymptoms.flow === FLOW_LEVEL.NONE);
    const twoDaysEarlierNoPeriod = (twoDaysEarlierSymptoms.flow == null && twoDaysEarlierSymptoms.flow === FLOW_LEVEL.NONE);
    return todayPeriod && yesterdayNoPeriod && twoDaysEarlierNoPeriod;
}

/**
 * Calculates the average period length of the user.
 * @return {Promise}
 */
export const calculateAveragePeriodLength = async () => new Promise( async (resolve, reject) => {
    if (isPeriodOver()) {
        // Get all Years
        let years = [];
        let completeHistory = [];
        years.forEach(async (year) => {
            completeHistory.push.apply(await CycleService.GETCycleHistoryByYear(year));
        });



        await AsyncStorage.Set(
            KEYS.AVERAGE_PERIOD_LENGTH, averagePeriodLength
        ).then(() => {
            console.log(`Initialized ${KEYS.INITIAL_PERIOD_LENGTH}, ${KEYS.AVERAGE_PERIOD_LENGTH} as ${periodLength}`)
            resolve();
        }).catch((error) => {
            console.log(error);
        });
    }
    // Else don't calculate, do nothing
});

/**
 * Calculates the average cycle length of the user.
 * @return {Promise}
 */
export const calculateAverageCycleLength = async () => new Promise( async (resolve, reject) => {
    if (isPeriodStarting()) {
        await AsyncStorage.Set(
            KEYS.AVERAGE_PERIOD_LENGTH, averagePeriodLength
        ).then(() => {
            console.log(`Initialized ${KEYS.INITIAL_PERIOD_LENGTH}, ${KEYS.AVERAGE_PERIOD_LENGTH} as ${periodLength}`)
            resolve();
        }).catch((error) => {
            console.log(error);
        });
    }
    // Else don't calculate, do nothing
});