import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, ImageBackground} from 'react-native';
import PadImageHappy from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad-3-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import {GETFactCycle, POSTFactCycle } from "../info/InfoService"
import { getFullCurrentDateString } from "../services/utils/helpers.js"
import dykData from "../pages/DYKFacts.json"
import ErrorFallback from "../error/error-boundary";


export default function DidYouKnow({ navigation }) {
    const [factCycleDate, setFactCycleDate] = useState(""); // 0th index
    const [factCycleNum, setFactCycleNum] = useState(1); // number of fact
    const [retrievedFact, setRetrievedFact] = useState("Getting Fact");
    useEffect(() => {
        async function retrieveFactCycle() {
           let factWhole;
            GETFactCycle().then((factArray) => {
                console.log(19, factArray);
                factWhole = dykData[factCycleNum];
                setRetrievedFact(factWhole.slice(0, 84));

                if (!factArray){
                    POSTFactCycle().then(async () => {
                        let factArray = await GETFactCycle();
                        setFactCycleDate(factArray[0]);
                        setFactCycleNum(factArray[1]);
                        factWhole = dykData[factArray[1]]
                        console.log(`This is fact on DYKpage 28: ${factWhole}`)
                        setRetrievedFact(factWhole);
                    })
                }

                setFactCycleDate(factArray[0]);
                setFactCycleNum(factArray[1]);

                if (getFullCurrentDateString() !== factCycleDate) {
                    POSTFactCycle().then(async () => {
                        let factArray = await GETFactCycle();
                        console.log(`This is factArray on DYK 39: ${factArray}`)
                        setFactCycleDate(factArray[0]);
                        setFactCycleNum(factArray[1]);

                        factWhole = dykData[factArray[1]]
                        console.log(`This is factWhole on DYK 44: ${factWhole}`)

                        setRetrievedFact(factWhole);
                    });
                }
            }); 
        }
        retrieveFactCycle()
    }, [])

    let fact = dykData[factCycleNum]
    console.log(`This is factCycleArray number on DYK page: ${factCycleNum}`)
    console.log(`This is fact on DYK page: ${retrievedFact}`)

    return (
        <ErrorFallback>
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