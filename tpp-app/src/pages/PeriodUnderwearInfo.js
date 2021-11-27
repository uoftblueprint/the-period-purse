import React from 'react';
import {Text, View, Image} from 'react-native';

export default function PeriodUnderwearInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image
                />
        </View>
        <Text style={styles.titleText}>Period Underwear</Text>
        
        <Text style={styles.bodyText}>
        Quick, your period is “OMW”- period underwear has you covered. Wow, the first period 
        underwear product arrived on the market in the late 1980s!?

        Period underwear is designed to completely replace pads and tampons (or be used as a 
        backup). With a leak-proof layer, it can absorb 1-2 tampons’ worth of fluid! Change it daily like 
        normal underwear, but give it a quick rinse with cool water before washing it with your regular 
        laundry.

        While period underwear can be costly, ranging from $30-$100 per pair depending on size, fit 
        and duration of wear, it can cost you less in the long run as one pair generally lasts a few years.
        </Text>
        
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Avenir',
        left: '3.62%',
        right: '0%',
        top: '11.36%',
        bottom: '11.36%',
        fontWeight: "800",
        fontSize: 34,
        lineHeight: 34
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
           bottom: '10.59%'},
    
});