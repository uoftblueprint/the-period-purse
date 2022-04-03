import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CrampsIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.png';
import ExerciseIcon from '../../ios/tppapp/Images.xcassets/icons/exercise.png';
import FlowIcon from '../../ios/tppapp/Images.xcassets/icons/flow.png';
import MoodIcon from '../../ios/tppapp/Images.xcassets/icons/mood.png';
import SleepIcon from '../../ios/tppapp/Images.xcassets/icons/sleep.png';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';


const PreferenceButton = (props) => {
    return (
    <View style = {styles.horizontalCenteredColumn}>
        <TouchableOpacity style={[styles.dropShadow, styles.preferenceButton]} onPress={props.onPress}>
                <Image
                    source={props.source}
                />
        </TouchableOpacity>
        <Text>{props.cardName}</Text>

    </View>
    );
}

const Preferences = (props) => {
    let WHITE = '#FFFFFF'
    let TEAL = "#73C7B7" 

    const [flow, trackFlow] = useState('#FFFFFF');
    const [mood, trackMood] = useState('#FFFFFF');
    const [sleep, trackSleep] = useState('#FFFFFF');
    const [cramps, trackCramps] = useState('#FFFFFF');
    const [exercise, trackExercise] = useState('#FFFFFF');
    return (
        <View>
            <Text style={styles.heading}>Tracking Preferences </Text>
            <View style={styles.preferences}>
                <PreferenceButton source={FlowIcon} cardName="Flow"/>
                <PreferenceButton source={MoodIcon} cardName="Mood"/>
                <PreferenceButton source={SleepIcon} cardName="Sleep"/>
                <PreferenceButton source={CrampsIcon} cardName="Cramps"/>
                <PreferenceButton source={ExerciseIcon} cardName="Exercise"/>
            </View>

        </View>

    );

}

const SettingsStackButton = (props) => {
    return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.name)}>
        <SafeAreaView style={styles.optionView} >

        <Text style={styles.optionText}>{props.name}</Text>
        <View>   
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
    </TouchableOpacity>
    );
}

const NotificationsButton = (props) => {
return( 
<View>
<View style={styles.reminderTextBox}>
    <Text style={styles.remindText}>{props.text}</Text>
    <Switch
        onValueChange={props.toggle}
        value={props.enabled}
    />
   
</View>
<Text style={styles.remindSubtext}>{props.subtext}</Text>
         <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                bottom: 20
                }}/>
</View>
)}

const NotificationSettings = ({navigation}) => {
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
        <Text style={styles.heading}>Account settings </Text>
        <NotificationsButton 
            text={"Remind me to log period"} 
            subtext={"2 days before at 9:00 am"} 
            toggle={togglePeriodSwitch} 
            enabled={remindPeriodEnabled} />
        <NotificationsButton
            text={"Remind me to log symptoms"}
            subtext={"Every day at 10:00 pm"} 
            toggle={toggleSymptomsSwitch}
            enabled={remindSymptomsEnabled}/>
        <SettingsStackButton name={"Notifications"} navigation={navigation} />

    </SafeAreaView>
)
}

const SettingOptions = ({navigation}) => {
    return (
        <View>
            <Text style={styles.heading}>Account settings </Text>
        <SettingsStackButton name={"Profile Information"}  navigation={navigation} />
        <SettingsStackButton name={"Privacy Policy"}  navigation={navigation}/>
        <SettingsStackButton name={"Log Out"} navigation={navigation}/>
        <SettingsStackButton name={"Delete Account"} navigation={navigation} />
        </View>
    )
}
export default function Settings ({ navigation }) {
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
        <View style={styles.container}>
            <Preferences/>
            <NotificationSettings navigation={navigation}/>
            <SettingOptions navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    preferences: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        left: -20
    },
    preferenceButton: {
        width: 50,
        height: 50,
        backgroundColor: '#73C7B7',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 14,
        marginVertical: 10
    },
    horizontalCenteredColumn: {
        alignItems: 'center'
    },
    container: {
        justifyContent: 'space-evenly',
        marginLeft: 24,
        marginRight: 38,
        marginTop: -20,
        marginBottom: 75
    },
    card: {
        borderRadius: 12,
        marginLeft:0
    },
    heading: {
        fontFamily: "Avenir",
        fontWeight: "800",
        color: "#6D6E71",
        fontSize: 16,
        letterSpacing: -0.3,
        marginBottom: 9,
        marginTop: 32,
        lineHeight: 20,
        left: 0
    },
    subheading: {
        fontSize: 12,
        color: 'gray',
    },

    preferenceText: {
        fontFamily: "SF Pro Display",
        fontWeight:"600",
        fontSize: 14,
        lineHeight: 22
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
    remindSubtext : {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 34,
        top: -20
    },

});
