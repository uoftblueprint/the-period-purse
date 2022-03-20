import AsyncStorage from '@react-native-async-storage/async-storage';

import {FLOW_LEVEL} from './utils/constants'
import { initializeEmptyYear, isValidDate, getCalendarByYear, getSymptomsFromCalendar } from './utils/helpers'
import { Symptoms } from './utils/models';


/**
 * Posts the user's symptom data into the local storage for the given date.
 * @param {number} day 1st day of month = 1
 * @param {number} month January = 1
 * @param {number} year
 * @param {Symptoms} symptoms
 */
export const POSTsymptomsForDate = async (day, month, year, symptoms) => new Promise(async (resolve, reject) => {
    // Check that symptoms object is not all null or not empty
    let notEmpty = Object.values(symptoms).some((symptom) => symptom !== null);
    if (!symptoms || !notEmpty) {
        reject("No symptoms to record");
    }

    // Check that date, month, year combo is valid
    if (!isValidDate(day, month, year)) {
        reject("Not a valid date");
    }

    // Try to POST new symptoms in async storage
    try {
        // Get the year's data or set to empty year
        const yearData = JSON.parse(await AsyncStorage.getItem(year.toString())) ?? initializeEmptyYear(year);

        yearData[month-1][day-1] = symptoms
        // console.log(day,month,symptoms)
        // post symptoms to storage
        await AsyncStorage.setItem(year.toString(), JSON.stringify(yearData))
            .then(() => resolve())
            .catch((e) => {
                console.log(JSON.stringify(e));
                reject(`Unable to mergeItem and post symptoms for this day, month, year: ${day, month, year}`);
            });
    } catch (e) {
        console.log(`POSTsymptomsForDate error: ${JSON.stringify(e)}`);
        reject("Something went wrong");
    }
})


/**
 * Updates user's flow to medium on selected days where the user's flow was originally null or none.
 * @param {Array<date>} dates
 * where date.day is a number (1st day of month = 1),
 * date.month is a number (January = 1),
 * date.year is a number.
 */
export const LogMultipleDayPeriod = async (dates) => new Promise(async (resolve, reject) => {
    // run this code for each value in the dates array
    if(dates.length > 0){
        try {
            curYear = dates[0].year;
            const calendarData = await getCalendarByYear(curYear);
        

            dates.map((date)=>{
                const year = date.year;
                const month = date.month;
                const day = date.day;
                try {
                    
                    let symptoms = getSymptomsFromCalendar(calendarData, day, month, year);

                    if (symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE){
                        symptoms.flow = FLOW_LEVEL.MEDIUM;
                    }

                    calendarData[year][month-1][day-1] = symptoms;
                } catch (error) {
                    console.log(error);
                }

            })

            console.log(curYear, calendarData[curYear]);
            console.log(curYear.toString());

            // await AsyncStorage.getItem(curYear.toString());

            await AsyncStorage.setItem(curYear.toString(), JSON.stringify(calendarData[curYear]))
            .then(() => resolve())
            .catch((e) => {
                console.log(JSON.stringify(e));
                reject(`Unable to mergeItem and post symptoms for multiselect.`);
            });

            // await AsyncStorage.setItem((curYear - 1).toString(), JSON.stringify(calendarData[curYear - 1]))
            // .then(() => resolve())
            // .catch((e) => {
            //     reject(`Unable to mergeItem and post symptoms for multiselect.`);
            //     console.log(JSON.stringify(e));
            // });

            // await AsyncStorage.setItem((curYear + 1).toString(), JSON.stringify(calendarData[curYear + 1]))
            // .then(() => resolve())
            // .catch((e) => {
            //     reject(`Unable to mergeItem and post symptoms for multiselect.`);
            //     console.log(JSON.stringify(e));
            // });

            // calendarData[curYear]
        } catch (error) {
            console.log("error with multiselect:",error);
        }
    }

})
