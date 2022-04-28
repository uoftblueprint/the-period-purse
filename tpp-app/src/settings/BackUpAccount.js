import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import {appleAuth, AppleButton} from '@invertase/react-native-apple-authentication';
import {GETAppleIdentityToken, GETAppleUser} from "../services/AppleCredentialsService";

export default function BackUpAccount ({props}) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        async function checkUserCredentialState() {
            // get current authentication state for user
            const user = await GETAppleUser();
            // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            const credentialState = await appleAuth.getCredentialStateForUser(user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                setIsSignedIn(true);
            }
        }
        checkUserCredentialState();
    }, []);

    return (
        <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
            <SafeAreaView>
                <Text style={styles.heading}>Back Up Account</Text>
                { isSignedIn && <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}> Back Up Account </Text>
                </TouchableOpacity> }
                { !isSignedIn && <AppleButton
                    buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={styles.appleSignin}
                    onPress={() => onAppleButtonPress({ navigation: props.navigation, comingFromSettings: true})}
                /> }
            </SafeAreaView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    heading: {
        fontFamily: "Avenir",
        fontWeight: "800",
        color: "#6D6E71",
        fontSize: 16,
        letterSpacing: -0.3,
        marginLeft: "7.5%",
        marginBottom: "5%",
        top: "-90%",
        lineHeight: 20,
        left: 0
    },
    body: {
        fontFamily: "Avenir",
        fontWeight: "500",
        fontSize: 14,
        letterSpacing: -0.3,
        marginBottom: "5%",
        marginLeft: "7.5%",
        top: "-90%"
    },
    textContainer: {
        justifyContent: 'space-evenly',
        marginLeft: 24,
        marginRight: 10,
        marginTop: -10,
        marginBottom: 75
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