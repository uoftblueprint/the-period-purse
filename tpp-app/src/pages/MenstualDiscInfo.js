import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function MenstrualDiscInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                />
        <Text>Menstural Disc</Text>
        
        <Text>
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
    )
}

const styles = StyleSheet.create({
    titleText: {
        image: {
            position: 'absolute', 
            width: 81, 
            height: 130, 
            left: 160, 
            top: 139, 
            bottom: 560
        },
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '10.64%',
        right: '10.64%',
        top: '15.15%',
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
    
});