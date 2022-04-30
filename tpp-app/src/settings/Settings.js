import React, {useState, useEffect} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity, Linking, ImageBackground, SafeAreaView} from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import CrampsIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.svg';
import ExerciseIcon from '../../ios/tppapp/Images.xcassets/icons/exercise.svg';
import FlowIcon from '../../ios/tppapp/Images.xcassets/icons/flow.svg';
import MoodIcon from '../../ios/tppapp/Images.xcassets/icons/mood.svg';
import SleepIcon from '../../ios/tppapp/Images.xcassets/icons/sleep.svg';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Footer } from '../services/utils/footer';
import { ScrollView } from 'react-native-gesture-handler';
import {GETRemindLogPeriodFreq,  GETAllTrackingPreferences, GETRemindLogPeriod, GETRemindLogSymptoms, POSTRemindLogSymptoms, POSTUpdateOnePreference, GETRemindLogSymptomsFreq, GETRemindLogPeriodTime, GETRemindLogSymptomsTime } from '../services/SettingsService';
import {TRACK_SYMPTOMS, VIEWS} from '../services/utils/constants'
import CycleService from '../services/cycle/CycleService';
import {useFocusEffect} from '@react-navigation/native';
import {STACK_SCREENS} from './SettingsNavigator.js';
import ErrorFallback from "../error/error-boundary";

const PreferenceButton = (props) => {
    return (
    <View style = {styles.horizontalCenteredColumn}>
        <TouchableOpacity style={[styles.preferenceButton, {backgroundColor: props.set }]} onPress={props.onPress}>
            {props.source === VIEWS.Flow && <FlowIcon/>}
            {props.source === VIEWS.Mood && <MoodIcon fill="black"/>}
            {props.source === VIEWS.Sleep && <SleepIcon/>}
            {props.source === VIEWS.Exercise && <ExerciseIcon/>}
            {props.source === VIEWS.Cramps && <CrampsIcon/>}
        </TouchableOpacity>
        <Text>{props.cardName}</Text>

        </View>
    );
}

