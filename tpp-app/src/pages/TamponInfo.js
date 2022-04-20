import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, SafeAreaView} from 'react-native';
import TamponImage from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/tampons-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

export default function TamponInfo({ navigation }) {
    return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.arrowPosition}><BackButton onPress={() => navigation.goBack()}/></View>
                    <Image
                    source= {TamponImage}
                    style={styles.image}
                        />
                <Text style={styles.titleText}>Tampons</Text>

                <Text style={styles.bodyText}>
                Heyyyy! Iz me, your period.
                    {"\n\n"}
                Can you imagine that Ancient Egyptians made tampons out of softened papyrus? Ancient
                Greeks wrapped bits of wood with lint. Eeek.
                    {"\n\n"}
                    Today, tampons are made of absorbent
                ingredients like purified cotton, rayon fibers, and sometimes bleach. But there are amazing
                companies that make biodegradable tampons out of organic material. Do you know what’s in
                your tampons?
                    {"\n\n"}
                Tampon applicators are one of the most common items found when doing a beach clean up.
                Double eeks. Can you find a tampon without an applicator?
                Don’t worry, tampons won’t get lost inside you and you can sleep with one inserted too.
                </Text>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
      },
    image: {
        position: 'absolute', 
        width: 212, 
        height: 117, 
        left: 97, 
        top: "20%",
        bottom: 560
    },
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '6.37%',
        right: '6.37%',
        top: '37%',
        bottom: '15.15%',
        fontWeight: '800',
        fontSize: 34,
        lineHeight: 46,
        letterSpacing: -0.02
    },
    bodyText: {
           position: 'absolute',
           textAlign: 'center',
           fontFamily: 'Avenir',
           fontSize: 14,
           lineHeight: 19,
           letterSpacing: -0.3,
           left: '14.13%',
           right: '14.13%',
           top: '45.94%',
           bottom: '-12.44%'},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
    
});