import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, ListView } from 'react-native';
import {Card} from 'react-native-elements';

const Stats = (props) => {

    return (
        <View>
            <Text>Your Stats</Text>
            <Card>
                <Text>Average cycle length: <Text style={{fontWeight: "bold"}}>{props.cycleLength} </Text> days</Text>
            </Card>
            <Card>
                <Text>Average period length: <Text style={{fontWeight: "bold"}}> {props.periodLength} </Text> days</Text>
            </Card>
        </View>
    )
}

const Notifications = (props) => {

    return (
        <View>
            <Text>Notifications</Text>
            <Card wrapperStyle={styles.rowContainer}>
                    <Text>Remind me to log period</Text>
                    <Switch
                        onValueChange={props.togglePeriodSwitch}
                        value={props.remindPeriodEnabled}
                    />
            </Card>
            <Card wrapperStyle={styles.rowContainer}>

                <Text> Remind me to log symptoms</Text>
                <Switch
                    onValueChange={props.toggleSymptomsSwitch}
                    value={props.remindSymptomsEnabled}
                />
            </Card>
        </View>
    )
}

const Preferences = (props) => {
    return (
        <View>
            <Text>Tracking Preferences </Text>
            <View style={styles.preferences}>
                <Card><Text>Flow</Text></Card>
                <Card><Text>Mood</Text></Card>
                <Card><Text>Sleep</Text></Card>
                <Card><Text>Change</Text></Card>
                <Card><Text>Exercise</Text></Card>
            </View>

        </View>

    );

}

export default function Settings () {
    const [cycleLength, setCycleLength] = useState(35);
    const [periodLength, setPeriodLength] = useState(5);
    const [remindPeriodEnabled, setRemindPeriodEnabled] = useState(true);
    const togglePeriodSwitch = () => setRemindPeriodEnabled(!remindPeriodEnabled);
    const [remindSymptomsEnabled, setRemindSymptomsEnabled] = useState(true);
    const toggleSymptomsSwitch = () => setRemindSymptomsEnabled(!remindSymptomsEnabled);

    return (
        <View style={{flex:1, justifyContent: 'center'}}>
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
        flexDirection: 'row'
    },
    preferences: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    }

});
