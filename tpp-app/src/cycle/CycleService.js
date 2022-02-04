import {AsyncStorage} from 'react-native';
import Keys from "../utils/Keys";

async function getSymptomsForDate(day, month, year){
  try {
    const calendar = "bruh";
  }
  catch(e) {
    console.log(e);
  }
}

//TODO: Consider what happens for GetPeriodDay & GetMostRecentPeriodStartDate if it doesn't actually find anything

const CycleService = {
  PostCycleDonutPercent: async function(percent){
    try {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      let datePercent = {
      }
      datePercent[date] = percent;
      return await AsyncStorage.setItem('CycleDonutPercentage', JSON.stringify(datePercent));
    } catch (e) {
      console.log(e);
    }
  },


  // SIMPLE GETS
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
  PostDummyCalendarSimple: async function() {
   let january = [None] * 31
   const symptoms = {
    "Flow":  "LIGHT",
    "Mood": "HAPPY",
    'Sleep': '7.5',
    'Cramps': 'MEDIUM',
    'Exercise': {'BIKING': '0.5', 'RUNNING': '1' },
    'Notes': 'Happy new year! My resolution is to log symptoms every day.'
  }
  january[30] = symptoms;

  let calendar = [Null, january]
   try {
     return await AsyncStorage.setItem("2022", JSON.stringify(calendar));
  } catch (e) {
    console.log(e);
  }

  },

  PostDummyCalendarFlowIntermittent: async function() {
   // flow intermittent. basically checking pattern matching
   let january = [None] * 31

   let february = [None] * 28
   let calendar = {
     "2022":{
       january,
       february
     }
   }

  },

  PostDummyCalendarOverMonth: async function(){
    // period overlaps over a month, so like oct 30 - Nov 3rd

  }





  //COMPLEX GETS
}

export default CycleService

