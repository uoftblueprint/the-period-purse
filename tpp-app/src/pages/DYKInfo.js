import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, ImageBackground} from 'react-native';
import PadImageHappy from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad-3-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import {GETFactCycle, POSTFactCycle } from "../info/InfoService"
import { getFullCurrentDateString } from "../services/utils/helpers.js"
import dykData from "../pages/DYKFacts.json"

export default function DidYouKnow({ navigation }) {
    const [factCycleArray, setFactCycleArray] = useState([]);
    useEffect(() => {
        async function retrieveFactCycle() {
            var factArray = await GETFactCycle()
            setFactCycleArray(factArray);
            console.log(`${factArray}`)

            if (!factArray){
                await POSTFactCycle().then(async () => {
                    factArray = await GETFactCycle();
                    console.log(`${factArray}`)
                    setFactCycleArray(factArray);
                })
            }
        if (getFullCurrentDateString() != factArray[0]) {
            POSTFactCycle().then(async () => {
            factArray = await GETFactCycle();
            console.log(`${factArray}`)
            setFactCycleArray(factArray)
        });
        }    
        }
        retrieveFactCycle()
    }, [])

    let fact = dykData[factCycleArray[1]]
    console.log(`This is factCycleArray: ${factCycleArray[1]}`)
    console.log(`This is fact: ${fact}`)

    return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <View style={styles.arrowPosition}><BackButton onPress={() => navigation.goBack()}/></View>
                <Image
                source= {PadImageHappy}
                style={styles.image}
                    />
            <Text style={styles.bodyText}>
            <Text style={styles.titleText}>Did you know?</Text>
                {"\n"}
                {"\n"}
               {fact}
            </Text>

            </SafeAreaView>
        </ImageBackground>
    )
}


/**
 * Retrieves the fact that the user is supposed to see that day
 * @returns a string of the relevant fact
 */
//  const getFact = async () => {
//     // try to get the fact cycle array first
//     var factArray = await GETFactCycle();

//     // if the array is null, then this means we haven't initiatlized the fact cycle array
//     if (factArray == null) {
//         // initialize the fact cycle with POSTFactCycle
//         await POSTFactCycle().then( async () => {
//             factArray = await GETFactCycle();
//         });
        
//     }
//     // if today's date and the stored date don't match, update
//     if (getFullCurrentDateString() != factArray[0]) {
//         POSTFactCycle().then(() => {
//             factArray = GETFactCycle();
//         });
//     }

//     return dykData[factArray[1]]
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    image: {
        position: 'absolute', 
        width: 137, 
        height: 177, 
        left: 123, 
        top: 208, 
        bottom: 427
    },
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        height: 109,
        width: 193,
        left: 91,
        top: 406,
        bottom: 297,
        fontWeight: '800',
        fontSize: 15,
        lineHeight: 20.49,
        letterSpacing: -0.02
    },
    bodyText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20.49,
        letterSpacing: -0.3,
        height: "40%",
        width: "50%",
        left: "25%",
        top: "55%",
        bottom: 297},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
});