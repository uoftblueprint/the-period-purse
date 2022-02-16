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
