import React from 'react';
import {Text, View, Image} from 'react-native';

export default function TamponInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image
                />
        </View>
        <Text style={styles.titleText}>Tampons</Text>
        
        <Text style={styles.bodyText}>
        Heyyyy! Iz me, your period. 

        Can you imagine that Ancient Egyptians made tampons out of softened papyrus? Ancient 
        Greeks wrapped bits of wood with lint. Eeek. Today, tampons are made of absorbent 
        ingredients like purified cotton, rayon fibers, and sometimes bleach. But there are amazing 
        companies that make biodegradable tampons out of organic material. Do you know what’s in 
        your tampons?

        Tampon applicators are one of the most common items found when doing a beach clean up. 
        Double eeks. Can you find a tampon without an applicator?
        Don’t worry, tampons won’t get lost inside you and you can sleep with one inserted too.
        </Text>
        
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '6.37%',
        right: '6.37%',
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
           bottom: '-12.44%'},
    
});