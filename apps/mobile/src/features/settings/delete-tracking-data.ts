/**
 * A file to contain the function that deletes all of the app's locally 
 * stored tracking data, and the React hook the Settings screen uses to 
 * run that deletion and show its progress.
 *
 * Notes:
 * - deleteAllTrackingData runs every registered deleter. Each feature that
 *   stores tracking data adds its own deleter to DATA_DELETERS.
 * - Deleters are used instead of AsyncStorage.clear() so only keys the app's
 *   tracking features own are removed, and each feature can go through its
 *   own write queue (so a pending save can't restore deleted data).
 * - If any deleter fails, the others still run, and then the whole deletion
 *   is reported as failed. 
 * - useDeleteAllTrackingData was created to wrap the deletion in a status
 *   (idle -> deleting -> success | error) flow for the UI to react to.
 */
import { deleteDailyLogs } from "@/features/daily-log/daily-log-storage";
import { useState } from "react";

// Every feature that stores tracking data adds its deleter here.
const DATA_DELETERS: (() => Promise<void>)[] = [deleteDailyLogs];

/**
 * Runs every added deleter in the DATA_DELETERS array, one after another, 
 * to delete all tracking data. A failing deleter does not stop the others, 
 * so as much data as possible is deleted before the failure is reported.
 *
 * @returns A promise that resolves if every deleter succeeded,
 * or rejects with "Could not delete all data" if any of them failed.
 */
export async function deleteAllTrackingData(): Promise<void> {
    let failed = false;
    for (const deleter of DATA_DELETERS) {
        try {
            await deleter();
        } catch {
            failed = true;
        }
    }
    // Throwing makes the returned promise reject, which is how the caller
    // finds out. If we reach the end without throwing, the promise resolves.
    if (failed) throw new Error("Could not delete all data");


}

// The four states the deletion can be in, used by the UI to decide what to show.
export type DeleteStatus = "idle" | "deleting" | "success" | "error";

/**
 * function runs the full deletion and tracks where it is, so the UI can show
 * a spinner while deleting and a success or error message afterwards.
 *
 * @returns An object with:
 * - status: the current DeleteStatus.
 * - run: starts the deletion. The async func never rejects; a failure sets status to "error".
 * - reset: sets status back to "idle" (called when a snackbar is dismissed).
 */
export function useDeleteAllTrackingData() {
    const [status, setStatus] = useState<DeleteStatus>("idle");

    const run = async () => {
        setStatus("deleting");
        try {
            await deleteAllTrackingData();
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const reset = () => setStatus("idle");

    return { status, run, reset };
}