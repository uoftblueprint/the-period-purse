import React from 'react';
import {Text, View, Image} from 'react-native';

export default function MenstrualCupInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image
                />
        </View>
        <Text>Menstrual Cup</Text>
        
        <Text>
        Just popping in to let you know - the earliest versions of the menstrual cup were designed in 
        1932 and made of natural rubber. Today, menstrual cups are typically made of silicone, which is
        flexible, durable and anti-bacterial.
        
        Menstrual cups are cost effective and sustainable, with almost no waste created each cycle. A 
        cup costs about $40 CAD and can last at least two years.
        
        A menstrual cup can be used for up to 12 hours, depending on your menstrual flow. It does take
        a few uses to learn how often you want to “empty” your cup, and this can vary for each cycle 
        and for every person.
        </Text>
        
        </View>
    )
}