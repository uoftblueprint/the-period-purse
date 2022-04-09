import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { BackButton } from '../home/components/BackButtonComponent';
import DiscImage from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/disc_image.png';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

export default function MenstrualDiscInfo({ navigation }) {
    return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.arrowPosition}><BackButton onPress={() => navigation.goBack()}/></View>
                    <Image 
                    source= {DiscImage}
                    style={styles.image}
                        />
                <Text style={styles.titleText}>Menstrual Disc</Text>
                
                <Text style={styles.bodyText}> 
                Vibe check! (Because your period’s almost here). Menstrual discs are gaining popularity very 
                quickly and were created less than 30 years ago! 

                Unlike menstrual cups, discs don't use suction to stay in place. If you can feel it, try making sure
                that it is pushed all the way back before tucking it up behind your pubic bone.
                
                Many menstrual discs are single use, but there are more companies coming on the market 
                introducing reusable menstrual discs. They are made of non-porous medical grade silicone, and
                like a menstrual cup, should be changed up to every 12 hours. They only come in one size and 
                one shape, so it fits everyone!
                </Text>
            
            </View>
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
        width: 114, 
        height: 108, 
        top: '18%'
    },
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '10.64%',
        right: '10.64%',
        top: '35.84%',
        bottom: '15.15%',
        fontWeight: "800",
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
           bottom: '4.68%'},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
});