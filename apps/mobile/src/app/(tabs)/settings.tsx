
/**
 * TEMPORARY TEST SCREEN: not the final Settings page.
 *
 * Created to test and try the "Delete my data" flow while the real Settings screen and design guide are still being built.
 *
 * Notes:
 * - The layout and styling here are placeholders for testing only.
 * - Intend to replace this file's contents with the real Settings page (rendering
 *   <DeleteDataItem /> inside it) once that screen exists.
 */
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DeleteDataItem } from '@/features/settings/components/delete-data-item';

export default function testSettingsScreen() {

  return (

    <SafeAreaProvider style={styles.container}>
        <View>
            <DeleteDataItem/>
        </View>
    </SafeAreaProvider>
  );
}

//This styling is temporary for testing only. Intend to use styles of settings page when that goes up
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    backgroundColor: '#FCC9D1'
  },
});
