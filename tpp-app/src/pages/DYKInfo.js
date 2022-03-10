import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PadImageHappy from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad-3-2x.png';
import { BackButton } from '../home/components/BackButtonComponent';

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
        A period is a natural part of a 
        person's life when the body is 
        preparing for pregnancy. If no 
        pregnancy occurs, the lining 
        of the uterus sheds. This is 
        known as your period. 
        </Text>
        
        </View>
    )
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