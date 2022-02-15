import AsyncStorage from '@react-native-async-storage/async-storage';
import Keys from "../utils/Keys";


//I think this should be in some shared file
const FLOW_LEVEL = {
  NONE: "NONE",
  LIGHT: "LIGHT",
  MEDIUM: "MEDIUM",
  HEAVY: "HEAVY",
  SPOTTING: "SPOTTING"
}

class Symptoms {
  constructor(flow = null, mood = null, sleep = null, cramps = null, exercise = null, notes = null) {
    this.flow = flow;
    this.mood = mood;
    this.sleep = sleep;
    this.cramps = cramps;
    this.exercise = exercise;
    this.notes = notes;
  }
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
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
      let symptoms = new Symptoms(rawSymptoms.Flow, rawSymptoms.mood, rawSymptoms.sleep, rawSymptoms.cramps, rawSymptoms.exercise, rawSymptoms.notes);
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
      console.log(res);
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
      //TODO: what returns when key is invalid
      const res = await AsyncStorage.getItem(Keys['Average Cycle Length']);
      console.log(res);
      return res;
    } catch (e) {
      console.log("unsuccesful promise");
      console.log(e);
      return null;
    }

  },
  // TODO: delete this
  PostAveragePeriodLength: async function() {
    try {
      return await AsyncStorage.setItem(Keys['Average Period Length'], "6" );
    } catch (e) {
      console.log(e);
    }

  },
  // TODO: delete this
  PostAverageCycleLength: async function() {
    try {
      return await AsyncStorage.setItem(Keys['Average Cycle Length'], "6" );
    } catch (e) {
      console.log(e);
    }

  },
  //TODO delete this
  ClearCalendar: async function() {
    try{
      return await AsyncStorage.removeItem("2022")
    } catch(e){
      console.log(e);
    }
  },

  //TODO: delete this
  PostDummyCalendarSimple: async function() {
   let february = Array(28).fill(null);
   const symptoms = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }
  const symptomsEight = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'This is the fourth day'
  }
  const symptomsFourteenth = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'This is the fourthteenth day'
  }

  february[6] = symptoms;
  february[7] = symptomsEight;
  february[10] = symptoms;
  february[12] = symptoms;
  february[13] = symptomsFourteenth;
  february[14] = symptoms;

  let calendar = [null, february]
  console.log(JSON.stringify(calendar));
   try {
     return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }

  },


  //TODO: delete this
  PostDummyCalendarOverMonth: async function(){
    // period overlaps over a month, so like oct 30 - Nov 3rd

  },





  //COMPLEX GETS
  /**
   * Get the number of days the user has been on their period
   * @return {Promise} Resolves into 0 if user not on period, and an integer of the days they have been on their period otherwise
   */
  GetPeriodDay: async function (){
    // TODO: how to handle when you go from 2022 -> 2021? Answer: Handled by date package lfg


    // CASES:
    /**
     * 1. _ _ X X _ and today is that last blank.
     * 2. _ _ X _ X _ X and today is last period day
     * 3. _ _ X and today is last period day
     */

    let periodDays = 0;
    var date = new Date()
    var tomorrow = new Date(date.getTime())
    tomorrow.setDate(date.getDate() + 1)
    console.log("day :" + date.getDate() + " month: " + date.getMonth()-1 + " year: " + date.getFullYear());
    let dateSymptoms = await this.getSymptomsForDate(date.getDate(), date.getMonth(), date.getFullYear());
    let tomorrowSymptoms = new Symptoms();

    var noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE;
    var noFlowTomorrow = tomorrowSymptoms.flow === FLOW_LEVEL.NONE;


    while(!(noFlowToday && noFlowTomorrow)){

      periodDays+=1;
      var yesterday = new Date(date.getTime());
      yesterday.setDate(date.getDate()-1);
      tomorrow = date;
      date = yesterday;
      console.log("checking " + date)

      tomorrowSymptoms = dateSymptoms;
      dateSymptoms = await this.getSymptomsForDate(date.getDate(), date.getMonth(), date.getFullYear());
      console.log("date symptoms: " + JSON.stringify(dateSymptoms));
      console.log("tomorrow  date symptoms: " + JSON.stringify(tomorrowSymptoms));
      noFlowToday = dateSymptoms.flow === FLOW_LEVEL.NONE;
      noFlowTomorrow = tomorrowSymptoms.flow === FLOW_LEVEL.NONE;
      console.log(" flow today: " + !noFlowToday);
      console.log("flow tomorrow: " + !noFlowTomorrow);
    }

    //TODO: test this


    return periodDays;

  },

  /**
   * Get most recent period start date
   * @return {Promise} A promise that resolves into a Date object that is when the most recent period started.
   */
  GetMostRecentPeriodStartDay: async function () {
    var date = new Date()
    let periodDays = await this.GetPeriodDay();
    var mostRecentPeriodDay = new Date(date.getTime());
    mostRecentPeriodDay.setDate(date.getDate() - periodDays);
    return mostRecentPeriodDay;

  },
  /**
   * Get how far the user is into their period as a percentage
   * @return {Promise}}
   */
  GetCycleDonutPercent: async function() {
    //TODO: Is this the correct definition of
    try{
      let today = new Date();
      let percent = await AsyncStorage.getItem(Keys.CycleDonutPercent)

    } catch(e){

    }
  }
}


export default CycleService

