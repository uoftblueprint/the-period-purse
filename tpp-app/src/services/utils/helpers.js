// Backend helper functions used across app
import { Symptoms } from './models'

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
 * Check if the date, month, year combination is a valid date.
 * @param day number (1st day of month = 1)
 * @param month number (January = 1)
 * @param year number
 * @return True or False boolean
 */
export const isValidDate = (day, month, year) => {
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    if (!(day > 0 && day <= monthLength[month - 1]))
        return false

    // Check that date isn't in the future
    const today = new Date();
    today.setHours(0,0,0,0);
    return new Date(year, month-1, day) <= today
};

/**
 * Retrieves the user's symptom data for the given date.
 * @param day number (1st day of month = 1)
 * @param month number (January = 1)
 * @param year number
 */
export const GETsymptomsForDate = async (day, month, year) => {
  if (isValidDate(day, month, year)) {
    // Get the year's data (value could be null if year is empty)
    const yearData = JSON.parse(await AsyncStorage.getItem(year.toString()));

    // Return symptoms for that day or empty symptoms object if it doesn't exist
    return yearData[month-1][day-1]
      ? new Symptoms(
        yearData[month-1][day-1].flow,
        yearData[month-1][day-1].mood,
        yearData[month-1][day-1].sleep,
        yearData[month-1][day-1].cramps,
        yearData[month-1][day-1].exercise,
        yearData[month-1][day-1].notes)
      : new Symptoms();
  } else {
    // Not a valid date
    return new Symptoms();
  }
}
