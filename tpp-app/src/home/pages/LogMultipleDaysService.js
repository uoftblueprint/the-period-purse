import AsyncStorage from '@react-native-async-storage/async-storage';

const FLOW_LEVEL = {
    NONE: "NONE", 
    LIGHT: "LIGHT", 
    MEDIUM: "MEDIUM", 
    HEAVY: "HEAVY", 
    SPOTTING: "SPOTTING"
}

export const LogMultipleDaysService = {
    LogMultipleDayPeriod: async (dates) => {
        // run this code for each value in the dates array
        dates.map(async (date)=>{
            const year = date.year;
            const month = date.month;
            const day = date.day;

            console.log(year, month, day)
            console.log("the year " + year.toString())
            //check if year month exists
            const data = JSON.parse(await AsyncStorage.getItem(year.toString()));
            // console.log("HEERE " + data[month-1][day-1]["Flow"]);
            if (data == null){
                data = [];
            }

            if (data[month-1] == null){
                data[month-1] = [];
            }
            
            console.log("hmm",JSON.stringify(data[month-1][day-1]));
            if (data[month-1][day-1] == null){
                data[month-1][day-1] = {"Flow": FLOW_LEVEL.MEDIUM}

            }else{
                
                if(data[month-1][day-1]["Flow"] == null || data[month-1][day-1]["Flow"] == FLOW_LEVEL.NONE){
                    data[month-1][day-1]["Flow"] = FLOW_LEVEL.MEDIUM;
                }else{
                    data[month-1][day-1]["Flow"] = FLOW_LEVEL.NONE;
                }
            }
        

            

            console.log(JSON.stringify(data));
            console.log("updated",JSON.stringify(data[month-1][day-1]));
        })
        
    }
}