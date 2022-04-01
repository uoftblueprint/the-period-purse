import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDaysDiff}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import Keys from '../utils/keys';

const Testing = {

  clearCycleDonut: async function() { 
    try {
      return await AsyncStorage.removeItem(Keys.AVERAGE_CYCLE_LENGTH);
    } catch (e) {
      console.log(e);
    }

  },
  // TODO: delete this
  PostAveragePeriodLength: async function() {
    try {
      return await AsyncStorage.setItem(Keys.AVERAGE_PERIOD_LENGTH, "6" );
    } catch (e) {
      console.log(e);
    }

  },
  // TODO: delete this
  PostAverageCycleLength: async function() {
    try {
      return await AsyncStorage.setItem(Keys.AVERAGE_CYCLE_LENGTH, "30" );
    } catch (e) {
      console.log(e);
    }

  },
  //TODO delete this
  ClearCalendar: async function() {
    try{
      await AsyncStorage.removeItem("2021");
      await AsyncStorage.removeItem("2023");
      return await AsyncStorage.removeItem("2022")
    } catch(e){
      console.log(e);
    }
  },
  //TODO delete this
  ClearCycleDonut: async function() {
    try{
      return await AsyncStorage.removeItem(Keys.CYCLE_DONUT_PERCENT);
    } catch(e){
      console.log(e);
    }
  },

  //TODO: delete this
  PostDummyCalendarOffPeriodToday: async function() {

   let calendar = initializeEmptyYear(2022);
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
  const symptomsSixteenth = {
    "Flow":  "NONE",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'This is the sixteenth day'
  }

  // note index i is for day i+1
  calendar[1][6] = symptoms;
  calendar[1][7] = symptomsEight;
  calendar[1][10] = symptoms;
  calendar[1][12] = symptoms;
  calendar[1][13] = symptomsFourteenth;
  calendar[1][14] = symptoms;

  console.log(JSON.stringify(calendar));
   try {
     return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }

  },

  PostDummyCalendarOnPeriod: async function(){


   let calendar = initializeEmptyYear(2022);
   const symptoms = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }
   const today = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'This is today'
  }

  // note index i is for day i+1
  // feb 7th, period days: 2
  calendar[1][6] = symptoms;
  calendar[1][7] = symptoms;

  // feb 11, periodDays: 9
  calendar[1][10] = symptoms;
  calendar[1][12] = symptoms;
  calendar[1][13] = symptoms;
  calendar[1][14] = symptoms;
  calendar[1][15] = symptoms;
  calendar[1][16] = symptoms;
  calendar[1][17] = symptoms;
  calendar[1][18] = symptoms;


  // feb 22, periodDays: 1
  calendar[1][21] = symptoms;


  calendar[1][23] = symptoms;
  calendar[1][24] = today;


  //march 3rd, periodDays: 3
  calendar[2][2] = symptoms;
  calendar[2][3] = symptoms;
  calendar[2][4] = symptoms;
  calendar[2][29] = symptoms;

   try {
     return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }

  },


  //TODO: delete this
  PostDummyCalendarEmpty: async function(){



   let calendar = initializeEmptyYear(2022);

    try {
      return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
    } catch (e) {
      console.log(e);
    }
  },
  //TODO: delete this
  PostDummyCalendarSymptomsNoFlow: async function(){



   let calendar = initializeEmptyYear(2022);

   const symptoms = {
    "Flow":  "NONE",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }

  // JANUARY

  // jan 31, periodDays: 4
  calendar[0][30] = symptoms;

  // FEBRUARY
  // note index i is for day i+1


  calendar[1][0] = symptoms;
  calendar[1][1] = symptoms;
  calendar[1][2] = symptoms;


  // feb 07, periodDays: 2
  calendar[1][6] = symptoms;
  calendar[1][7] = symptoms;

  // feb 11, periodDays: 6
  calendar[1][10] = symptoms;
  calendar[1][12] = symptoms;
  calendar[1][13] = symptoms;
  calendar[1][14] = symptoms;
  calendar[1][15] = symptoms;

  try {
    return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }
  },

  //TODO: delete this
  PostDummyCalendarOverMonth: async function(){
    // period overlaps over a month, so like oct 30 - Nov 3rd



   let calendar = initializeEmptyYear(2022);
   const symptoms = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }

  // JANUARY

  // jan 31, periodDays: 4
  calendar[0][30] = symptoms;

  // FEBRUARY
  // note index i is for day i+1


  calendar[1][0] = symptoms;
  calendar[1][1] = symptoms;
  calendar[1][2] = symptoms;


  // feb 07, periodDays: 2
  calendar[1][6] = symptoms;
  calendar[1][7] = symptoms;

  // feb 11, periodDays: 6
  calendar[1][10] = symptoms;
  calendar[1][12] = symptoms;
  calendar[1][13] = symptoms;
  calendar[1][14] = symptoms;
  calendar[1][15] = symptoms;

  console.log(JSON.stringify(calendar));
   try {
     return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }
  },

  PostDummyCalendarOverYear: async function(){
    // post something with a period that strecthes from 2022 into 2021.



   let currentYear = initializeEmptyYear(2022);
   let lastYear = initializeEmptyYear(2021);
   let nextYear = initializeEmptyYear(2023);
   const symptoms = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }

  const target = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'THIS IS THE TARGET'

  }
  // Dec 2021
  // dec 30, periodDays: 4
  lastYear[11][29] = symptoms;
  lastYear[11][30] = symptoms;

  // JANUARY
  currentYear[0][1] = symptoms

  // jan 31, periodDays: 4
  currentYear[0][30] = symptoms;

  // FEBRUARY
  // note index i is for day i+1


  currentYear[1][0] = symptoms;
  currentYear[1][1] = symptoms;
  currentYear[1][2] = symptoms;


  // feb 07, periodDays: 2
  currentYear[1][6] = symptoms;
  currentYear[1][7] = symptoms;

  // feb 11, periodDays: 6
  currentYear[1][10] = symptoms;
  currentYear[1][12] = symptoms;
  currentYear[1][13] = symptoms;
  currentYear[1][14] = symptoms;
  currentYear[1][15] = symptoms;

  // target is march 4th
  // march 4th, periodDays: 1
  currentYear[2][3] = target;
  currentYear[2][27] = target;
  currentYear[2][30] = target;

  // dec 27, periodDays: 8
  currentYear[11][26] = symptoms;
  currentYear[11][27] = symptoms;
  currentYear[11][28] = symptoms;
  

  // 2023

  nextYear[0][0] = symptoms;
  nextYear[0][1] = symptoms;
  nextYear[0][2] = symptoms;

   try {
     await AsyncStorage.setItem("2021", JSON.stringify(lastYear));
     await AsyncStorage.setItem("2023", JSON.stringify(nextYear));
     return await AsyncStorage.setItem("2022", JSON.stringify(currentYear));
  } catch (e) {
    console.log(e);
  }
  },
}

export default Testing
;