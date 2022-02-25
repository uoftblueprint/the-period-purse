import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDateString, GETsymptomsForDate, getCalendarByYear, getSymptomsFromCalendar}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import differenceInCalendarDays from 'date-fns/differenceInDays'
import isSameDay from 'date-fns/isSameDay'
import Keys from '../utils/keys';



/**
 * Computes the number of days between the two dates provided. If earlierDate and laterDate are equal, returns 1.
 * @param {Date} earlierDate
 * @param {Date} laterDate
 * @return {number} number of days between the two dates provided, ignoring their hours, minutes and seconds.
 */
const getDaysDiff = (earlierDate, laterDate) => {
  earlierDate.setHours(0,0,0,0)
  laterDate.setHours(0,0,0,0)
  return Math.abs(differenceInCalendarDays(earlierDate, laterDate)) + 1;

}

/**
 * Gets the next period end date for a given date. This is not a prediction.
 * @param {Date} searchFrom The date relative to which to find the next period end date. Must be an earlier date than today
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date object that is the closest day after searchFrom that is the end of a period
 */
async function getNextPeriodEnd(searchFrom, calendar = null){
    var current = searchFrom;
    var yesterday = new Date(current.getTime())
    yesterday.setDate(current.getDate() - 1)
    var twoDaysEarlier = new Date(current.getTime());
    twoDaysEarlier.setDate(current.getDate() - 2);

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

      var tomorrow = new Date(current.getTime());
      tomorrow.setDate(current.getDate()+1);
      twoDaysEarlier = yesterday;
      yesterday = current;
      current = tomorrow;

      console.log(`Current date is: ${current}`);

      twoDaysEarlierSymptoms = yesterdaySymptoms;
      yesterdaySymptoms = dateSymptoms;
      dateSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth() + 1, current.getFullYear());
      noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
      noFlowYesterday = (yesterdaySymptoms.flow === FLOW_LEVEL.NONE || yesterdaySymptoms.flow === null) ;
      flowTwoDaysEarlier = (twoDaysEarlierSymptoms.flow !== null && twoDaysEarlierSymptoms.flow !== FLOW_LEVEL.NONE)
    }



    //return twoDaysEarlier since pattern searching for is _ _ X where X is the period
    return twoDaysEarlier;


}
export {getNextPeriodEnd};

/**
 * Gets the most recent period start date for a given date (searchFrom)
 * @param {Date} searchFrom Date from which to find the last period start
 * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
 * @return {Promise} Resolves into Date that is the most recent day that a period started, relative to searchFrom
 */
async function getLastPeriodStart(searchFrom, calendar = null){
    var current = searchFrom;
    var tomorrow = new Date(current.getTime())
    tomorrow.setDate(current.getDate() + 1)
    var twoDaysLater = new Date(current.getTime());
    twoDaysLater.setDate(current.getDate() + 2);

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

      var yesterday = new Date(current.getTime());
      yesterday.setDate(current.getDate()-1);
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

const CycleService = {
  /**
   *  Store how far the user is into their period as a percentage
   *  @param {number} percent Float in range [0,1] of how far along period is
   *  @return {Promise} Resolves when the set operation is completed
   */
  PostCycleDonutPercent: async function(percent){
    try {
      var today = new Date();
      var date = getDateString(today);

      let datePercent = {
      }
      datePercent[date] = percent;
      return await AsyncStorage.setItem(Keys.CYCLE_DONUT_PERCENT, JSON.stringify(datePercent));
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Get the user's average period length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info not present
   */
  GetAveragePeriodLength: async function(){
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
  GetAverageCycleLength: async function(){
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
  GetPeriodDay: async function (calendar = null){

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
      let startDate = await this.GetMostRecentPeriodStartDay();
      console.log(`period day: start: ${startDate} and end: ${date}`)
      return getDaysDiff(startDate, date);
    }

    return periodDays;

  },


  /**
   * Get most recent period start date
   *
   * @param {Object} calendar The object containing the symptoms for this year, last year, and next year. Optional.
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started.
   */
  GetMostRecentPeriodStartDay: async function (calendar = null) {
    var date = new Date()

    let mostRecentPeriodDay = getLastPeriodStart(date, calendar);
    return mostRecentPeriodDay;
  },

  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise} A percentage approximation (meaning in range [0,1]) of how far the user is into their period
   */
  GetCycleDonutPercent: async function() {
    try{
      let today = new Date();
      let today_str = getDateString(today);
      let percent = await AsyncStorage.getItem(Keys.CYCLE_DONUT_PERCENT)
      console.log("retrieved percent: " + percent)
      percent = percent != null ? JSON.parse(percent) : null;



      if (percent != null && today_str in percent){
        console.log(`accessing pre-computed cycle donut percentage for ${today_str} because we stored it for ${Object.keys(percent)[0]} `);
        return percent[today_str];
      }
      else{
        let mostRecentPeriodStart = await this.GetMostRecentPeriodStartDay();
        let avgCycleLength = await this.GetAverageCycleLength();
        if (mostRecentPeriodStart && avgCycleLength){
          let daysSincePeriodStart = getDaysDiff(mostRecentPeriodStart, today);
          console.log("days diff:" + daysSincePeriodStart)
          let cycleDonutPercent = daysSincePeriodStart / avgCycleLength;
          this.PostCycleDonutPercent(cycleDonutPercent);
          return cycleDonutPercent;
        }
        else{
          //TODO: is 0 the best value to default to? idk
          return 0;
        }
      }

    } catch(e){
      console.log(e);

    }
  },

  /** Get the start and length of each period in the given year
   * @param {number} year The year to retrieve history for
   * @return {Promise} an object that contains intervals of the user's period (start & length) in that year
   */
  GetCycleHistoryByYear: async function(year) {
    let intervals = []
    let endOfYear = new Date(year,11,31);
    let isYearsLastPeriod = true;

    let calendar = await getCalendarByYear(year);



    let current = endOfYear;
    try {
      // Search backwards until date switches to the previous year
      while(current.getFullYear() === year){
        let currentSymptoms = await getSymptomsFromCalendar(calendar, current.getDate(), current.getMonth()+1, current.getFullYear());

        if (currentSymptoms.flow !== null && currentSymptoms.flow !== FLOW_LEVEL.NONE){
          console.log(`THINKS that ${current} has flow`);
          console.log(currentSymptoms);
          let periodEnd = current;
          let start = await getLastPeriodStart(current);
          if (isYearsLastPeriod){
            console.log(`start: ${start}`);
            periodEnd =  await getNextPeriodEnd(start);
            console.log(`period end: ${periodEnd}`);
            isYearsLastPeriod = false;
          }



          let periodDays = getDaysDiff(periodEnd, start);
          console.log(`start: ${start} periodDays: ${periodDays}`);
          intervals.push({"start": start, "periodDays": periodDays})
          console.log(`moves to : ${periodEnd}`);
          var beforeStart = new Date(start.getTime());
          beforeStart.setDate(beforeStart.getDate() - 1);
          current = beforeStart;
        }

        var yesterday = new Date(current.getTime())
        yesterday.setDate(current.getDate() - 1)
        current = yesterday;

      }
      console.log("finished");



    } catch(e) {
      console.log(e);
    }
    return intervals;
  }
}


export default CycleService

