import React, {useEffect, useState} from 'react';
import {View,  Text, StyleSheet, Image, TouchableOpacity, ImageBackground} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from './NotificationAccordion'
import { GETRemindLogPeriodFreq, GETRemindLogPeriodTime, GETRemindLogSymptomsFreq, GETRemindLogSymptomsTime } from '../services/SettingsService';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

export default function Notifications () {
    
    // states 
    const [advanceDays, setAdvanceDays] = useState("2 days");
    const [periodReminderTime, setPeriodReminderTime] = useState("10:00 AM");
    const [symptomsReminderFreq, setSymptomsReminderFreq] = useState("Only During Period");
    const [symptomsReminderTime, setSymptomsReminderTime] = useState("10:00 AM")

    // get for all of the shit, set the text 
    useEffect(() => {
        async function setPickers () {
            let storedAdvanceDays = await GETRemindLogPeriodFreq()
            let storedPeriodReminderTime = await GETRemindLogPeriodTime()
            let storedSymptomsReminderFreq = await GETRemindLogSymptomsFreq()
            let storedSymptomsReminderTime = await GETRemindLogSymptomsTime()

            if (storedAdvanceDays != null) {
                setAdvanceDays(storedAdvanceDays + " days")
            }

            if (storedPeriodReminderTime != null) {
                setPeriodReminderTime(storedPeriodReminderTime)
            }

            if (storedSymptomsReminderFreq != null) {
                setSymptomsReminderFreq(storedSymptomsReminderFreq)
            }

            if (storedSymptomsReminderTime != null) {
                setSymptomsReminderTime(storedSymptomsReminderTime)
            }
        }
    setPickers();
    },[]);

    return (
        <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
        <SafeAreaView>
        <View style={{top: -120}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
            <NotificationStack name={"Remind me to log period"}/>

            <Accordion title={"How many days in advance"} selectedText={advanceDays}  type={"days"}/> 
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <Accordion title={"Reminder time"} selectedText={periodReminderTime} type={"periodTime"}/>
                
            <NotificationStack name={"Remind me to log symptoms"}/>
            <Accordion title={"Repeat"} selectedText={symptomsReminderFreq}  type={"howOften"}/> 
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <Accordion title={"Reminder time"} selectedText={symptomsReminderTime} type={"symptomTime"}/>   
    </ScrollView>
        </View>
        </SafeAreaView>
        </ImageBackground>
    )
}                

const NotificationStack = (props) => {
    return (
        <SafeAreaView>
        <SafeAreaView style={styles.rowContainer} >
        <Text style={styles.optionText}>{props.name}</Text>
    
        </SafeAreaView>
        <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({   
    bgImage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
      dropShadow: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0//default is 1
    },
    dropDownTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingTop: 16,
        paddingRight: 16,
        paddingLeft: 16,
        height: 62,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    dropDownLeftText : {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 16,
        height: 34,
        lineHeight: 34
    },
    dropDownRightText : {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 34,   
        color: "#5A9F93",
        right: -50
    },
    optionText : {
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: "800",
        lineHeight: 34,
        textAlign: 'left',
        left: 16,
    },
    optionView:{
        paddingTop: -25,
        paddingBottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});