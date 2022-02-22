import AsyncStorage from '@react-native-async-storage/async-storage';
import {Symptoms} from '../utils/models';
// Backend helper functions used across app

/**
 * Initializes an empty year array with 12 nested arrays, representing a month.
 * Within each month array is X null values corresponding to X days of that month in that year.
 * @param yearNumber number
 */
export const initializeEmptyYear = (yearNumber) => {
  let year = new Array(12);

  for (let i = 0; i < 12; ++i) {
    let daysInMonth = new Date(yearNumber, i+1, 0).getDate();
    let month = new Array(daysInMonth).fill(null); // fill with daysInMonth null values
    year[i] = month; // assign it to year
  }

  return year
}


/**
 * Convert a Date object into a date string, encoding year, month and day. Note it encodes months as 1 indexed, and days as 0 indexed
 * @param {Date} date Object to convert to string
 * @return {String} String encoding year, month and day
 */
export const getDateString = (date) => {
  var date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  return date;

}

/**
 * Retrieves the user's symptom data for the given date.
 * @param day number
 * @param month number (January = 0)
 * @param year number
 */
 export const GETsymptomsForDate = async (day, month, year) => {
  // Get the year's data (value could be null if year is empty)
  const yearData = JSON.parse(await AsyncStorage.getItem(year.toString()));

  // Return symptoms for that day or empty symptoms object if it doesn't exist
  return yearData[month-1][day-1] ? new Symptoms(yearData[month-1][day-1]) : new Symptoms();
}
