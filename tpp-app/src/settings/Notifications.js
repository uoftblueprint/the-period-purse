import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from './NotificationAccordion'
import {Picker} from '@react-native-picker/picker';

const NotificationsButton = (props) => {
    return (
        <View style={{top: -120}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
      
            <NotificationStack name={"Remind me to log period"}/>
          
            <View>
            <Accordion title={"How many days in advance"} selectedText={"2 days"}  type={"days"}/> 
            <Accordion title={"Reminder time"} selectedText={"10:00"} type={"time"}/>

                </View>   
            <NotificationStack name={"Remind me to log symptoms"}/>
            <Accordion title={"Repeat"} selectedText={"Only During Period"}  type={"howOften"}/> 
            <Accordion title={"Reminder time"} selectedText={"10:00"} type={"time"}/>   
    </ScrollView>
        </View>
    )
}

const remindSwitch = (props) => {
    return ( 
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 16}}>
    <Text style={styles.remindText}>{}</Text>
    <Switch
        onValueChange={props.togglePeriodSwitch}
        value={props.remindPeriodEnabled}
         />
    </View>
    )}

export default function Notifications () {
    
    return (
        
        <SafeAreaView>

        <NotificationsButton />
        </SafeAreaView>
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