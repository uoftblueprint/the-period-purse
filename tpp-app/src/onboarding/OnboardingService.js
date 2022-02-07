import AsyncStorage from '@react-native-async-storage/async-storage';

// console.log(showAsyncStorageContentInDev())

const OnboardingService = {
    // All APIs for Onboarding should be here

    PostInitialPeriodLength: async function(periodLength) {
        try {
            periodLength = JSON.stringify(periodLength)
            const v = await AsyncStorage.setItem('initialPeriodLength', periodLength);
            AsyncStorage.setItem('averagePeriodLength', periodLength);
            console.log('Setting initialPeriodLength and averagePeriodLength as ' + periodLength);
            return v;
        } catch (e) {
            console.log('There was an error with POSTInitialPeriodLength');
        }
    },
    PostInitialPeriodStart: async function(periodStart) {
        try {
            const periodLength = await AsyncStorage.getItem('initialPeriodLength');
            if(periodLength != null) {
                let year = Array.apply([null], Array(12))
                let logs = [];
                for (let i = 0; i < parseInt(periodLength); i++) {
                    logs.push({"Flow": "MEDIUM"}); 
                }
                year[periodStart - 1] = logs;
                const v = await AsyncStorage.setItem("2022", JSON.stringify(year));
                console.log("Done");
                return v;
            }
        }
        catch (e) {

        }
    }, 
    POSTSymptomsToTrack: async function(flow, mood, sleep, cramps, exercise) {
        try {
            const symptomsPreferences = [flow, mood, sleep, cramps, exercise];
            const symptoms = ['trackFlow', 'trackMood', 'trackSleep', 'trackCramps', 'trackExercise'];
            for (let i = 0; i < symptoms.length; i++) {
                const v = await AsyncStorage.setItem(symptoms[i], JSON.stringify(symptomsPreferences[i]));
                console.log(v);
            }
        } catch (e) {

        }
    }

};

export default OnboardingService;