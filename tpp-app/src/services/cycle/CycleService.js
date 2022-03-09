import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDateString, getCalendarByYear, getSymptomsFromCalendar, getDaysDiffInclusive, getPeriodsInYear}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import differenceInCalendarDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import Keys from '../utils/keys';
import isAfter from 'date-fns/isAfter';





/**
 * Gets the end date of the final period in the year, which may be in the next year. This is not a prediction
 * @param {Date} finalPeriodStart The start date of the final period of the year. Assumed to be a period day.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date object that is the closest date after finalPeriodStart that is the end of a period. Date may be in a later year than finalPeriodStart
 */
async function getLastPeriodsEnd(finalPeriodStart, calendar = null){
    var current = finalPeriodStart;
    var yesterday = subDays(current, 1);
    var twoDaysEarlier = subDays(current, 2);

    if (!calendar){
      calendar = await getCalendarByYear(current.getFullYear());
    }

    let dateSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth()+1, current.getFullYear());
    let yesterdaySymptoms = new Symptoms();
    let twoDaysEarlierSymptoms = new Symptoms()

    var noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
    var noFlowYesterday = (yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null) ;
    var flowTwoDaysEarlier = (twoDaysEarlierSymptoms.flow !== null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE)


    while(!(noFlowToday && noFlowYesterday && flowTwoDaysEarlier)){

      var tomorrow = addDays(current, 1);
      twoDaysEarlier = yesterday;
      yesterday = current;
      current = tomorrow;


      twoDaysEarlierSymptoms = yesterdaySymptoms;
      yesterdaySymptoms = dateSymptoms;
      dateSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth() + 1, current.getFullYear());
      noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
      noFlowYesterday = (yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null) ;
      flowTwoDaysEarlier = (twoDaysEarlierSymptoms.flow !== null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE)
    }



    return twoDaysEarlier;


}
export {getLastPeriodsEnd};

/**
 * Gets the start date of the first period recorded in the year, which may be in the previous year.
 * @param {Date} firstPeriodEnd The first recorded period date in the year.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date object that is the closest date before firstPeriodEnd that is the beginning of a period. Date may be in an earlier year than firstPeriodEnd.
 */
async function getFirstPeriodStart(firstPeriodEnd, calendar = null){
    var current = firstPeriodEnd;
    var tomorrow = addDays(current, 1);
    var twoDaysLater = addDays(current, 2);
    if (!calendar){
      calendar = await getCalendarByYear(current.getFullYear());
    }

    let dateSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth()+1, current.getFullYear());
    let tomorrowSymptoms = new Symptoms();
    let twoDaysLaterSymptoms = new Symptoms()

    var noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
    var noFlowTomorrow = (tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null) ;
    var flowTwoDaysLater = (twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE)


    while(!(noFlowToday && noFlowTomorrow && flowTwoDaysLater)){

      var yesterday = subDays(current, 1);
      twoDaysLater = tomorrow;
      tomorrow = current;
      current = yesterday;

      twoDaysLaterSymptoms = tomorrowSymptoms;
      tomorrowSymptoms = dateSymptoms;
      dateSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth() + 1, current.getFullYear());
      noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
      noFlowTomorrow = (tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null) ;
      flowTwoDaysLater = (twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE)
    }



    //return twoDaysLater since pattern searching for is _ _ X where X is the period
    return twoDaysLater;
}
/**
 * @param {Date} date The date to check if it is a period start, which is _ _ X where X is a period and _ is a non-period.
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} resolves into a boolean, true if the date is a period start.
 */
async function isPeriodStart(date, calendar){


  var yesterday = subDays(date, 1);
  var twoDaysEarlier = subDays(date, 2);

  let dateSymptoms = await getSymptomsFromCalendar(calendar, date.getDate(), date.getMonth()+1, date.getFullYear());
  let yesterdaySymptoms = await getSymptomsFromCalendar(calendar, yesterday.getDate(), yesterday.getMonth()+1, yesterday.getFullYear());
  let twoDaysEarlierSymptoms = await getSymptomsFromCalendar(calendar, twoDaysEarlier.getDate(), twoDaysEarlier.getMonth()+1, twoDaysEarlier.getFullYear());


  // search for _ _ X where _ is no period or not logged, and X is period
  var flowToday = (dateSymptoms.flow !== null && dateSymptoms.flow !== FLOW_LEVEL.NONE);
  var noFlowYesterday = (yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null) ;
  var noFlowTwoDaysEarlier = (twoDaysEarlierSymptoms.flow === FLOW_LEVEL.NONE || twoDaysEarlierSymptoms.flow === null) ;

  return (flowToday && noFlowYesterday && noFlowTwoDaysEarlier);

}

/**
 * Gets the most recent period start date for a given date (searchFrom)
 * @param {Date} searchFrom Date from which to find the last period start
 * @param {Array} periods List of period Dates in this year, in chronological order
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date that is the most recent day that a period started, relative to searchFrom
 */
async function getLastPeriodStart(searchFrom, periods, calendar = null){

  if(!calendar){
    calendar = await getCalendarByYear();
  }

  if(isSameDay(searchFrom, periods[0])){
    return getFirstPeriodStart(searchFrom, calendar);

  }


  //look at periods in reverse chronological order
  for(let i = periods.length-1; i >=0; i--){
    //checking if searchFrom is after current period
    if (isAfter(searchFrom, periods[i]) && (await isPeriodStart(periods[i], calendar))){
      return periods[i];

    }



  }

  return null;
}



