import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLOW_LEVEL, TRACK_SYMPTOMS, KEYS } from './utils/constants.js'
import { initializeEmptyYear } from "./utils/helpers.js"
import { Symptoms } from './utils/models.js';

/**
 * Initializes user's initial period length and average period length. 
 * @param periodLength a number representing the period length
 * @returns a promise resolving when the multiset operation is complete 
 */
export const PostInitialPeriodLength = async (periodLength) => new Promise( async (resolve, reject) => {
    try {
        if(periodLength) {
            periodLength = JSON.stringify(periodLength);
            await AsyncStorage.multiSet([
                [KEYS.INITIAL_PERIOD_LENGTH, periodLength], 
                [KEYS.AVERAGE_PERIOD_LENGTH, periodLength]
            ]).then(() => {
                    console.log(`Initialized ${KEYS.INITIAL_PERIOD_LENGTH}, ${KEYS.AVERAGE_PERIOD_LENGTH} as ${periodLength}`)
                    resolve();
                });
        }
    } catch (e) {
        console.log(`POSTInitialPeriodLength error: ${JSON.stringify(e)}`);
        reject();
    }
})

/**
 * Initializes entries for the user's last period.  
 * This only happens when the user has given inputs for both their 
 * initial period length and the start date of their last period. 
 * @param periodStart date representing the start date of their last period 
 * @returns a promise resolving when the multiset operation is complete 
 */
export const PostInitialPeriodStart = async (periodStart) => new Promise ( async (resolve, reject) => {
    try {
        const periodLength = await AsyncStorage.getItem(KEYS.INITIAL_PERIOD_LENGTH);
        if(periodLength && periodStart) {
            const periodStartTime = periodStart.getTime();
            let yearsSet = new Set(); 
            let dates = [];

            // Use timestamps to populate the list of dates to avoid 
            // messing up when dealing with last day of a month and/or year
            for(let i = 0; i < periodLength; i++) {
                const currentDate = new Date(periodStartTime + (1000 * 60 * 60 * 24 * i));
                yearsSet.add(currentDate.getFullYear());
                dates.push(currentDate);
            }
            
            let yearDicts = {};
            yearsSet.forEach(year => {
                yearDicts[year] = initializeEmptyYear(year);
            });

            // Initialize the correct daily logs 
            dates.forEach(date => {
                yearDicts[date.getFullYear()][date.getMonth()][date.getDate() - 1] = new Symptoms(FLOW_LEVEL.MEDIUM);
            });

            let allSet = [];
            yearsSet.forEach(async (year) => {
                allSet.push([JSON.stringify(year), JSON.stringify(yearDicts[year])]);
            })
            
            await AsyncStorage.multiSet(allSet).then(() => {
                    console.log("Initialized the first loggings");
                    resolve();
                });
        }
    }
    catch (e) {
        console.log(`POSTInitialPeriodStart error: ${JSON.stringify(e)}`);
        reject();
    }
})

/**
 * Initializes the user's initial tracking preferences for what symptoms to track. 
 * At least one symptom has to be selected for initialization to happen. 
 * @param flow boolean representing whether to track flow
 * @param mood boolean representing whether to track mood 
 * @param sleep boolean representing whether to track sleep
 * @param cramps boolean representing whether to track cramps
 * @param exercise boolean representing whether to track exercise 
 * @returns a promise resolving when the multiset operation is complete 
 */
export const PostSymptomsToTrack = async (flow, mood, sleep, cramps, exercise) => new Promise( async (resolve, reject) => {
    try {
        if([flow, mood, sleep, cramps, exercise].some((bool) => bool)) {
            await AsyncStorage.multiSet([
                [TRACK_SYMPTOMS.FLOW, JSON.stringify(flow)],
                [TRACK_SYMPTOMS.MOOD, JSON.stringify(mood)],
                [TRACK_SYMPTOMS.SLEEP, JSON.stringify(sleep)],
                [TRACK_SYMPTOMS.CRAMPS, JSON.stringify(cramps)],
                [TRACK_SYMPTOMS.EXERCISE, JSON.stringify(exercise)]
            ]).then(() => {
                    console.log("Initialized tracking preferences");
                    resolve();
                });
        }
    } catch (e) {
        console.log(`POSTSymptomsToTrack error: ${JSON.stringify(e)}`);
        reject();
    }
})