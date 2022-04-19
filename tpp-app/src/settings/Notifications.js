import React, {useEffect, useState} from 'react';
import {View,  Text, StyleSheet, ImageBackground} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from './NotificationAccordion'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'


export default function Notifications () {
    const [remindPeriodFreq, setRemindPeriodFreq] = useState("2 days");
    const [remindPeriodTime, setRemindPeriodTime] = useState("10:00");
    const [remindPeriodTimeMeridian, setRemindPeriodTimeMeridian] = useState("AM");
    const [remindSymptomsFreq, setRemindSymptomsFreq] = useState("Every day");
    const [remindSymptomsTime, setRemindSymptomsTime] = useState("10:00");
    const [remindSymptomsTimeMeridian, setRemindSymptomsTimeMeridian] = useState("AM");

    const [notificationSettingsValues, setNotificationSettingsValues] = useState([remindPeriodFreq, remindPeriodTime, remindPeriodTimeMeridian,
        remindSymptomsFreq, remindSymptomsTime, remindSymptomsTimeMeridian]);
    const [notificationSettingFunctions, setNotificationSettingFunctions] = useState([setRemindPeriodFreq, setRemindPeriodTime, setRemindPeriodTimeMeridian,
        setRemindSymptomsFreq, setRemindSymptomsTime, setRemindSymptomsTimeMeridian]);

// get the frequencies
useEffect(() => {
    async function getFreqTimes() {
        let storedPeriodFreq = await GETRemindLogPeriodFreq();
        let storedSymptomFreq = await GETRemindLogSymptomsFreq();
        let storedPeriodTime = await GETRemindLogPeriodTime();
        let storedSymptomTime = await GETRemindLogSymptomsTime();

        if (storedPeriodFreq) {
            setRemindPeriodFreq(storedPeriodFreq);
        }

        if (storedSymptomFreq) {
            setRemindSymptomsFreq(storedPeriodFreq);
        }

        if (storedPeriodTime) {
            setRemindPeriodTime(storedPeriodTime.slice(0, storedPeriodTime.length - 2));
            setRemindPeriodTimeMeridian(storedPeriodTime.slice(-2));

        }

        if(storedSymptomTime) {
            setRemindSymptomsTime(storedSymptomTime.slice(0, storedSymptomTime.length - 2));
            setRemindSymptomsTimeMeridian(storedSymptomTime.slice(-2));
        }
// [periodFreq, periodTime, periodMerdian, symptomsFreq, symptomsTime, symptomsMerdian], same pattern for setting functions
        setNotificationSettingsValues([remindPeriodFreq, remindPeriodTime, remindPeriodTimeMeridian,
                                        remindSymptomsFreq, remindSymptomsTime, remindSymptomsTimeMeridian]);

        setNotificationSettingFunctions([setRemindPeriodFreq, setRemindPeriodTime, setRemindPeriodTimeMeridian,
                                        setRemindSymptomsFreq, setRemindSymptomsTime, setRemindSymptomsTimeMeridian]);
                        
    }
    getFreqTimes();
}, []);

    return (
        <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
        <SafeAreaView>
        <View style={{top: -90}}>

            <NotificationStack name={"Remind me to log period"}/>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>

            <Accordion title={"How many days in advance"} selectedText={remindPeriodFreq} type={"days"}  pickerDataValues={notificationSettingsValues} pickerDataFunctions={notificationSettingFunctions}/> 
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <Accordion title={"Reminder time"} selectedText={`${remindPeriodTime} ${remindPeriodTimeMeridian}`} type={"periodTime"}  pickerDataValues={notificationSettingsValues} pickerDataFunctions={notificationSettingFunctions}/>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <NotificationStack name={"Remind me to log symptoms"}/>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <Accordion title={"Repeat"} selectedText={remindSymptomsFreq}  type={"howOften"}  pickerDataValues={notificationSettingsValues} pickerDataFunctions={notificationSettingFunctions}/> 
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
            <Accordion title={"Reminder time"} selectedText={`${remindSymptomsTime} ${remindSymptomsTimeMeridian}`} type={"symptomTime"} pickerDataValues={notificationSettingsValues} pickerDataFunctions={notificationSettingFunctions}/>   
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
        </View>
        </SafeAreaView>
        </ScrollView>
        </ImageBackground>
    )
}                

const NotificationStack = (props) => {
    return (

        <SafeAreaView style={styles.rowContainer} >
        <Text style={styles.optionText}>{props.name}</Text>
    
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
        bottom: -10
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