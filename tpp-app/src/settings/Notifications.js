import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const NotificationsButton = (props) => {
    const [periodAdvanceOpen, periodAdvanceSetOpen] = useState(false);
    const [periodAdvanceValue, setPeriodAdvanceValue] = useState(null);
    const [periodAdvanceItems, setPeriodAdvanceItems] = useState([
    {label: '1 day', value: '1 day'},
    {label: '2 days', value: '2 days'},
    {label: '3 days', value: '3 days'},
    {label: '4 days', value: '4 days'},
    {label: '5 days', value: '5 days'},
    {label: '6 days', value: '6 days'},
    {label: '7 days', value: '7 days'}
  ]);

  const [symptomsAdvanceOpen, setSymptomsAdvanceOpen] = useState(false);
  const [symptomsAdvanceValues, setSymptomsAdvanceValues] = useState(null);
  const [symptomsAdvanceTtems, setSymptomsAdvanceItems] = useState([
  {label: '1 day', value: '1 day'},
  {label: '2 days', value: '2 days'},
  {label: '3 days', value: '3 days'},
  {label: '4 days', value: '4 days'},
  {label: '5 days', value: '5 days'},
  {label: '6 days', value: '6 days'},
  {label: '7 days', value: '7 days'}
]);

const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={{top: -40}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
      
            <NotificationStack text={"Remind me to log period"}/>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
        <DropDownTab leftText={"How many days in advance"} rightText={"2 days"}/>
        <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>

        <DropDownTab leftText={"Reminder time"} rightText={"10:00"}/>
        <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
{/* <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}
            <NotificationStack text={"Remind me to log period"}/>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>     
              <DropDownTab leftText={"Repeat"} rightText={"Only during period"}/>
              <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>

        <DropDownTab leftText={"ReminderTime"} rightText={"10:00"}/>
        <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
                {/* <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}
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

const DropDownTab = (props) => {
    return (
    <View style={styles.dropDownTextBox}>
        <Text style={styles.dropDownLeftText}>{props.leftText}</Text>
        <Text style={styles.dropDownRightText}>{props.rightText}</Text>
        <Icon
            name="arrow-back-ios"
            size={24}
            color="#5A9F93"
            style={{transform: [{rotateY: '180deg'}],}}
            />     
        </View>
        )
}

export default function Notifications () {
    
    return (
        
        <SafeAreaView>

        <NotificationsButton
            />
        </SafeAreaView>
    )
}                

const NotificationStack = (props) => {
    return (
        <SafeAreaView>
        <SafeAreaView style={styles.optionView} >
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
        textAlign: 'left'
    },
    optionView:{
        paddingTop: -25,
        paddingBottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});