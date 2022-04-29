import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, SafeAreaView} from 'react-native';
import ClothImage from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/cloth-pads-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import ErrorFallback from "../error/error-boundary";

export default function ClothPadInfo({ navigation }) {
    return (
        <ErrorFallback>
            <ImageBackground source={OnboardingBackground} style={styles.container}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.arrowPosition}><BackButton onPress={() => navigation.goBack()}/></View>
                        <Image
                        source= {ClothImage}
                        style={styles.image}
                            />
                    <Text style={styles.titleText}>Cloth Pads</Text>

                    <Text style={styles.bodyText}>
                    Storytime: here comes your period - reusable cloth pads are a great period product option!
                        {"\n\n"}
                    Cloth pads originated as cloth rags dating back to the 10th century in Ancient Greece. Now they
                    are made of cotton, an absorbent, leak-proof material such as “Zorb,” Polyurethane Laminate (a
                    plastic-like material for the pad’s backing), or amazing bamboo or organic cotton. Most of them
                    have snaps to secure the pad in place, like a pad with wings.
                        {"\n\n"}
                    You need about five cloth pads to wash and use throughout your cycle. They are also a financial
                    investment (around $100 for 5), but cloth pads will last for 2-3 years, depending on personal
                    usage and care.
                    </Text>

                </SafeAreaView>
            </ImageBackground>
        </ErrorFallback>
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
        width: 310, 
        height: 206, 
        left: 60, 
        top: "13%",
        bottom: 505
    },
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '15.47%',
        right: '13.6%',
        top: '35.74%',
        bottom: '58.5%',
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
           bottom: '10.59%'},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
});