const SocialMediaButton = (props) => {
    const openLink = () => Linking.canOpenURL(props.url).then(() => {
        Linking.openURL(props.url);
    });

    return (
        <TouchableOpacity onPress={openLink} style={styles.icon}>
            {props.icon}
        </TouchableOpacity>
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
    const [trackingPrefs, setPrefs] = useState([]); // preferences that are currently tracked, default is empty

    useEffect(() => {
        async function fetchPreferences() {
            // get tracking references
            let stored = await GETAllTrackingPreferences();
            // set trackingPrefs somewhere
            for (let pref of stored) {
              let toTrack = pref[1].toLowerCase() === 'true';
              // if tracking that symptom is set to true, append it to trackingPrefs
                if (toTrack) {
                  let title = pref[0];
                  switch(title) {
                    case TRACK_SYMPTOMS.MOOD:
                      symptom = 'mood'
                      trackMood(TEAL);
                      break;
                    case TRACK_SYMPTOMS.SLEEP:
                      symptom = 'sleep'
                      trackSleep(TEAL);
                      break;
                    case TRACK_SYMPTOMS.CRAMPS:
                      symptom = 'cramps'
                      trackCramps(TEAL);
                      break;
                    case TRACK_SYMPTOMS.EXERCISE:
                      symptom = 'exercise'
                      trackExercise(TEAL);
                      break;
                    case TRACK_SYMPTOMS.FLOW:
                      symptom = 'flow'
                      trackFlow(TEAL);
                      break;
                    default:
                        break;
                  }
              }
            }
          }
          fetchPreferences();
      }, [])

    useEffect(() => {
        console.log(mood, 'im changing!')
    }, [mood])

    const handleFlow = () => {
        POSTUpdateOnePreference(TRACK_SYMPTOMS.FLOW, flow === WHITE)
            .then(() => {
                flow === WHITE ? trackFlow(TEAL) : trackFlow(WHITE);
            });
      }

      const handleSleep = () => {
        POSTUpdateOnePreference(TRACK_SYMPTOMS.SLEEP, sleep === WHITE)
            .then(() => {
                sleep === WHITE ? trackSleep(TEAL) : trackSleep(WHITE);
            });
      }

      const handleMood = async () => {
        POSTUpdateOnePreference(TRACK_SYMPTOMS.MOOD, mood === WHITE)
            .then(() => {
                mood === WHITE ? trackMood(TEAL) : trackMood(WHITE);
            });
      }

      const handleCramp = () => {
        POSTUpdateOnePreference(TRACK_SYMPTOMS.CRAMPS, cramps === WHITE)
            .then(() => {
                cramps === WHITE ? trackCramps(TEAL) : trackCramps(WHITE);
            });
      }

      const handleExercise = () => {
        POSTUpdateOnePreference(TRACK_SYMPTOMS.EXERCISE, exercise === WHITE)
            .then(() => {
                exercise === WHITE ? trackExercise(TEAL) : trackExercise(WHITE);
            });
      }
    return (
        <View>
            <Text style={styles.heading}>Tracking Preferences </Text>
            <View style={styles.preferences}>
                <PreferenceButton source={VIEWS.Mood} cardName="Mood" set={mood} onPress={handleMood}/>
                <PreferenceButton source={VIEWS.Exercise} cardName="Exercise" set={exercise} onPress={handleExercise}/>
                <PreferenceButton source={VIEWS.Cramps} cardName="Cramps" set={cramps} onPress={handleCramp}/>
                <PreferenceButton source={VIEWS.Sleep} cardName="Sleep" set={sleep} onPress={handleSleep}/>
            </View>
        </View>
    );
}

// const Socials = () => {
//     return (
//         <View style={styles.iconsContainer}>
//             {
//                 socialMediaIcons.map((socialMedia, i) => {
//                     return <SocialMediaButton key={i} icon={socialMedia.component} url={socialMedia.url} />
//                 })
//             }
//         </View>
//     );
// }

// const TermsAndConditions = () => {
//     const openLink = () => Linking.canOpenURL("https://www.google.com/").then(() => {
//         Linking.openURL("https://www.google.com/");
//     });

//     return (
//         <View styles={styles.termsAndConditionsContainer}>
//             <View style={styles.copyright}>
//                 <Text style={styles.copyrightText}>&copy; 2022 The Period Purse, All rights reserved.</Text>
//             </View>
//             <View style={styles.terms}>
//                 <TouchableOpacity onPress={openLink} style={styles.icon} >
//                     <Text style={styles.termsText}> Terms and Privacy Policy. </Text>
//                     <Text style={styles.lineText}> ______________________ </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

const settingScreens = new Map([
    ["Profile Information", STACK_SCREENS.PROFILE_INFORMATION],
    ["Privacy Policy", STACK_SCREENS.PRIVACY_POLICY],
    ["Log Out", STACK_SCREENS.LOG_OUT],
    ["Delete Account", STACK_SCREENS.DELETE_ACCOUNT]
])

const SettingsStackButton = (props) => {
    console.log(props);
    return (
    <TouchableOpacity onPress={() => props.navigation.navigate(STACK_SCREENS.DELETE_ACCOUNT)}>
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
                top: "5%"
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
        trackColor={{true: "#72C6B7"}}
        style={{
            top: "5%",
            left: "-10%"
        }}
    />

</View>
<Text style={styles.remindSubtext}>{props.subtext}</Text>
         <View
            style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1,
                bottom: "15%"
                }}/>
</View>
)}

