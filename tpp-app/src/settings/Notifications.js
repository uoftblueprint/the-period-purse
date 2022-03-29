import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../home/components/BackButtonComponent';
import {Card} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

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
    return (
        <View style={{top: -40}}>
            <View style={styles.reminderTextBox}>
                    <Text style={styles.remindText}>Remind me to log period</Text>
                    <Switch
                        onValueChange={props.togglePeriodSwitch}
                        value={props.remindPeriodEnabled}
                    />
            </View>
            <View>

            </View>
            <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
                          <View style={styles.dropDownTextBox}>
                
            <DropDownPicker
            labelProps={"How many days in advance"}
            open={periodAdvanceOpen}
            value={periodAdvanceValue}
            items={periodAdvanceItems}
            setOpen={periodAdvanceSetOpen}
            setValue={setPeriodAdvanceValue}
            setItems={setPeriodAdvanceItems}
             />

                </View>
            <View style={styles.reminderTextBox}>
 
                    <Text style={styles.remindText}>Remind me to log symptoms</Text>
                    <Switch
                        onValueChange={props.toggleSymptomsSwitch}
                        value={props.remindSymptomsEnabled}
                    />
                
                </View>
                <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                }}/>
                 <View style={styles.dropDownTextBox}>
                <DropDownPicker
                open={symptomsAdvanceOpen}
                value={symptomsAdvanceValues}
                items={symptomsAdvanceTtems}
                setOpen={setSymptomsAdvanceOpen}
                setValue={setSymptomsAdvanceValues}
                setItems={setSymptomsAdvanceItems}/>
                </View>

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
    const [remindPeriodEnabled, setRemindPeriodEnabled] = useState(true);
    const [remindSymptomsEnabled, setRemindSymptomsEnabled] = useState(false);

    const togglePeriodSwitch = () => setRemindPeriodEnabled(!remindPeriodEnabled);
    const toggleSymptomsSwitch = () => {

        setRemindSymptomsEnabled(!remindSymptomsEnabled);    
        
        if (remindPeriodEnabled) {
            // Schedule a reoccuring notification 
            PushNotificationIOS.addNotificationRequest({
                id: 'remindsymptoms',
                title: 'Daily Log Reminder',
                body: 'Daily reminder to log your symptoms!',
                badge: 1,
                fireDate: getCorrectDate(),
                repeats: true,
                repeatsComponent: {
                    hour: true,
                    minute: true,
                },
            });
        } else {
            PushNotificationIOS.removePendingNotificationRequests(['remindsymptoms'])
        }
    }

    const getCorrectDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(9);
        date.setMinutes(0);
        return date;
    };
    
    return (
        
        <SafeAreaView>
        <NotificationsButton
                remindPeriodEnabled={remindPeriodEnabled}
                remindSymptomsEnabled={remindSymptomsEnabled}
                togglePeriodSwitch={togglePeriodSwitch}
                toggleSymptomsSwitch={toggleSymptomsSwitch}
            />
        </SafeAreaView>
    )
}                

const NotificationStack = (props) => {
    return (
        <SafeAreaView>
             <SafeAreaView style={styles.optionView} >

<Text style={styles.optionText}>{props.name}</Text>
<View style={
    {
        right: -200,
        top: 5
    }
}>   
    <Icon
            name="arrow-back-ios"
            size={24}
            color="#5A9F93"
            style={{transform: [{rotateY: '180deg'}],}}
            /></View>



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
    remindText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        height: 34,
        lineHeight: 34
    },
    reminderTextBox : {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        padding: 16,
        height: 72
    },
    dropDownTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingTop: 16,
        paddingRight: 16,
        paddingLeft: 16,
        height: 62
    },
    dropDownLeftText : {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 16,
        height: 34,
        lineHeight: 34
    }
});