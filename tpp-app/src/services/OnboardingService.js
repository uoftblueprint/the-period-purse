import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLOW_LEVEL, TRACK_SYMPTOMS, KEYS } from './utils/constants.js'
import { initializeEmptyYear } from "./utils/helpers.js"
import { Symptoms } from './utils/models.js';

const OnboardingService = {
    /**
     * Initializes user's initial period length and average period length. 
     * @param periodLength number representing the period length
     * @returns a promise resolving when the two set operations are complete 
     */
    PostInitialPeriodLength: async function(periodLength) {
        try {
            if(periodLength != null) {
                periodLength = JSON.stringify(periodLength)
                const initialRes = await AsyncStorage.setItem(KEYS.INITIAL_PERIOD_LENGTH, periodLength);
                const averageRes = AsyncStorage.setItem(KEYS.AVERAGE_PERIOD_LENGTH, periodLength);

                console.log('Initialized initialPeriodLength and averagePeriodLength as ' + periodLength);
                return Promise.all([initialRes, averageRes]);
            }
        } catch (e) {
            console.log(`POSTInitialPeriodLength error: ${JSON.stringify(e)}`);
            reject("Something went wrong");
        }
    },
    /**
     * Initializes entries for the user's last period.  
     * This only happens when the user has given inputs for both their 
     * initial period length and the start date of their last period. 
     * @param periodStart date representing the start date of their last period 
     * @returns a promise resolving when the set operation is complete 
     */
    PostInitialPeriodStart: async function(periodStart) {
        try {
            const periodLength = await AsyncStorage.getItem('initialPeriodLength');
            if(!periodLength && !periodStart) {
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

                let allRes = [];
                yearsSet.forEach(async (year) => {
                    const res = await AsyncStorage.setItem(JSON.stringify(year), JSON.stringify(yearDicts[year]));
                    allRes.push(res);
                })
                console.log("Initialized the first loggings");
                return Promise.all(allRes);
            }
        }
        catch (e) {
            console.log(`POSTInitialPeriodStart error: ${JSON.stringify(e)}`);
            reject("Something went wrong");
        }
    }, 
    /**
     * Initializes the user's initial tracking preferences for what symptoms to track. 
     * At least one symptom has to be selected for initialization to happen. 
     * @param flow boolean representing whether to track flow
     * @param mood boolean representing whether to track mood 
     * @param sleep boolean representing whether to track sleep
     * @param cramps boolean representing whether to track cramps
     * @param exercise boolean representing whether to track exercise 
     * @returns a promise resolving when all the set operations are complete 
     */
    PostSymptomsToTrack: async function(flow, mood, sleep, cramps, exercise) {
        try {
            if([flow, mood, sleep, cramps, exercise].some((bool) => bool)) {
                let flowRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_FLOW, JSON.stringify(flow));
                let moodRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_MOOD, JSON.stringify(mood));
                let sleepRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_SLEEP, JSON.stringify(sleep));
                let crampsRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_CRAMPS, JSON.stringify(cramps));
                let exerciseRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_EXERCISE, JSON.stringify(exercise));
                console.log("Initialized tracking preferences");
                return Promise.all([flowRes, moodRes, sleepRes, crampsRes, exerciseRes]);
            }
        } catch (e) {
            console.log(`POSTSymptomsToTrack error: ${JSON.stringify(e)}`);
            reject("Something went wrong");
        }
    }
};

export default OnboardingService;