const NotificationSettings = (props) => {
// needed for Settings Page
    const [remindPeriodEnabled, setRemindPeriodEnabled] = useState(false);
    const [remindSymptomsEnabled, setRemindSymptomsEnabled] = useState(false);
    const [numberOfDaysUntilPeriod, setNumberOfDaysUntilPeriod] = useState(0);

// needed for Notification Page
    const [remindPeriodFreq, setRemindPeriodFreq] = useState("2 days");
    const [remindPeriodTime, setRemindPeriodTime] = useState("10:00");
    const [remindPeriodTimeMeridian, setRemindPeriodTimeMeridian] = useState("AM");
    const [remindSymptomsFreq, setRemindSymptomsFreq] = useState("Every day");
    const [remindSymptomsTime, setRemindSymptomsTime] = useState("10:00");
    const [remindSymptomsTimeMeridian, setRemindSymptomsTimeMeridian] = useState("AM");

// get the days until period
    useFocusEffect(React.useCallback(() => {
        CycleService.GETPredictedDaysTillPeriod().then(numDays => {
            let toSet;
            if(numDays && numDays != -1){
              toSet = numDays;
            }
            else{
              toSet = 0
            }
            setNumberOfDaysUntilPeriod(toSet)
          })
          .catch(() => {
            setDaysTillPeriod(0);
          });

     }, []));

// get whether the switches need to be turned on
useEffect(() => {
    async function getRemindPeriodEnabled () {
        let remindPeriod = await GETRemindLogPeriod()
        setRemindPeriodEnabled(remindPeriod != null ? remindPeriod : false);
    }
    getRemindPeriodEnabled();
}, []);

useEffect(() => {
    async function getRemindSymptomsEnabled () {
        let remindSymptoms = await GETRemindLogSymptoms()
        setRemindSymptomsEnabled(remindSymptoms != null ? remindSymptoms : false);
    }
    getRemindSymptomsEnabled();
}, [])

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

    const togglePeriodSwitch = () => {
        setRemindPeriodEnabled(!remindPeriodEnabled)
        // POSTRemindLogPeriod(remindPeriodEnabled); // post here
        let daysAheadStr = remindPeriodFreq.split(" ")[0]

        let daysAhead = parseInt(daysAheadStr);
        console.log("334", remindPeriodEnabled);
        if(!remindPeriodEnabled){
            console.log("REMIND 0");
            // if (numberOfDaysUntilPeriod > daysAhead) { // if the number of days until period is less than days ahead, then we can't schedule notification
                PushNotificationIOS.addNotificationRequest({
                    id: 'remindperiod',
                    title: 'Period Reminder!',
                    body: `Your period is predicted to come in ${daysAheadStr} days.`,
                    badge: 1,
                    fireDate: getCorrectDate((numberOfDaysUntilPeriod - daysAhead), remindPeriodTime),
                    repeats: true
                })
            // }

        } else {
            PushNotificationIOS.removePendingNotificationRequests(['remindperiod'])
        }
    };
    const toggleSymptomsSwitch = () => { // post here

        setRemindSymptomsEnabled(!remindSymptomsEnabled);
        POSTRemindLogSymptoms(remindSymptomsEnabled);

        if (remindSymptomsEnabled) {
            console.log("REMIND1", remindPeriodFreq);
            // Schedule a reoccuring notification
            switch (remindPeriodFreq) {
                case "Every day":
                    PushNotificationIOS.addNotificationRequest({
                        id: 'remindsymptoms',
                        title: 'Daily Log Reminder',
                        body: 'Daily reminder to log your symptoms!',
                        badge: 1,
                        fireDate: getCorrectDate(1, remindSymptomsTime),
                        repeats: true,
                        repeatsComponent: {
                            hour: true,
                            minute: true,
                        },
                    });
                    break;
                case "Every week":
                    PushNotificationIOS.addNotificationRequest({
                        id: 'remindsymptoms',
                        title: 'Weekly Log Reminder',
                        body: 'Weekly reminder to log your symptoms!',
                        badge: 1,
                        fireDate: getCorrectDate(7, remindSymptomsTime),
                        repeats: true,
                        repeatsComponent: {
                            hour: true,
                            minute: true,
                        },
                    });
                    break;
                case "Every month":
                    PushNotificationIOS.addNotificationRequest({
                        id: 'remindsymptoms',
                        title: 'Monthly Log Reminder',
                        body: 'Monthly reminder to log your symptoms!',
                        badge: 1,
                        fireDate: getCorrectDate(30, remindSymptomsTime),
                        repeats: true,
                        repeatsComponent: {
                            hour: true,
                            minute: true,
                        },
                    });
                    break;
                case "Only during period":
                    if (CycleService.isOnPeriod) {
                        PushNotificationIOS.addNotificationRequest({
                        id: 'remindsymptoms',
                        title: 'Symptom Logging Reminder',
                        body: 'Reminder to log your period!',
                        badge: 1,
                        fireDate: getCorrectDate(1, remindSymptomsTime),
                        repeats: true,
                        repeatsComponent: {
                            hour: true,
                            minute: true,
                        },
                    });
                }
                    break;
                default:
                    break;
            }
        } else {
            PushNotificationIOS.removePendingNotificationRequests(['remindsymptoms'])
        }
    }

    const getCorrectDate = (daysAdded, time) => {
        // takes a string time and parses it
        const timeToSet = time.split("")
        let hour = parseInt(timeToSet[0].split(":")[0])
        let minute = parseInt(timeToSet[0].split(":")[1])

        // const date = new Date();
        // date.setDate(date.getDate() + daysAdded);
        // date.setHours(hour);
        // date.setMinutes(minute);
        // return date;
        const date = new Date();
        date.setDate(date.getDate());
        date.setHours(10);
        date.setMinutes(40);
        console.log("DATE SET", date);
        return date;
    };
return (

    <SafeAreaView style={{top: "-5%"}}>
        <Text style={styles.heading}>Notifications</Text>
        <NotificationsButton
            text={"Remind me to log period"}
            subtext={`${remindPeriodFreq} before at ${remindPeriodTime + " " + remindPeriodTimeMeridian}`}
            toggle={togglePeriodSwitch}
            enabled={remindPeriodEnabled} />
        <NotificationsButton
            text={"Remind me to log symptoms"}
            subtext={`${remindSymptomsFreq} at ${remindSymptomsTime + " " + remindSymptomsTimeMeridian}`}
            toggle={toggleSymptomsSwitch}
            enabled={remindSymptomsEnabled}/>
  <TouchableOpacity onPress={() => props.navigation.navigate(STACK_SCREENS.NOTIFICATIONS)}>
    <View>

     <SafeAreaView style={styles.notificationSettingsView} >
    <Text style={styles.optionText}>Customize notifications</Text>
    <View>
     <Icon
            name="arrow-back-ios"
            size={24}
            color="#5A9F93"
            style={{transform: [{rotateY: '180deg'}],}}
            />
    </View>
    </SafeAreaView>
    <View
        style={{
        borderBottomColor: '#CFCFCF',
        borderBottomWidth: 1,
        top: "15%"
        }}/>
       </View>
       </TouchableOpacity>
    </SafeAreaView>

)
}

