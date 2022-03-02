import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS, TRACK_SYMPTOMS } from './utils/constants.js'

// - Any key you use should not be hardcoded, put it in constants.js and import it like
//      - import { KEYS } from './utils/constants.js'
// - For testing, I would execute these functions with placeholder arguments when a random button on the front-end is
//   pressed and then check in react-native-debugger to ensure that the key-value was actually stored in AsyncStorage
// - After testing before making a PR, remove your testing code and placeholder arguments

/**
 * Makes API request to AsyncStorage to access symptoms for the entire year
 * @param year: number
 * @returns: object
 */
export const GETYearData = async (year) => new Promise( async (resolve, reject) => {
    // https://github.com/uoftblueprint/the-period-purse/pull/95#discussion_r813506726
    // But this will likely end up as a helper function that Kenneth needs to use for the Cycle, so talk to him about
    //    whether to have it as a helper that you both call or you implement it and he calls this endpoint
    // Essentially retrieve the calendar for a given year and convert each day's data into a Symptom object for better front-end handling

    const yearData = JSON.parse(await AsyncStorage.getItem(year.toString()));

    // yearData could be null
    if (yearData) {
        yearData.map((month) => {
            month.map((day) => {
                return day ? new Symptoms(day) : new Symptoms();
            })
        })
        return yearData;
    }

    return null;
})

/**
 * Saves user's current selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user exits calendar page in any way.
 * @param selectedView: string
 * @param selectedMonth: number
 * @param selectedYear: number
 */
// - Simply store the given values of the three params with keys
// - Remember for args we pass in 1 for Jan, not 0 for Jan despite the storage working the opposite with 0 as index for Jan
// - So even though you receive 1 for Jan as an argument you want to store selectedMonth=0
// - Year is normal no weird indexes
// - selectedView should be one of TRACK_SYMPTOMS which Helen added in her PR: https://github.com/uoftblueprint/the-period-purse/pull/94/files
//      - may want to return error if Selected View is not one of TRACK_SYMPTOMS

export const POSTMostRecentCalendarState = async (selectedView, selectedMonth, selectedYear) => new Promise( (resolve, reject) => {
    // Check if it's a valid view or month
    if (selectedMonth > 12 || selectedMonth < 1) {
        reject("No month to record")
    }

    if (!Object.values(TRACK_SYMPTOMS).indexOf(selectedView) > -1) {
        reject("No view to record")
    }
    
    // Try to POST most recent calendar state
    try {
        await AsyncStorage.multiSet([
            KEYS.SELECTED_VIEW,
            KEYS.SELECTED_MONTH,
            KEYS.SELECTED_YEAR
        ],
        [
            selectedView,
            selectedMonth - 1,
            selectedYear
        ]).then(() => resolve())
        .catch((e) => {
            reject(`Unable to update most recent calendar state`);
            console.log(JSON.stringify(e));
        })
    } catch(e) {
        console.log(`POSTMostRecentCalendarState error: ${JSON.stringify(e)}`);
        reject("Something went wrong");
    }
})

/**
 * Retrieves user's previous selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user returns to the calendar page in any way.
 * @returns: TODO
 */
// TODO: Implement GETMostRecentCalendarState
// - Simply retrieve the given values of the keys selectedView, selectedMonth, selectedYear
// - ensure selectedView should be one of TRACK_SYMPTOMS and one of GETAllTrackingPreferences
//      - Recall Annie is implementing GETAllTrackingPreferences for Settings where the user sets whether the user wants
//        to track a certain symptom or not
//      - You will have to call GETAllTrackingPreferences, so potential blocker, but for now use a placeholder until it
//          exists and return selectedMonth and selectedYear
//      - If selectedView is not one the symptoms the user is tracking i.e. in GETAllTrackingPreferences, don't return
//          it (maybe return empty or null instead so the front end knows no symptom filter is selected )

export const GETMostRecentCalendarState = async () => new Promise( async (resolve, reject) => {

    //var tracking = await GETAllTrackingPreferences()
    // Used for testing
    tracking = {
        flow: true, 
        mood: true, 
        sleep: true, 
        cramps: true, 
        exercise: true
    }
    
    const selectedView = JSON.parse(await AsyncStorage.getItem(KEYS.SELECTED_VIEW));
    const selectedMonth = JSON.parse(await AsyncStorage.getItem(KEYS.SELECTED_MONTH));
    const selectedYear = JSON.parse(await AsyncStorage.getItem(KEYS.SELECTED_YEAR));

    let index = Object.values(TRACK_SYMPTOMS).indexOf(selectedView)

    if (tracking.getItem(index)) {
        return [selectedView, selectedMonth, selectedYear];
    }

    return null;
})