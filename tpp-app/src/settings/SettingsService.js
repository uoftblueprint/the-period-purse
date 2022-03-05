import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRACK_SYMPTOMS, REMINDERS } from './utils/constants.js'

    /**
     * Clears all of the user's account data
     * @returns a promise resolving when the clear operation is complete
     */

    export const DELETEAccountData = async () => new Promise( async (resolve, reject) => {
        try {
            await AsyncStorage.clear().then(() => {
                console.log("Deleted user account data");
                resolve(); 
            })
            
        } catch (e) {
            console.log(`DELETEAccountData error: ${JSON.stringify(e)}`);
            reject();
        }
    })

    /**
     * Returns an array of a boolean representing if a symptom is currently tracked
     * @returns a promise of an array containing booleans representing whether to track each symptom
     */
    export const GETAllTrackingPreferences = async () => new Promise (async (resolve, reject) => {
        try {
             await AsyncStorage.multiGet([
                TRACK_SYMPTOMS.FLOW,
                TRACK_SYMPTOMS.MOOD,
                TRACK_SYMPTOMS.SLEEP,
                TRACK_SYMPTOMS.CRAMPS,
                TRACK_SYMPTOMS.EXERCISE
             ]).then(() => {
                 console.log("Got All Tracking Preferences");
                 resolve();
             }).catch((e) => {
                console.log(JSON.stringify(e));
                reject('Unable to getItem');
             });
        } catch (e) {
            console.log(`GETAllTrackingPreferences error: ${JSON.stringify(e)}`)
            reject();
        }
    })


    /**
     * Posts any changes in symptom tracking preferences 
     * @param flow boolean representing whether to track flow
     * @param mood boolean representing whether to track mood 
     * @param sleep boolean representing whether to track sleep 
     * @param cramps boolean representing whether to track cramps
     * @param exercise boolean representing whether to track exercise
     * @returns a promise resolving when the post operation is complete
     */
    export const POSTUpdatePreferences = async (flow, mood, sleep, cramps, exercise) => new Promise (async (resolve, reject) => {
        try {
            await AsyncStorage.multiSet([
                [TRACK_SYMPTOMS.FLOW, JSON.stringify(flow)],
                [TRACK_SYMPTOMS.MOOD, JSON.stringify(mood)],
                [TRACK_SYMPTOMS.SLEEP, JSON.stringify(sleep)],
                [TRACK_SYMPTOMS.CRAMPS, JSON.stringify(cramps)],
                [TRACK_SYMPTOMS.EXERCISE, JSON.stringify(exercise)]
            ]).then(() => {
                console.log("Posted symptoms")
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post preferences")
            });
        } catch (e) {
            console.log(`POSTUpdatePreferences error: ${JSON.stringify(e)}`)
            reject();
        }
    })

    /**
     * Posts whether the user wants a reminder to log period
     * @param {*} enableRemind boolean representing whether the user wants to a reminder to log period
     * @returns a promise resolving when the post operation is complete 
     */

    export const POSTRemindLogPeriod = async (enableRemind) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS.REMIND_LOG_PERIOD,  JSON.stringify(enableRemind)).then(() => {
                console.log("Posted period logging reminder");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post period logging reminder");
            })
        } catch (e) {
            console.log(`POSTRemindLogPeriod error: ${JSON.stringify(e)}`)
            reject();
        }
    });
    /**
    * Posts whether the user wants a reminder to log period symptoms
    * @param {*} enableRemind boolean representing whether the user wants to a remind to log period symptoms
    * @returns a promise resolving when the post operation is complete 
    */
    export const POSTRemindLogSymptoms = async (enableRemind) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS.REMIND_LOG_SYMPTOMS, JSON.stringify(enableRemind)).then(() => {
                console.log("Posted period symptom logging reminder");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post period symptom logging reminder");
            })
        } catch (e) {
            console.log(`POSTRemindLogSymptoms error: ${JSON.stringify(e)}`)
            reject();
        }
    });
