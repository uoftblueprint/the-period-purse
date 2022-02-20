import AsyncStorage from '@react-native-async-storage/async-storage';
import { Symptoms } from './utils/models'
import { initializeEmptyYear } from './utils/helpers'

/**
 * Retrieves the user's symptom data for the given date.
 * @param day number
 * @param month number (January = 1)
 * @param year number
 */
export const GETsymptomsForDate = async (day, month, year) => {
  // Get the year's data (value could be null if year is empty)
  const yearData = JSON.parse(await AsyncStorage.getItem(year.toString()));

  // Return symptoms for that day or empty symptoms object if it doesn't exist
  return yearData[month-1][day-1] ? new Symptoms(yearData[month-1][day-1]) : new Symptoms();
}


/**
 * Posts the user's symptom data into the local storage for the given date.
 * @param day number
 * @param month number (January = 1)
 * @param year number
 * @param symptoms Symptoms object
 */
// Calls mergeItem() with the year as the key value, and the JSONified symptom
// data as the value, {month: [...,{symptoms},...]}.
// This means that if the element representing that day is empty, a new symptom object will be recorded.
// If there already is data there, POSTsymptomsForDate will rewrite over any existing data for that date.
export const POSTsymptomsForDate = async (day, month, year, symptoms) => new Promise( (resolve, reject) => {

    // Check that symptoms object is not all null or not empty
    let notEmpty = Object.values(symptoms).some((symptom) => symptom !== null)
    if (!symptoms || notEmpty) {
      reject("No symptoms to record");
    }

    // Try to POST new symptoms in async storage
    try {
        // Get the year's data or set to empty year
        const yearData = JSON.parse(await AsyncStorage.getItem(year.toString())) ?? initializeEmptyYear(year);

        yearData[month-1][day-1] = symptoms

        // post symptoms to storage
        await AsyncStorage.setItem(year, yearData)
          .then(() => resolve())
          .catch((e) => {
              reject(`Unable to mergeItem and post symptoms for this day, month, year: ${day, month, year}`);
              console.log(JSON.stringify(e));
          });
    } catch (e) {
        console.log(`POSTsymptomsForDate error: ${JSON.stringify(e)}`);
        reject("Something went wrong");
    }
})

export const LogMultipleDaysService = {
    LogMultipleDayPeriod: async (dates) => {
        // run this code for each value in the dates array
        dates.map(async (date)=>{
            const year = date.year;
            const month = date.month;
            const day = date.day;

            console.log(year, month, day)
            console.log("the year " + year.toString())
            //check if year month exists
            const data = JSON.parse(await AsyncStorage.getItem(year.toString()));
            // console.log("HEERE " + data[month-1][day-1]["Flow"]);
            if (data == null){
                data = [];
            }

            if (data[month-1] == null){
                data[month-1] = [];
            }

            console.log("hmm",JSON.stringify(data[month-1][day-1]));
            if (data[month-1][day-1] == null){
                data[month-1][day-1] = {"Flow": FLOW_LEVEL.MEDIUM}

            }else{

                if(data[month-1][day-1]["Flow"] == null || data[month-1][day-1]["Flow"] == FLOW_LEVEL.NONE){
                    data[month-1][day-1]["Flow"] = FLOW_LEVEL.MEDIUM;
                }else{
                    data[month-1][day-1]["Flow"] = FLOW_LEVEL.NONE;
                }
            }




            console.log(JSON.stringify(data));
            console.log("updated",JSON.stringify(data[month-1][day-1]));
        })

    }
}
