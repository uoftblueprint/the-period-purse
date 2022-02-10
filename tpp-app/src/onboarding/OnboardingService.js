import AsyncStorage from '@react-native-async-storage/async-storage';

// console.log(showAsyncStorageContentInDev())

const OnboardingService = {
    // All APIs for Onboarding below

    PostInitialPeriodLength: async function(periodLength) {
        try {
            if(periodLength != null) {
                periodLength = JSON.stringify(periodLength)
                const initialRes = await AsyncStorage.setItem('initialPeriodLength', periodLength);
                const averageRes = AsyncStorage.setItem('averagePeriodLength', periodLength);

                console.log('Setting initialPeriodLength and averagePeriodLength as ' + periodLength);
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
                let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                const [month, day, year] = [periodStart.getMonth(), periodStart.getDate(), periodStart.getFullYear()];
                
                // Handles leap year situation for February 
                if(year % 4 === 0 || (year % 100 === 0 && year % 400 === 0))
                    daysPerMonth[1] = 29;
                
                // Initializes a list of 12 nulls 
                let yearArr = Array.apply(null, Array(12)) 

                // Initialize the correct daily logs 
                for (let i = 0; i < yearArr.length; i++) {
                    yearArr[i] = Array.apply(null, Array(daysPerMonth[i]));
                    if(i === month) {
                        let startIndex = day - 1;
                        for (let j = 0; j < periodLength; j++) {
                            yearArr[i][startIndex] = {"Flow": "MEDIUM"};
                            startIndex += 1;
                        }
                    }
                }
                const res = await AsyncStorage.setItem(JSON.stringify(year), JSON.stringify(yearArr));
                console.log("Initializing the initial loggings");
                return res;
            }
        }
        catch (e) {
            console.log('There was an error with POSTInitialPeriodStart');
            console.log(e);
        }
    }, 
    PostSymptomsToTrack: async function(flow, mood, sleep, cramps, exercise) {
        try {
            const symptomsPreferences = [flow, mood, sleep, cramps, exercise];
            if(symptomsPreferences.some((bool) => bool)) {
                const symptoms = ['trackFlow', 'trackMood', 'trackSleep', 'trackCramps', 'trackExercise'];
                let res = [];
                for (let i = 0; i < symptoms.length; i++) {
                    let currRes = await AsyncStorage.setItem(symptoms[i], JSON.stringify(symptomsPreferences[i]));
                    res.push(currRes); 
                    console.log("Setting preferences for " + symptoms[i]);
                }
                return Promise.all(res);
            }
        } catch (e) {
            console.log('There was an error with POSTSymptomsToTrack');
            console.log(e);
        }
    }
};

export default OnboardingService;