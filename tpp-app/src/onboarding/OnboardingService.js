import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLOW_LEVEL, TRACK_SYMPTOMS, KEYS } from '../home/service/utils/constants.js'
import { initializeEmptyYear } from "../home/service/utils/helpers.js"
import { Symptoms } from '../home/service/utils/models.js';

const OnboardingService = {
    // All APIs for Onboarding below

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
            console.log('There was an error with POSTInitialPeriodLength');
            console.log(e);
        }
    },
    PostInitialPeriodStart: async function(periodStart) {
        try {
            const periodLength = await AsyncStorage.getItem('initialPeriodLength');
            if(periodLength != null && periodStart != null) {
                const periodStartTime = periodStart.getTime();
                let yearsSet = new Set(); 
                let dates = [];

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
            console.log('There was an error with POSTInitialPeriodStart');
            console.log(e);
        }
    }, 
    PostSymptomsToTrack: async function(flow, mood, sleep, cramps, exercise) {
        try {
            if(symptomsPreferences.some((bool) => bool)) {
                let flowRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_FLOW, JSON.stringify(flow));
                let moodRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_MOOD, JSON.stringify(mood));
                let sleepRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_SLEEP, JSON.stringify(sleep));
                let crampsRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_CRAMPS, JSON.stringify(cramps));
                let exerciseRes = await AsyncStorage.setItem(TRACK_SYMPTOMS.TRACK_EXERCISE, JSON.stringify(exercise));
                return Promise.all([flowRes, moodRes, sleepRes, crampsRes, exerciseRes]);
            }
        } catch (e) {
            console.log('There was an error with POSTSymptomsToTrack');
            console.log(e);
        }
    }
};

export default OnboardingService;