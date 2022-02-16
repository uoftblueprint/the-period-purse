
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLOW_LEVEL} from '../utils/constants';
import {initializeEmptyYear, getDaysDiff}  from '../utils/helpers';
import {Symptoms} from '../utils/models';
import Keys from '../utils/keys';
const Testing = {

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
  //TODO delete this
  ClearCycleDonut: async function() {
    try{
      return await AsyncStorage.removeItem(Keys.CycleDonutPercent);
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
    "Flow":  "Light",
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
  calendar[1][15] = symptomsSixteenth;

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
}

export default Testing
;
