import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingService = {
    // All APIs for Onboarding below

    PostInitialPeriodLength: async function(periodLength) {
        try {
            if(periodLength != null) {
                periodLength = JSON.stringify(periodLength)
                const initialRes = await AsyncStorage.setItem('initialPeriodLength', periodLength);
                const averageRes = AsyncStorage.setItem('averagePeriodLength', periodLength);

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
                let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                const periodStartTime = periodStart.getTime();
                let [years, months, days] = [[], [], []];

                for(let i = 0; i < periodLength; i++) {
                    const currentTime = periodStartTime + (1000 * 60 * 60 * 24 * i);
                    const currentDate = new Date(currentTime);
                    years.push(currentDate.getFullYear());
                    months.push(currentDate.getMonth());
                    days.push(currentDate.getDate()); 
                }

                const yearDicts = {};
                const yearsSet = new Set(years); 
                yearsSet.forEach(year => {
                    // Initializes a list of 12 nulls for 12 months
                    yearDicts[year] = Array.apply(null, Array(12));

                    // Handles leap year situation for February 
                    if(year % 4 === 0 || (year % 100 === 0 && year % 400 === 0))
                        daysPerMonth[1] = 29;
                    else
                        daysPerMonth[1] = 28;
                    
                    for (let i = 0; i < 12; i++) 
                        yearDicts[year][i] = Array.apply(null, Array(daysPerMonth[i]));
                });

                // Initialize the correct daily logs 
                for (let i = 0; i < years.length; i++) 
                    yearDicts[years[i]][months[i]][days[i] - 1] = {"Flow": "MEDIUM"};

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
            const symptomsPreferences = [flow, mood, sleep, cramps, exercise];
            if(symptomsPreferences.some((bool) => bool)) {
                const symptoms = ['trackFlow', 'trackMood', 'trackSleep', 'trackCramps', 'trackExercise'];
                let res = [];
                for (let i = 0; i < symptoms.length; i++) {
                    let currRes = await AsyncStorage.setItem(symptoms[i], JSON.stringify(symptomsPreferences[i]));
                    res.push(currRes); 
                    console.log("Initialized preferences for " + symptoms[i]);
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