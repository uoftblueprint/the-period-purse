import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS, TRACK_SYMPTOMS } from './utils/constants.js'
import { Symptoms } from './utils/models.js';

/**
 * Makes API request to AsyncStorage to access symptoms for the entire year
 * @param year: number
 * @returns: object
 */
export const GETYearData = async (year) => {
    // https://github.com/uoftblueprint/the-period-purse/pull/95#discussion_r813506726
    // Essentially retrieve the calendar for a given year and convert each day's data into a Symptom object for better front-end handling

    // Used for testing
    // await AsyncStorage.setItem('2022', JSON.stringify(
    //     [
    //         // 0th index of the 2022 array is 1st month i.e. January has size 31
    //         [
    //             {
    //                 'Flow': 'LIGHT',
    //                 'Mood': 'HAPPY',
    //                 'Sleep': '7.5', 
    //                 'Cramps': 'MEDIUM', 
    //             }
    //         ]
    //     ])
    // )    

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
}

/**
 * Saves user's current selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user exits calendar page in any way.
 * @param selectedView: string
 * @param selectedMonth: number
 * @param selectedYear: number
 */

export const POSTMostRecentCalendarState = async (selectedView, selectedMonth, selectedYear) => new Promise( async (resolve, reject) => {

    // Check if it's a valid view or month
    if (selectedMonth > 12 || selectedMonth < 1) {
        reject("No month to record")
    }

    var exists = Object.keys(TRACK_SYMPTOMS).some(function(k) {
        return TRACK_SYMPTOMS[k] === selectedView;
    });

    if (exists) {
        const viewPair = [KEYS.SELECTED_VIEW, selectedView]
        const monthPair = [KEYS.SELECTED_MONTH, String(selectedMonth - 1)]
        const yearPair = [KEYS.SELECTED_YEAR, String(selectedYear)]
        try {
            await AsyncStorage.multiSet([viewPair, monthPair, yearPair]).then(() => resolve())
            .catch((e) => {
                reject(`Unable to update most recent calendar state`);
                console.log(JSON.stringify(e));
            })
        } catch(e) {
            console.log(`POSTMostRecentCalendarState error: ${JSON.stringify(e)}`);
            reject("Something went wrong");
        }
    } else {
        reject("No view to record")
    }
      
})

/**
 * Retrieves user's previous selected filter, selected month, and selected year, to preserve the thing they are looking at.
 * Meant to be used when user returns to the calendar page in any way.
 * @returns: list[selectedView, selectedMonth, selectedYear]
 */
export const GETMostRecentCalendarState = async () => {

    var tracking = await GETAllTrackingPreferences()

    // This is used for testing
    // TODO: This is HARDCODED
    // tracking = {
    //     flow: true, 
    //     mood: true, 
    //     sleep: true, 
    //     cramps: true, 
    //     exercise: true
    // }

    try {
        const selectedView = await AsyncStorage.getItem(KEYS.SELECTED_VIEW);
        const selectedMonth = await AsyncStorage.getItem(KEYS.SELECTED_MONTH);
        const selectedYear = await AsyncStorage.getItem(KEYS.SELECTED_YEAR);
        
        // Checks which view it is on
        // TODO: this is HARDCODED
        let index = Object.values(TRACK_SYMPTOMS).indexOf(selectedView)        
        
        if (tracking[Object.keys(tracking)[index]]) {
            console.log("DEBUG: " + selectedMonth)
            return [selectedView, selectedMonth, selectedYear];
        }    
    } catch(e) {
        // error reading value
    }

    return null;
}