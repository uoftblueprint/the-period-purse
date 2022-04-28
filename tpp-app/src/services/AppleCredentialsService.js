import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPLE_CREDENTIALS, ICLOUD} from "./utils/constants";
import * as iCloudStorage from 'react-native-cloud-store';

/**
 * Save the user's token so we can authenticate them
 * @param {string} userId User's Apple user ID
 * @param {string} givenName User's first name
 * @param {string} familyName User's last name
 * @param {string} token Identity token that authenticates the user
 */
export const POSTAppleIdentity = async (userId, givenName, familyName, token) => new Promise( async (resolve, reject) => {
    AsyncStorage.multiSet([
        [APPLE_CREDENTIALS.USER_ID, JSON.stringify(userId)],
        [APPLE_CREDENTIALS.GIVEN_NAME, JSON.stringify(givenName)],
        [APPLE_CREDENTIALS.FAMILY_NAME, JSON.stringify(familyName)],
        [APPLE_CREDENTIALS.IDENTITY_TOKEN, JSON.stringify(token)]
        ])
        .then(() => {
            console.log(`Saved user's Apple identity as: ${userId}, ${givenName}, ${familyName}, ${token}`);
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
            resolve(JSON.parse(token));
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
            resolve(JSON.parse(token));
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

        console.log(keys, values);

        if (keys.length !== values.length) {
            throw new Error("Bad Async Storage content: Mismatch of keys and values");
        }

        // Save keys and values to iCloud
        await iCloudStorage.kvSetItem(
            ICLOUD.BACKUP_KEYS, JSON.stringify(keys));

        await iCloudStorage.kvSetItem(
            ICLOUD.BACKUP_VALUES, JSON.stringify(values));
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
export const userHasiCloudBackup = async () => new Promise(async(resolve, reject) => {
    // try {
        console.log(iCloudStorage);
        const keys = JSON.parse(await iCloudStorage.kvGetItem(ICLOUD.BACKUP_KEYS));
        console.log(keys);
        const values = JSON.parse(await iCloudStorage.kvGetItem(ICLOUD.BACKUP_VALUES));
        console.log(values);
        if (keys.length === values.length) {
            resolve(true);
        } else {
            resolve(false);
        }
    // } catch (e) {
    //     console.log(`userHasiCloudBackup error: ${JSON.stringify(e)}`);
    //     reject();
    // }
});

/**
 * Retrieve Backup from iCloud and enter it into AsyncStorage
 */
export const GETBackupFromiCloud = async () => new Promise( async (resolve, reject) => {
    try {
        const keys = await iCloudStorage.kvGetItem(ICLOUD.BACKUP_KEYS);
        const values = await iCloudStorage.kvGetItem(ICLOUD.BACKUP_VALUES);

        console.log(keys, values);

        if (keys.length !== values.length) {
            throw new Error("Bad iCloud Storage backup content: Mismatch of keys and values");
        }

        // Clear AsyncStorage
        await AsyncStorage.clear();

        const listOfKeyValues = [];
        keys.forEach((key, index) => {
            listOfKeyValues.push([key, values[index]]);
        });

        // Use MultiSet to store backup from iCloud in AsyncStorage
        await AsyncStorage.multiSet([listOfKeyValues]);

        resolve();

    } catch (e) {
        console.log(`GETBackupFromiCloud error: ${JSON.stringify(e)}`);
        reject();
    }
});

