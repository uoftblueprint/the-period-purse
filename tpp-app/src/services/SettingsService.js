import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRACK_SYMPTOMS, REMINDERS} from './utils/constants'

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

    /**
     * Posts the frequency to send log period reminders
     * @param {string} advanceDays how many days in advance of period to send reminder
     * @returns a promise resolving when the post operation is complete
     */
    export const POSTRemindLogPeriodFreq = async (advanceDays) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS.LOG_PERIOD_DAYS, JSON.stringify(advanceDays)).then(() => {
                console.log("Posted the number of days in advance to send log period reminder");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post number of days in advance to send log period reminder ");
            })
            
        } catch (e) {
    console.log(`POSTRemindLogPeriodFreq error: ${JSON.stringify(e)}`)
            reject();        
        }
    });

    /**
     * Retrieves the frequency to send log period reminders 
     * @returns a promise resolving in a string representing the number of days
     */
    export const GETRemindLogPeriodFreq= async () => new Promise(async (resolve, reject) => {
        try {
            value = await AsyncStorage.getItem(REMINDERS.LOG_PERIOD_DAYS).then((value) => {
                        console.log("Retrieved the number of days in advance to send log period reminder");
                        resolve(value);
                    }).catch((e) => {
                        console.log(JSON.stringify(e));
                        reject("Unable to retrieve number of days in advance to send log period reminder");
                    })
        } catch (e) {
            console.log(`POSTRemindLogPeriodFreq error: ${JSON.stringify(e)}`)
            reject();
        }
    });


    /**
     * Posts the time (exp: 1 am, 2 am) to send reminder to log period 
     * @param {string} time string representing the time
     * @returns a promise resolving when the post method is complete
     */
    export const POSTRemindLogPeriodTime = async (time) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS.LOG_PERIOD_TIME, JSON.stringify(time)).then(() => {
                console.log("Posted time to send log period reminder");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post time to send log period reminder");
            })
        } catch (e) {
            console.log(`POSTRemindLogPeriodTime error: ${JSON.stringify(e)}`)
            reject();
        }
    });

    /**
     * Retrieves the time (exp: 1 am, 2 am) to send reminder to log period 
     * @returns a promise resolving in a string representing the time
     */
    export const GETRemindLogPeriodTime = async () => new Promise(async (resolve, reject) => {
        try {
            value = await AsyncStorage.getItem(REMINDERS.LOG_PERIOD_TIME).then((value) => {
                        console.log("Retrieved the time to log period reminder");
                        resolve(value);
                    }).catch((e) => {
                        console.log(JSON.stringify(e));
                        reject("Unable to retrieve the time to send log period reminder");
                    })
        } catch (e) {
            console.log(`GETRemindLogPeriodTime error: ${JSON.stringify(e)}`)
            reject();
        }
    });

    /**
     * Posts the frequency to send log symptom reminders
     * @param {string} freq string representing the frequency to send reminder
     * @returns a promise resolving when the post operation is complete
     */
    export const POSTRemindLogSymptomsFreq = async (freq) => new Promise(async (resolve, reject) => {
       try {
            await AsyncStorage.setItem(REMINDERS.LOG_SYMPTOMS_DAYS, JSON.stringify(freq)).then(() => {
                console.log("Posted log symptoms reminder frequency");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post log symptoms reminder frequency");
            })
        } catch (e) {
            console.log(`POSTRemindLogSymptomsFreq error: ${JSON.stringify(e)}`)
            reject();
        }
    });

    /**
     * Retrieves the frequency to send log symptom reminders
     * @returns a promise resolving in a string that represents the frequency to send reminder
     */
    export const GETRemindLogSymptomsFreq = async () => new Promise(async (resolve, reject) => {
        try {
            value = await AsyncStorage.get(REMINDERS.LOG_SYMPTOMS_DAYS).then((value) => {
                console.log("Retrieved log symptoms reminder frequency");
                resolve(value);
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to retrieve log symptoms reminder frequency");
            })
            } catch (e) {
                console.log(`GETRemindLogSymptomsFreq error: ${JSON.stringify(e)}`)
                reject();
            }
    });


    /**
     * Posts the time (exp: 1 am, 2 am) to send reminder to log symptoms 
     * @param {string} time string representing the time
     * @returns a promise resolving when the post method is complete
     */
    export const POSTRemindLogSymptomsTime = async (time) => new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(REMINDERS.LOG_SYMPTOMS_TIME, JSON.stringify(time)).then(() => {
                console.log("Posted log symptoms reminder time");
                resolve();
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to post log symptoms reminder time");
            })

        } catch (e) {
            console.log(`POSTRemindLogSymptomsTime error: ${JSON.stringify(e)}`)
            reject();
        }
    });

    /**
     * Retrieves the time (exp: 1 am, 2 am) to send reminder to log symptoms 
     * @returns a promise resolving in a string representing the time
     */
    export const GETRemindLogSymptomsTime = async () => new Promise(async (resolve, reject) => {
        try {
            value = await AsyncStorage.setItem(REMINDERS.LOG_SYMPTOMS_TIME).then((value) => {
                console.log("Retrieved log symptoms reminder time");
                resolve(value);
            }).catch((e) => {
                console.log(JSON.stringify(e));
                reject("Unable to retrieve log symptoms reminder time");
            })

        } catch (e) {
            console.log(`GETRemindLogSymptomsTime error: ${JSON.stringify(e)}`)
            reject();
        }
    });


    
