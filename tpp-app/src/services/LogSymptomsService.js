import AsyncStorage from '@react-native-async-storage/async-storage';

import {FLOW_LEVEL} from './utils/constants'
import { initializeEmptyYear, GETsymptomsForDate, isValidDate } from './utils/helpers'
import { Symptoms } from './utils/models';


/**
 * Posts the user's symptom data into the local storage for the given date.
 * @param {number} day 1st day of month = 1
 * @param {number} month January = 1
 * @param {number} year
 * @param {Symptoms} symptoms
 */
export const POSTsymptomsForDate = async (day, month, year, symptoms) => new Promise(async (resolve, reject) => {
    // Check that date, month, year combo is valid
    if (!isValidDate(day, month, year)) {
        reject("Sorry, this isn't a valid date to log symptoms for!");
        return;
    }

    // Try to POST new symptoms in async storage
    try {
        //Get the year's data or set to empty year
        const fetchYear = await AsyncStorage.getItem(year.toString());
        const yearData = JSON.parse(fetchYear) ?? initializeEmptyYear(year);

        yearData[month-1][day-1] = symptoms;
        let yearStr = JSON.stringify(yearData);


        // post symptoms to storage
        await AsyncStorage.setItem(year.toString(), yearStr)
            .then(() => {
              resolve();
              return;
            })
            .catch((e) => {
                console.log(`Unable to mergeItem and post symptoms for this day, month, year: ${day, month, year}. Error: ${JSON.stringify(e)}`);
                reject(`Something went wrong. Please try again later.`);
                return;
            });
    } catch (e) {
        console.log(`POSTsymptomsForDate error: ${JSON.stringify(e)}`);
        reject("Something went wrong. Please try again later.");
        return;
    }
})


/**
 * Updates user's flow to medium on selected days where the user's flow was originally null or none.
 * @param {Array<date>} dates
 * where date.day is a number (1st day of month = 1),
 * date.month is a number (January = 1),
 * date.year is a number.
 */
export const LogMultipleDayPeriod = async (dates) => {
    // run this code for each value in the dates array
    dates.map(async (date)=>{
        const year = date.year;
        const month = date.month;
        const day = date.day;

        let symptoms = await GETsymptomsForDate(day, month, year)

        if (symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE){
            symptoms.flow = FLOW_LEVEL.MEDIUM;
        }

        POSTsymptomsForDate(day, month, year, symptoms);

    })

}
