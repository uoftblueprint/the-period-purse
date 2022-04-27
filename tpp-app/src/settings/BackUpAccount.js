import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DELETEAccountData } from '../services/SettingsService';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import {STACK_SCREENS} from "../onboarding/Confirmation";
import { appleAuth } from '@invertase/react-native-apple-authentication';

export default function BackUpAccount ({props}) {
    useEffect(() => {
        async function checkUserCredentialState() {
            // get current authentication state for user
            // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        }
        checkUserCredentialState();
    }, []);

    return (
        <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
            <SafeAreaView>
                <Text style={styles.heading}>Back Up Account</Text>

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
    }
});