import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, SafeAreaView} from 'react-native';
import UnderwearImage from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/underwear-clear-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

export default function PeriodUnderwearInfo({navigation}) {
    return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.arrowPosition}><BackButton  onPress={() => navigation.goBack()}/></View>

                <Image
                source= {UnderwearImage}
                style={styles.image}
                    />
                <Text style={styles.titleText}>Period {"\n"} Underwears</Text>

                <Text style={styles.bodyText}>
                Quick, your period is “OMW”- period underwear has you covered. Wow, the first period
                underwear product arrived on the market in the late 1980s!?
                    {"\n\n"}
                Period underwear is designed to completely replace pads and tampons (or be used as a
                backup). With a leak-proof layer, it can absorb 1-2 tampons’ worth of fluid! Change it daily like
                normal underwear, but give it a quick rinse with cool water before washing it with your regular
                laundry.
                    {"\n\n"}
                While period underwear can be costly, ranging from $30-$100 per pair depending on size, fit
                and duration of wear, it can cost you less in the long run as one pair generally lasts a few years.
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
            width: "48%",
            height: "17%",
            left: "25%",
            top: "20%"
    },
    titleText: {
        position: 'relative',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '1.00%',
        right: '0%',
        bottom: '11.36%',
        fontWeight: '800',
        fontSize: 34,
        lineHeight: 40
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
           top: '52.94%',
           bottom: '10.59%'},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
    
});