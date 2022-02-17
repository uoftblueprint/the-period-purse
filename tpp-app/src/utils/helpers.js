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
 * Computes the number of days between the two dates provided
 * @param {Date} earlierDate
 * @param {Date} laterDate
 * @return {number} number of days between the two dates provided, ignoring their hours, minutes and seconds.
 */
export const getDaysDiff = (earlierDate, laterDate) => {
  console.log("earlier date in days diff: " + JSON.stringify(earlierDate))
  console.log("later date in days diff: " + JSON.stringify(laterDate))

  //NOTE: Imo this computation is simple but there's like 2000 JS libraries for manipulating dates so maybe this computation is not that simple?
  var oneDay = 24 * 60 * 60 * 1000;
  earlierDate.setHours(0);
  earlierDate.setMinutes(0);
  earlierDate.setSeconds(0);
  earlierDate.setMilliseconds(0);

  laterDate.setHours(0);
  laterDate.setMinutes(0);
  laterDate.setSeconds(0);
  laterDate.setMilliseconds(0);

  var diffDays = Math.round(Math.abs(laterDate.getTime() - earlierDate.getTime()));
  return diffDays/oneDay;

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
