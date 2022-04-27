import React, { useEffect } from 'react';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {Alert, StyleSheet, View} from "react-native";
import {GETBackupFromiCloud, POSTAppleIdentity, userHasiCloudBackupp} from "../services/AppleCredentialsService";
import {STACK_SCREENS} from "./Confirmation";


async function onAppleButtonPress({navigation}) {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse :>> ', appleAuthRequestResponse);
  
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated, save their apple auth related fields
      await POSTAppleIdentity(appleAuthRequestResponse.user, appleAuthRequestResponse.fullName.givenName, appleAuthRequestResponse.fullName.familyName, appleAuthRequestResponse.identityToken);

      // Check if they have an existing file in their iCloud for M. Nation
      // If yes, ask if they want to load up their backed up data
      if (await userHasiCloudBackupp()) {
          Alert.alert(
              "Use Backup",
              "Would you like to use your backed up data for this app?", [
                  {
                      text: "No",
                      style: "cancel",
                      // Proceed to quick start
                      onPress: () => navigation.navigate(STACK_SCREENS.PERIOD_LENGTH)
                  }, {
                      text: "Yes",
                      style: "default",
                      // Retrieve their backup
                      onPress: async () => await GETBackupFromiCloud() // TODO
                  }
              ]
          );
      // If no, proceed to quick start
      } else {
          navigation.navigate(STACK_SCREENS.PERIOD_LENGTH);
      }
    }
}

export default function AppleSignin({navigation}) {
    useEffect(() => {
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
  
    return (
        <View>
            <AppleButton
                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={styles.appleSignin}
                onPress={() => onAppleButtonPress({navigation})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  appIcon: {
    width: 182,
    height: 182,
    alignSelf: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 50
  },
  appleSignin: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    borderRadius: 10,
    width: 330,
    height: 52,
    alignSelf: 'center',
    margin: 10
  }
});
