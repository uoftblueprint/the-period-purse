import {AsyncStorage} from 'react-native';
import Keys from "../utils/Keys";


function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(()=> {
      resolve(x);
    }, 2000);
  })
}

const CycleService = {
  PostCycleDonutPercent: async function(percent){
    try {
      let date = '2022-01-01'
      let datePercent = {
        date: 0.1
      }
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

  }




  //COMPLEX GETS
}

export default CycleService