const CycleService = {
  /**
   *  Store how far the user is into their period as a percentage
   *  @param {number} percent Float in range [0,1] of how far along period is
   *  @return {Promise} Resolves when the set operation is completed
   */
  POSTCycleDonutPercent: async function(percent){
    try {
      var today = new Date();
      var date = getDateString(today);

      let datePercent = {
      }
      datePercent[date] = percent;
      return await AsyncStorage.setItem(Keys.CYCLE_DONUT_PERCENT, JSON.stringify(datePercent));
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  /**
   * Get the user's average period length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info not present
   */
  GETAveragePeriodLength: async function(){
    try {
      const res = await AsyncStorage.getItem(Keys.AVERAGE_PERIOD_LENGTH);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }

  },
  /**
   * Get the user's average cycle length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info is not present
   */
  GETAverageCycleLength: async function(){
    try {
      const res = await AsyncStorage.getItem(Keys.AVERAGE_CYCLE_LENGTH);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }

  },

  /**
   * Get the number of days the user has been on their period
   *
   * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
   * @return {Promise} Resolves into 0 if user not on period, and an integer of the days they have been on their period otherwise
   */
  GETPeriodDay: async function (calendar = null){

    let periodDays = 0;
    var date = new Date()
    if (!calendar){
      calendar = await getCalendarByYear(date.getFullYear());
    }
    let dateSymptoms = await getSymptomsFromCalendar(calendar, date.getDate(), date.getMonth()+1, date.getFullYear());
    if (dateSymptoms.flow === null || dateSymptoms.flow === FLOW_LEVEL.NONE){
      return 0;
    }
    else {
      let startDate = await this.GETMostRecentPeriodStartDate(calendar);
      return getDaysDiffInclusive(startDate, date);
    }

    return periodDays;

  },


  /**
   * Get most recent period start date
   *
   * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started. Null if there are no periods.
   */
  GETMostRecentPeriodStartDate: async function (calendar = null) {
    var date = new Date()

    if (!calendar){
      calendar = await getCalendarByYear(date.getFullYear());
    }

    let periods = await getPeriodsInYear(date.getFullYear());
    let mostRecentPeriodDay = getLastPeriodStart(date, periods, calendar);
    return mostRecentPeriodDay;
  },

  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise} A percentage approximation (meaning in range [0,1]) of how far the user is into their period
   */
  GETCycleDonutPercent: async function() {
    try{
      let today = new Date();
      let today_str = getDateString(today);
      let percent = await AsyncStorage.getItem(Keys.CYCLE_DONUT_PERCENT)
      percent = percent != null ? JSON.parse(percent) : null;


      let calendar = await getCalendarByYear(today.getFullYear());

      if (percent != null && today_str in percent){
        return percent[today_str];
      }
      else{
        let mostRecentPeriodStart = await this.GETMostRecentPeriodStartDate(calendar);
        let avgCycleLength = await this.GETAverageCycleLength(calendar);
        if (mostRecentPeriodStart && avgCycleLength){
          let daysSincePeriodStart = getDaysDiffInclusive(mostRecentPeriodStart, today);
          let cycleDonutPercent = daysSincePeriodStart / avgCycleLength;
          this.POSTCycleDonutPercent(cycleDonutPercent);
          return cycleDonutPercent;
        }
        else{
          return 0;
        }
      }

    } catch(e){
      console.log(e);

    }
  },

  /** Get the start and length of each period in the given year
   * @param {number} year The year to retrieve history for
   * @return {Promise} an object that contains intervals of the user's period (start & length) in that year in reverse chronological order
   */
  GETCycleHistoryByYear: async function(year) {
    let intervals = []
    let endOfYear = new Date(year,11,31);
    let isYearsLastPeriod = true;

    let calendar = await getCalendarByYear(year);
    let periods = await getPeriodsInYear(year, calendar);

    if(periods.length == 0){
      return intervals;
    }



    try {
      // Search backwards until date switches to the previous year
      var periodEnd = null;
      var periodStart = null;

      var isPeriodEnd = false;
      var isLastPeriodStart = true;

      for (let i =periods.length - 1; i>= 0; i--){


        let current = periods[i];
        if(await isPeriodStart(current, calendar)){
          if (isPeriodEnd){
            //handle the case where a period is a single day long
            periodEnd = current;
          }
          periodStart = current;
          isPeriodEnd = true;

          if(isLastPeriodStart){
            //handle special case for the last period, since it could possibly span multiple years
            periodStart = periods[i];
            periodEnd = await getLastPeriodsEnd(periodStart);
            var periodDays = getDaysDiffInclusive(periodEnd, periodStart);
            intervals.push({"start": periodStart, "periodDays": periodDays});
          }
          else if(periodEnd && periodStart){
            //general case for any period besides first or last in the year
            var periodDays = getDaysDiffInclusive(periodEnd, periodStart);
            intervals.push({"start": periodStart, "periodDays": periodDays});
          }
          isLastPeriodStart = false;
        }
        else{
          if(isPeriodEnd){
            periodEnd = current;
            isPeriodEnd = false;
          }
        }

      }

      periodStart = await getFirstPeriodStart(periodEnd);

      //check if the first period is not already in intervals, in which case we know it's the case where the first period spans 2 different years
      if(!intervals.some(interval => isSameDay(interval.start, periodStart))){
        var periodDays = getDaysDiffInclusive(periodEnd, periodStart);
        intervals.push({"start": periodStart, "periodDays": periodDays});
      }



    } catch(e) {
      console.log(e);
    }
    return intervals;
  }
}


export default CycleService

