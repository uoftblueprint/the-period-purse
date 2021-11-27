import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PadImage from "tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad- 2x.png";

export default function PadInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image
                source= {(PadImage)}
                style={{position: 'absolute', width: 80, height: 164, left: 146, top: 80}}
                />
        </View>
        <Text style={styles.titleText}>Pads</Text>
        
        <Text style={styles.bodyText}>
            BRB, grabbing a pad.

            Despite being the oldest period product, 
            invented back in the 10th century, we’re still 
            the most popular choice for youth.

            Do you know what is inside your pad? Most
            are made from plastic, so every pad you’ve 
            ever used is still sitting in a landfill. Ack. 
            There are brands that use healthier, biodegradable ingredients like bamboo. You 
            gotta go check them out.

            Period prep time: remember to keep one
            or two pads in your school backpack for you
            and your friends! They come in different sizes and absorbencies, so you’ll have to test them out to see which ones work best for you during your cycle.
        </Text>
        
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
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