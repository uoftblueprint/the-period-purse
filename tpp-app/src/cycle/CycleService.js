import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDaysDiff, getDateString}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import Keys from '../utils/keys';




/**
 * @param {Date} searchFrom Date from which to find the last period start
 */
async function getLastPeriodStart(searchFrom){
  //TODO: how to deal with date? so like it is jan 1st, your period started in december last year. This should carry over
    var current = searchFrom;
    var tomorrow = new Date(current.getTime())
    tomorrow.setDate(current.getDate() + 1)
    var twoDaysLater = new Date(current.getTime());
    twoDaysLater.setDate(current.getDate() + 2);

    let dateSymptoms = await CycleService.getSymptomsForDate(current.getDate(), current.getMonth(), current.getFullYear());
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
      dateSymptoms = await CycleService.getSymptomsForDate(current.getDate(), current.getMonth(), current.getFullYear());
      noFlowToday = (dateSymptoms.flow === FLOW_LEVEL.NONE || dateSymptoms.flow === null) ;
      noFlowTomorrow = (tomorrowSymptoms.flow === FLOW_LEVEL.NONE || tomorrowSymptoms.flow === null) ;
      flowTwoDaysLater = (twoDaysLaterSymptoms.flow !== null && twoDaysLaterSymptoms.flow !== FLOW_LEVEL.NONE)
    }



    return current;
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
      // adding 1 b/c month is zero-indexed
      var date = getDateString(today);

      let datePercent = {
      }
      datePercent[date] = percent;
      return await AsyncStorage.setItem(Keys.CycleDonutPercent, JSON.stringify(datePercent));
    } catch (e) {
      console.log(e);
    }
  },

  getSymptomsForDate: async function(day, month, year){
    try {
      var calendar = await AsyncStorage.getItem(year.toString());
      calendar = calendar != null ? JSON.parse(calendar) : null;
      if (calendar === null){
        return new Symptoms();
      }
      // day from Date object is 1-31 so we decrease by 1
      let rawSymptoms =  calendar[month][day-1];
      if (rawSymptoms === null){
        return new Symptoms();
      }
      let symptoms = new Symptoms(rawSymptoms.Flow, rawSymptoms.Mood, rawSymptoms.Sleep, rawSymptoms.Cramps, rawSymptoms.Exercise, rawSymptoms.Notes);
      return symptoms;
    }
    catch(e) {
      console.log(e);
    }
  },


  // SIMPLE GETS
  /**
   * Get the user's average period length
   * @return {Promise} Resolves into either an integer for number of days or NULL if info not present
   */
  GetAveragePeriodLength: async function(){
    try {
      const res = await AsyncStorage.getItem(Keys['Average Period Length']);
      //already returns null if key is invalid
      return res;
    } catch (e) {
      console.log("unsuccesful promise");
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
      const res = await AsyncStorage.getItem(Keys['Average Cycle Length']);
      return res;
    } catch (e) {
      console.log("unsuccesful promise");
      console.log(e);
      return null;
    }

  },

  //COMPLEX GETS
  /**
   * Get the number of days the user has been on their period
   * @return {Promise} Resolves into 0 if user not on period, and an integer of the days they have been on their period otherwise
   */
  GetPeriodDay: async function (){


    // CASES:
    /**
     * 1. _ _ X X _ and today is that last blank.
     * 2. _ _ X _ X _ X and today is last period day
     * 3. _ _ X and today is last period day
     */

    let periodDays = 0;
    var date = new Date()
    console.log("in GetPeriodDay: " +  getDateString(date))
    console.log("in GetPeriodDay: localized" +  date.toLocaleString())
    let dateSymptoms = await this.getSymptomsForDate(date.getDate(), date.getMonth(), date.getFullYear());
    if (dateSymptoms.flow === null || dateSymptoms.flow === FLOW_LEVEL.NONE){
      return 0;
    }
    else {
      let startDate = await this.GetMostRecentPeriodStartDay();
      return getDaysDiff(startDate, date);
    }



    return periodDays;

  },

  /**
   * Produces the progress ring that displays where the user is at in their cycle
Returns the percent away they are from their next period
First check if CycleDonutPercentage has a value in AsyncStorage for today's date, if yes just use that percentage, if no, do calculation and use POSTCycleDonutPercent to replace with new date and percentage
calls on GETPeriodDay
calls on GETAverageCycleLength()
calls on GETMostRecentPeriodStartDate()
if the user is not on their period, call GETMostRecentPeriodStartDate(), GETAverageCycleLength(), and the current date to calculate how far they are from their period starting as a percentage
   */

  /**
   * Get most recent period start date
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started.
   */
  GetMostRecentPeriodStartDay: async function () {
    var date = new Date()

    let mostRecentPeriodDay = getLastPeriodStart(date);
    return mostRecentPeriodDay;
  },
  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise}}
   */
  GetCycleDonutPercent: async function() {
    try{
      let today = new Date();
      let today_str = getDateString(today);
      let percent = await AsyncStorage.getItem(Keys.CycleDonutPercent)
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
   * @param {number} year The year to retrive history for
   * @return {Promise} an object that contains intervals of the user's period (start & length) in that year
   */
  GetCycleHistoryByYear: async function(year) {
    try {
      let current = new Date(year, 11, 31);
      // Search backwards until date switches to the previous year
      while(current.getFullYear() === year){
        var yesterday = new Date(current.getTime())
        yesterday.setDate(current.getDate() - 1)
        current = yesterday;

        let currentSymptoms = await CycleService.getSymptomsForDate(current.getDate(), current.getMonth(), current.getFullYear());

        if (currentSymptoms.flow !== null && currentSymptoms.flow !== FLOW_LEVEL.NONE){
          let start = await getLastPeriodStart(current);
          let periodDays = getDaysDiff(current, start);
          console.log(`start: ${start} periodDays: ${periodDays}`);
          var beforeStart = new Date(start.getTime());
          beforeStart.setDate(beforeStart.getDate() - 1);
          current = beforeStart;
        }

      }
      console.log("finished");


    } catch(e) {
      console.log(e);
    }
  }
}


export default CycleService

