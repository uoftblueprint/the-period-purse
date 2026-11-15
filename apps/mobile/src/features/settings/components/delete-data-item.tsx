/**
 * The "Delete my data" row component for the Settings screen.
 *
 * Notes:
 * - Shows a tappable row (title, chevron button, divider underneath) MATCHES figma design.
 * - Tapping the row opens a confirmation dialog. Nothing is deleted until
 *   the user presses "Delete" in that dialog (explicit confirmation).
 * - On confirm, runs the deletion via useDeleteAllTrackingData, which wipes
 *   all locally stored tracking data (no account or sign-in involved).
 * - Shows a spinner on the row while deleting, then a success snackbar if
 *   it worked, or an error snackbar if it failed. 
 */

import { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Dialog, List, Portal, Snackbar, Text, Icon, Divider } from 'react-native-paper';
import { useDeleteAllTrackingData } from '@/features/settings/delete-tracking-data';

/**
 * "Delete my data" row component for the Settings screen
 * Details mentioned above
 * @returns the tappable row, its divider, the confirmation dialog and its notification snackbar.
 */
export function DeleteDataItem() {
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const { status, run, reset } = useDeleteAllTrackingData();
    const isDeleting = (status == "deleting")

    /**
     * Function called when the confirm delete button is pushed. It hides the 
     * confirm screen and runs the deletion function returned by useDeleteAllTrackingData
     */
    const handleDeletionConfirmed = () => {
        setConfirmDialogVisible(false);
        run();
    };

    return (
        <>
            <List.Item
                title="Delete my data"
                //Show chevron by default; however, if the delete is confirmed 
                // and is pending, turn the chevron into a loading sign so user 
                // knows delete is in proccess
                right={() => (
                    isDeleting ? (
                        <ActivityIndicator animating size="small" />
                    ) : (
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#ffff",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon source="chevron-right" size={24} color={"#0000"} />
                        </View>
                    )
                )}
                disabled={isDeleting}
                onPress={() => setConfirmDialogVisible(true)}
                accessibilityRole="button"
                accessibilityLabel="Delete my data"
            />

            <Divider bold horizontalInset style={{ backgroundColor: '#6D6E71' }} />

            {/**Portal used to enable the confirm delete card to show on top of the settings screen */}
            <Portal>
                <Dialog visible={confirmDialogVisible} onDismiss={() => setConfirmDialogVisible(false)}>
                    <Dialog.Title>Delete all your data?</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            This action permanently deletes all app data you have saved on this device. You cannot undo
                            this.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setConfirmDialogVisible(false)}>Cancel</Button>
                        <Button onPress={handleDeletionConfirmed}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                <Snackbar visible={status === 'success'} onDismiss={reset} duration={4000}>
                    Your data was deleted.
                </Snackbar>
                <Snackbar visible={status === 'error'} onDismiss={reset} duration={6000}>
                    ERROR: Could not delete your data. Please try again.
                </Snackbar>
            </Portal>
        </>
    );
}