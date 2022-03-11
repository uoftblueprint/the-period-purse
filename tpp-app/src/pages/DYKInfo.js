import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PadImageHappy from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad-3-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';
import {GETFactCycle, POSTFactCycle } from "../info/InfoService"
import { getFullCurrentDateString } from "../services/utils/helpers.js"

export default function DidYouKnow( {navigation} ) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={styles.arrowPosition}><BackButton onPress={() => navigation.goBack()}/></View>
            <Image
            source= {PadImageHappy}
            style={styles.image}
                />
        <Text style={styles.bodyText}> 
        <Text style={styles.titleText}>Did you know?</Text>
        {`${getFact()}`}
        </Text>
        </View>
    )
}


/**
 * Retrieves the fact that the user is supposed to see that day
 * @returns a string of the relevant fact
 */
 export function getFact() {
    // try to get the fact cycle array first
    var fact_array = GETFactCycle();

    // if the array is null, then this means we haven't initiatlized the fact cycle array
    if (fact_array == null) {
        // initialize the fact cycle with POSTFactCycle
        infoService.POSTFactCycle();
        fact_array = GETFactCycle();
    }

    // if today's date and the stored date don't match, update
    if (getFullCurrentDateString() != fact_array[0]) {
        POSTFactCycle();
        fact_array = GETFactCycle();
    }

    const dykData = require('../pages/DYKFacts.json');

    return dykData[fact_array[1]]
}

const styles = StyleSheet.create({
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
        height: 200,
        width: 193,
        left: 105,
        top: 406,
        bottom: 297},
    arrowPosition: {
            position: 'absolute',
            left: 17.05,
            right: 348.5,
            top: 54.51,
            bottom: 741.52
        }
});