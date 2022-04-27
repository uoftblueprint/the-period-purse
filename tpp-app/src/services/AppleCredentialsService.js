import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPLE_CREDENTIALS, ICLOUD} from "./utils/constants";
import iCloudStorage from 'react-native-icloudstore';

/**
 * Save the user's token so we can authenticate them
 * @param {string} userId User's Apple user ID
 * @param {string} givenName User's first name
 * @param {string} familyName User's last name
 * @param {string} token Identity token that authenticates the user
 */
export const POSTAppleIdentity = async (userId, givenName, familyName, token) => new Promise( async (resolve, reject) => {
    AsyncStorage.multiSet([
        [APPLE_CREDENTIALS.USER_ID, userId],
        [APPLE_CREDENTIALS.GIVEN_NAME, givenName],
        [APPLE_CREDENTIALS.FAMILY_NAME, familyName],
        [APPLE_CREDENTIALS.IDENTITY_TOKEN, token]
        ])
        .then(() => {
            console.log("Saved user's Apple identity");
            resolve();
            })
        .catch((e) => {
            console.log(`POSTAppleIdentity error: ${JSON.stringify(e)}`);
            reject();
        });
});

/**
 * Retrieve the user's token so we can authenticate them
 */
export const GETAppleIdentityToken = async () => new Promise( async (resolve, reject) => {
    AsyncStorage.getItem(APPLE_CREDENTIALS.IDENTITY_TOKEN)
        .then((token) => {
            console.log("Retrieved user's Apple identity token");
            resolve(token);
        }).catch((e) => {
            console.log(`GETAppleIdentityToken error: ${JSON.stringify(e)}`);
            reject();
    });
});

/**
 * Retrieve the user's token so we can authenticate them
 */
export const GETAppleUser = async () => new Promise( async (resolve, reject) => {
    AsyncStorage.getItem(APPLE_CREDENTIALS.USER_ID)
        .then((token) => {
            console.log("Retrieved user's Apple user ID");
            resolve(token);
        }).catch((e) => {
        console.log(`GETAppleUser error: ${JSON.stringify(e)}`);
        reject();
    });
});

/**
 * Backup account to iCloud
 */
export const POSTBackupToiCloud = async () => new Promise( async (resolve, reject) => {
    try {
        // Create a json of everything in AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);

        if (keys.length !== values.length) {
            throw new Error("Bad Async Storage content: Mismatch of keys and values");
        }

        // Save keys and values to iCloud
        await iCloudStorage.multiSet([
            [ICLOUD.BACKUP_KEYS, keys],
            [ICLOUD.BACKUP_VALUES, values]
        ]);
        resolve();
    } catch (e) {
        console.log(`POSTBackupToiCloud error: ${JSON.stringify(e)}`);
        reject();
    }
});

/**
 * Check if iCloud has backed up data
 * @returns boolean indicating whether the user has a backup of M. Nation data in their iCloud
 */
export const userHasiCloudBackupp = async () => new Promise(async(resolve, reject) => {
    iCloudStorage.multiGet([ICLOUD.BACKUP_KEYS, ICLOUD.BACKUP_VALUES])
        .then(async ([backupKeys, backupValues]) => {
            if (backupKeys.length === backupValues.length) {
                resolve(true);
            } else {
                // Bad iCloud storage data, just clear it
                await iCloudStorage.clear();
                resolve(false);
            }
        }).catch((e) => {
            console.log(`userHasiCloudBackupp error: ${JSON.stringify(e)}`);
            reject();
    });
});

/**
 * Retrieve Backup from iCloud and enter it into AsyncStorage
 */
export const GETBackupFromiCloud = async () => new Promise( async (resolve, reject) => {
    iCloudStorage.multiGet([ICLOUD.BACKUP_KEYS, ICLOUD.BACKUP_VALUES])
        .then(async ([backupKeys, backupValues]) => {
            if (backupKeys.length !== backupValues.length) {
                throw new Error("Bad iCloud Storage backup content: Mismatch of keys and values");
            }

            // Clear AsyncStorage
            await AsyncStorage.clear();

            const listOfKeyValues = [];
            backupKeys.forEach((key, index) => {
                listOfKeyValues.push([key, backupValues[index]]);
            });

            // Use MultiSet to store backup from iCloud in AsyncStorage
            await AsyncStorage.multiSet([listOfKeyValues]);

            resolve();
        })
        .catch(() => {
            console.log(`GETBackupFromiCloud error: ${JSON.stringify(e)}`);
            reject();
        });
});

