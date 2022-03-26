import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {Card} from 'react-native-elements';
import CrampsIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.png';
import ExerciseIcon from '../../ios/tppapp/Images.xcassets/icons/exercise.png';
import FlowIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.png';
import MoodIcon from '../../ios/tppapp/Images.xcassets/icons/mood.png';
import SleepIcon from '../../ios/tppapp/Images.xcassets/icons/sleep.png';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { socialMediaIcons } from './icons';
import { ScrollView } from 'react-native-gesture-handler';

const Stats = (props) => {

    return (
        <View>
            <Text style={styles.heading}>Your Stats</Text>
            <Card containerStyle={[styles.dropShadow, styles.card]}>
                <Text>Average cycle length: <Text style={{fontWeight: "bold"}}>{props.cycleLength} </Text> days</Text>
            </Card>
            <Card containerStyle={[styles.dropShadow, styles.card]}>
                <Text>Average period length: <Text style={{fontWeight: "bold"}}> {props.periodLength} </Text> days</Text>
            </Card>
        </View>
    )
}

const Notifications = (props) => {

    return (
        <View>
            <Text style={styles.heading}>Notifications</Text>
            <Card wrapperStyle={styles.rowContainer} containerStyle={[styles.dropShadow, styles.card]}>
                    <Text>Remind me to log period</Text>
                    <Switch
                        onValueChange={props.togglePeriodSwitch}
                        value={props.remindPeriodEnabled}
                    />
            </Card>
            <Card containerStyle={[styles.dropShadow, styles.card]}>
                <View style={styles.rowContainer}>
                    <Text>Remind me to log symptoms</Text>
                    <Switch
                        onValueChange={props.toggleSymptomsSwitch}
                        value={props.remindSymptomsEnabled}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.subheading}>Every day at 9:00 am</Text>
                </View>
            </Card>
        </View>
    )
}

const PreferenceButton = (props) => {

    return (
        <View style = {styles.horizontalCenteredColumn}>
            <TouchableOpacity style={[styles.dropShadow, styles.preferenceButton]}>
                    <Image
                        source={props.source}
                    />
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

const Socials = () => {
    return (
        <View style={styles.iconsContainer}>
            {
                socialMediaIcons.map((socialMedia, i) => {
                    return <SocialMediaButton key={i} icon={socialMedia.component} url={socialMedia.url} />
                })
            }
        </View>
    );
}

const TermsAndConditions = () => {
    const openLink = () => Linking.canOpenURL("https://www.google.com/").then(() => {
        Linking.openURL("https://www.google.com/");
    });

    return (
        <View styles={styles.termsAndConditionsContainer}>
            <View style={styles.copyright}>
                <Text style={styles.copyrightText}>&copy; 2022 The Period Purse, All rights reserved.</Text>
            </View>
            <View style={styles.terms}>
                <TouchableOpacity onPress={openLink} style={styles.icon} >
                    <Text style={styles.termsText}> Terms and Privacy Policy. </Text>
                    <Text style={styles.lineText}> ______________________ </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Settings () {
    const [cycleLength, setCycleLength] = useState(35);
    const [periodLength, setPeriodLength] = useState(5);
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
        <ScrollView style={styles.container}>
            <Stats cycleLength={cycleLength} periodLength={periodLength}></Stats>
            <Preferences/>
            <Notifications
                remindPeriodEnabled={remindPeriodEnabled}
                remindSymptomsEnabled={remindSymptomsEnabled}
                togglePeriodSwitch={togglePeriodSwitch}
                toggleSymptomsSwitch={toggleSymptomsSwitch}
            />
            <Socials />
            <TermsAndConditions />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    preferences: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    preferenceButton: {
        width: 75,
        height: 75,
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
        marginLeft: 24,
        marginRight: 38,
        marginTop: 85,
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
        fontSize: 15,
        letterSpacing: -0.3,
        marginBottom: 9,
        marginTop: 32,
        lineHeight: 20
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
    }
});
