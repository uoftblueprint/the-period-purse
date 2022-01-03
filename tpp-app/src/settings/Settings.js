import React, {useState, useEffect} from 'react';
import {View, Switch, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {Card} from 'react-native-elements';
import CrampsIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.png';
import ExerciseIcon from '../../ios/tppapp/Images.xcassets/icons/exercise.png';
import FlowIcon from '../../ios/tppapp/Images.xcassets/icons/cramps.png';
import MoodIcon from '../../ios/tppapp/Images.xcassets/icons/mood.png';
import SleepIcon from '../../ios/tppapp/Images.xcassets/icons/sleep.png';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
// import GDrive from 'react-native-google-drive-api-wrapper';

var isLoggedIn = false;
const CLIENT_ID = "64015320596-sj0gule87m7s205lb5lv5jnlhd68c8u4.apps.googleusercontent.com";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// )
//
// const drive = google.drive({
//    version: "v3",
//    auth: oauth2Client,
// });

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
            <Card wrapperStyle={styles.rowContainer} containerStyle={[styles.dropShadow, styles.card]}>

                <Text> Remind me to log symptoms</Text>
                <Switch
                    onValueChange={props.toggleSymptomsSwitch}
                    value={props.remindSymptomsEnabled}
                />
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

const signIn = async () => {
    console.log("SIGN IN")
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const token = (await GoogleSignin.getTokens()).accessToken
        console.log(userInfo);
        console.log("\n");
        console.log(token);
        console.log("YUH");
        isLoggedIn = true;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log("sign in cancelled");
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log("in progress ");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("play services not available");
        } else {
            // some other error happened
            console.log("some error happened");
            console.log(error);
        }
    }
}

const _initGoogleDrive = async() => {
    let token = await GoogleSignin.getTokens();
    if (!token) return false
    console.log("res.accessToken: ", token.accessToken);
    // GDrive.setAccessToken(token.accessToken);
    // GDrive.init();
    // return GDrive.isInitialized();
}

const uploadDrive = async() => {
    if (!(await _initGoogleDrive())) {
        console.log("Failed to initialize Google Drive");
    }
}


const SaveDataToGoogleDriveAPI = (props) => {
    return (
        <View>
            <Text style={styles.heading}>Sign In to Google Drive! </Text>
            <TouchableOpacity
                style={styles.visitButton}
                onPress={() => signIn()}
            >
                <Text style={{...styles.productText, margin: 10}}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const UploadFile = (props) => {
    return (
        <View>
            <Text style={styles.heading}>Backup Data to Google Drive! </Text>
            <TouchableOpacity
                style={styles.visitButton}
                onPress={() => uploadDrive()}
            >
                <Text style={{...styles.productText, margin: 10}}>Backup</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function Settings () {
    const [cycleLength, setCycleLength] = useState(35);
    const [periodLength, setPeriodLength] = useState(5);
    const [remindPeriodEnabled, setRemindPeriodEnabled] = useState(true);
    const togglePeriodSwitch = () => setRemindPeriodEnabled(!remindPeriodEnabled);
    const [remindSymptomsEnabled, setRemindSymptomsEnabled] = useState(true);
    const toggleSymptomsSwitch = () => setRemindSymptomsEnabled(!remindSymptomsEnabled);

    return (
        <View style={styles.container}>
            <Stats cycleLength={cycleLength} periodLength={periodLength}></Stats>
            <Preferences/>
            <Notifications
                remindPeriodEnabled={remindPeriodEnabled}
                remindSymptomsEnabled={remindSymptomsEnabled}
                togglePeriodSwitch={togglePeriodSwitch}
                toggleSymptomsSwitch={toggleSymptomsSwitch}
            />
        </View>
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
        justifyContent: 'space-evenly',
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
    preferenceText: {
        fontFamily: "SF Pro Display",
        fontWeight:"600",
        fontSize: 14,
        lineHeight: 22

    },
    visitButton: {
        backgroundColor: "#73C7B7",
        borderRadius: 8,
    },

});
