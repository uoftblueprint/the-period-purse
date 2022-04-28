import AsyncStorage from '@react-native-async-storage/async-storage';
import { FACT_CYCLE } from '../services/utils/constants.js'
import { getFullCurrentDateString } from "../services/utils/helpers.js"

/**
 * Retrieves an array containing the last date the user accessed the info screen and the fact number they saw
 * @returns returns a promise resolving in an array with format ["2022-1-1", "1"]
 */
 export const GETFactCycle = async () => new Promise(async (resolve, reject) => {
    try {
        let thing = await AsyncStorage.getItem(FACT_CYCLE.FACT_CYCLE_NUM);
        console.log(`This thing is wrong: ${thing}`)
     if (thing == null) {
        resolve(null);
     } else {
         value = await AsyncStorage.getItem(FACT_CYCLE.FACT_CYCLE_NUM);
         console.log("Retrieved Fact Cycle Date and Number");
         resolve(value);
     }
    } catch (e) {
        console.log(`GETFactCycle error: ${JSON.stringify(e)}`)
        reject(null);
    }
});

/**
 * Updates FACT_CYCLE_NUM with the currentDate and updated fact number if the current date and the stored date differ
 * If GETFactCycle is null, instantiates FACT_CYCLE_NUM with the current date and 1 as the first fact number
 * @returns a Promise resolving when the setItem or mergeItem operation is complete
 */

export const POSTFactCycle = async () => new Promise(async (resolve, reject) => {
    try {
        if (await GETFactCycle() == null) { // if there is currently no fact/date array stored
            const value = [getFullCurrentDateString(), "1"];
            await AsyncStorage.setItem(FACT_CYCLE.FACT_CYCLE_NUM, JSON.stringify(value)).catch(() => {
                console.log("GETFactCycle error: failed to instantiate FACT_CYCLE_NUM")
                reject();
            }).then(() => {
                console.log("Instantiated Fact Cylce Number")
                resolve();
            })
        } else {
            // get the current date
            newDate = getFullCurrentDateString()
            if (newDate != GETFactCycle()[0]) { // update dateand fact only if the current date does not match the stored date
                previousFactNum = GETFactCycle()[1]
                newFactNum = toString(parseInt(previousFactNum) + 1);
                const value = [newDate, newFactNum]
                
                await AsyncStorage.mergeItem(FACT_CYCLE.FACT_CYCLE_NUM, JSON.stringify(value)).then(() =>{
                    console.log("Updated Fact Cycle Number");
                    resolve();
                }).catch(() => {
                    console.log("GETFactCycle error: failed to mergeItem FACT_CYCLE_NUM")
                    reject();
                })
            }
        }
    } catch (e) {
        console.log(`POSTFactCycle error: ${JSON.stringify(e)}`)
        reject();
    }
});
