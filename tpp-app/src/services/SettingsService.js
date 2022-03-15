import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRACK_SYMPTOMS, REMINDERS, LOG_PERIOD_FREQ, LOG_SYMPTOMS_FREQ } from './utils/constantscs'

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
             values = await AsyncStorage.multiGet([
                TRACK_SYMPTOMS.FLOW,
                TRACK_SYMPTOMS.MOOD,
                TRACK_SYMPTOMS.SLEEP,
                TRACK_SYMPTOMS.CRAMPS,
                TRACK_SYMPTOMS.EXERCISE
             ]).then((values) => {
                 console.log("Got All Tracking Preferences");
                 resolve(values);
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
     * @param {boolean} flow representing whether to track flow
     * @param {boolean} mood representing whether to track mood 
     * @param {boolean} sleep representing whether to track sleep 
     * @param {boolean} cramps representing whether to track cramps
     * @param {boolean} exercise representing whether to track exercise
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
     * @param {boolean} enableRemind representing whether the user wants to a reminder to log period
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
    * @param {boolean} enableRemind representing whether the user wants to a remind to log period symptoms
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



    export const POSTRemindLogPeriodAdvanceDays = async (advanceDays) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS)
            
        } catch(e) {

        }
    });

    export const GETRemindLogPeriodAdvanceDays = async () => new Promise(async (resolve, reject) => {

    });

    export const POSTRemindLogPeriodTime = async () => new Promise(async (resolve, reject) => {

    });

    export const GETRemindLogPeriodTime = async () => new Promise(async (resolve, reject) => {

    });

    export const POSTRemindLogSymptomsFreq = async () => new Promise(async (resolve, reject) => {

    });

    export const GETRemindLogSymptomsFreq = async () => new Promise(async (resolve, reject) => {

    });

    export const POSTRemindLogSymptomsTime = async () => new Promise(async (resolve, reject) => {

    });

    export const GETRemindLogSymptomsTime = async () => new Promise(async (resolve, reject) => {

    });


    

