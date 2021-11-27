import React from 'react';
import {Text, View, Image} from 'react-native';

export default function DidYouKnow() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image
                />
        </View>
        <Text>Did you know?</Text>
        
        <Text>
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