const SettingOptions = ({navigation}) => {
    return (
        <SafeAreaView style={{top: "-8%"}}>
            <Text style={styles.heading}>Account settings </Text>
        {/*<SettingsStackButton name={"Profile Information"}  navigation={navigation} />*/}
        {/*<SettingsStackButton name={"Privacy Policy"}  navigation={navigation}/>*/}
        {/*<SettingsStackButton name={"Log Out"} navigation={navigation}/>*/}
        <SettingsStackButton name={STACK_SCREENS.DELETE_ACCOUNT} navigation={navigation} />
        </SafeAreaView>
    )
}
export default function Settings ({ navigation }) {
    return (
        <ErrorFallback>
            <ImageBackground source={OnboardingBackground} style={styles.bgImage}>
                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <View style={{ marginLeft: "5%" }}>
                        <Preferences/>
                        <NotificationSettings navigation={navigation}/>
                        <SettingOptions navigation={navigation}/>
                        </View>
                    <Footer navigation={navigation}/>
                    </SafeAreaView>
                </ScrollView>
            </ImageBackground>
        </ErrorFallback>
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
        alignItems: 'center'
    },
    preferences: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
        marginRight: 10,
        marginTop: -10,
        marginBottom: 75
    },
    dropShadow: {
        shadowOffset: {width:0, height:1},
        shadowRadius: 10,
        shadowOpacity: 0.25,
        shadowColor: "black"
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
        marginTop: "18%",
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
        paddingTop: "15%",
        paddingBottom: "15%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notificationSettingsView :{
        paddingTop: "-20%",
        paddingBottom: -20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    remindText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        height: 34,
        lineHeight: 34,
        left: -10
    },
    reminderTextBox : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: "3%",
        height: 72,
        left: 0
    },
    remindSubtext : {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 34,
        top: "-30%",
        color: '#6D6E71',
        left: 4
    },

    iconsContainer: {
        marginTop: 50,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    icon: {
        margin: 10,
    },
    termsAndConditionsContainer: {
        marginTop: 10,
    },
    copyright: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        color: "red"
    },
    copyrightText: {
        color: "#6D6E71"
    },
    terms: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    lineText: {
        marginTop: -10,
        color: "#5A9F93",
    },
    termsText: {
        color: "#5A9F93",
    },

});
