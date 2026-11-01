/**
 * Tests for deleteAllTrackingData
 *
 * Notes:
 * - Covers three areas: successful deletion, storage failures, and how
 *   deletion interacts with saves that are still queued.
 * - AsyncStorage is fake here (set up in jest.setup.ts), so no
 *   real device storage is touched. It is cleared before every test so tests
 *   can't affect each other.
 * - These tests go through the real daily-log storage module and its write
 *   queue, so they check the real ordering behaviour, not a mock of it.
 *
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    getLoggedDays,
    saveDay,
    subscribeToDailyLog,
} from "@/features/daily-log";

import { DAILY_LOG_STORAGE_KEY } from "../daily-log/daily-log-storage";

import { deleteAllTrackingData } from "./delete-tracking-data";

//Before each test we will be clearing the storage to prevent previous tests from impacting future ones
beforeEach(async () => {
    await AsyncStorage.clear();
});

//First, we will test the path where deletion is successful to ensure all expected side effects happen
describe("deleteAllTrackingData: successful deletion", () => {

    // logs that were saved should be deleted, both when read through the app"s API and when checking the async storage directly
    it("deletes all stored daily logs", async () => {
        await saveDay({ date: "2026-01-01", flow: "Heavy" });
        await saveDay({ date: "2026-01-02", flow: "Light" });

        await deleteAllTrackingData();

        expect(await getLoggedDays()).toEqual([]);
        expect(await AsyncStorage.getItem(DAILY_LOG_STORAGE_KEY)).toBeNull();
    });

    //deleting when nothing is stored must not error. It should simply succeed.
    it("resolves when there is nothing to delete", async () => {
        await expect(deleteAllTrackingData()).resolves.toBeUndefined();
    });

    //deletion should only touch keys corresponding to the app"s tracking features 
    it("only removes the daily log key, not other storage keys", async () => {
        await saveDay({ date: "2026-01-01", flow: "Heavy" });
        await AsyncStorage.setItem("someOtherFeature:v1", "keep me");

        await deleteAllTrackingData();

        expect(await AsyncStorage.getItem("someOtherFeature:v1")).toBe("keep me");
    });

    // Listerners must be told after a successful delete so the UI refreshes. Exactly once.
    it("notifies subscribers once after a successful deletion", async () => {
        await saveDay({ date: "2026-01-01", flow: "Heavy" });
        // jest.fn() is a stand-in listener that records how often it is called.
        const listener = jest.fn();
        const unsubscribe = subscribeToDailyLog(listener);

        await deleteAllTrackingData();
        unsubscribe();

        expect(listener).toHaveBeenCalledTimes(1);
    });

    // After a delete the app must be usable again: a new save works and only the new data exists (nothing old comes back).
    it("lets later saves work normally after a deletion", async () => {
        await saveDay({ date: "2026-01-01", flow: "Heavy" });
        await deleteAllTrackingData();

        await saveDay({ date: "2026-02-01", flow: "Light" });

        expect(await getLoggedDays()).toEqual([{ date: "2026-02-01", flow: "Light" }]);
    });
});

//Second, we will test the path where deletion fails to esnure its handled properly. We will force faliures on purpose. 
describe("deleteAllTrackingData: storage failures", () => {
    // NOTE: we make the failure reach the caller as a rejected promise. This is what
    // lets the UI show the error message instead of the success message.
    it("rejects when storage fails to remove the logs", async () => {
        jest.mocked(AsyncStorage.removeItem).mockRejectedValueOnce(new Error("disk full"));

        await expect(deleteAllTrackingData()).rejects.toThrow("Could not delete all data");
    });

    // listerners should only hear about successful deletions. Notifying on
    // failure would refresh the UI as if data had changed when it hadn't.
    it("does not notify subscribers when deletion fails", async () => {
        const listener = jest.fn();
        const unsubscribe = subscribeToDailyLog(listener);
        jest.mocked(AsyncStorage.removeItem).mockRejectedValueOnce(new Error("disk full"));

        await expect(deleteAllTrackingData()).rejects.toThrow();
        unsubscribe();

        expect(listener).not.toHaveBeenCalled();
    });
    // A failed delete should keep the rest of the queue still alive
    it("keeps the write queue working after a failed deletion", async () => {
        jest.mocked(AsyncStorage.removeItem).mockRejectedValueOnce(new Error("disk full"));
        await expect(deleteAllTrackingData()).rejects.toThrow();

        // A later save must still run
        await saveDay({ date: "2026-01-01", flow: "Heavy" });
        expect(await getLoggedDays()).toHaveLength(1);
        //a retried delete must still be able to succeed
        await deleteAllTrackingData();
        expect(await getLoggedDays()).toEqual([]);
    });
});

//Lastly, we test a path that ensures that deletion is serielized. I.e: a save that is still 
// pending must not write its data back after the delete has finished.
describe("deleteAllTrackingData: interaction with queued saves", () => {
    //back to back saves and delete must be serielized
    it("does not let a save already queued restore the deleted logs", async () => {
        const save = saveDay({ date: "2026-01-01", flow: "Heavy" });
        const deletion = deleteAllTrackingData();

        await Promise.all([save, deletion]);

        expect(await getLoggedDays()).toEqual([]);
    });
    //same as above but with a pile of pending saves instead of just one
    it("does not let several queued saves restore the deleted logs", async () => {
        const saves = [
            saveDay({ date: "2026-01-01", flow: "Heavy" }),
            saveDay({ date: "2026-01-02", flow: "Light" }),
            saveDay({ date: "2026-01-03", flow: "Spotting" }),
        ];
        const deletion = deleteAllTrackingData();

        await Promise.all([...saves, deletion]);

        expect(await getLoggedDays()).toEqual([]);
    });

    //data the user logs after tapping delete is new data, so it must be kept, not swallowed by the delete.
    it("keeps a save requested after the deletion", async () => {
        const deletion = deleteAllTrackingData();
        const save = saveDay({ date: "2026-01-01", flow: "Heavy" });

        await Promise.all([deletion, save]);

        expect(await getLoggedDays()).toEqual([{ date: "2026-01-01", flow: "Heavy" }]);
    });
});