import AsyncStorage from '@react-native-async-storage/async-storage';

const LogMultipleDaysService = {
    LogMultipleDayPeriod: async function(dates){
        // run this code for each value in the dates array
        dates.map((date)=>{
            const year = date.year;
            const month = date.month;
            const day = date.day;
            
            //check if year month exists
            const data = AsyncStorage.getItem(year);
            if (!data.contains(month)){
                data[month] = []
            } 
        })
        
    }
}