import React, {useState} from 'react';
import { View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import flowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.png";
import moodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.png";
import exerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.png";
import crampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.png";
import sleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.png";


const Calendar = () => {
    return (
        <CalendarList
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}

        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}

        // Enable or disable scrolling of calendar list
        scrollEnabled={true}

        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}

        theme={{
            calendarBackground: '#ffffff',
            // Sun Mon Tue Wed Thu Fri Sat Bar
            textSectionTitleColor: '#000000',
            todayTextColor: 'red',
            dayTextColor: '#000000',
            monthTextColor: 'red',
            textDayFontFamily: 'Avenir',
            textMonthFontFamily: 'Avenir',
            textDayHeaderFontFamily: 'Avenir',
            textDayFontWeight: '500',
            textMonthFontWeight: '400',
            textDayHeaderFontWeight: '800',
            textDayFontSize: 10,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 10
        }}
        />
    )
}

const Dropdown = () => {
    const Views = {
        Flow: "Period Flow",
        Nothing: "Select",
        Mood: "Mood",
        Exercise: "Exercise",
        Cramps: "Cramps",
        Sleep: "Sleep"
    }
    const [expanded, setExpanded] = useState(false);
    const [selectedView, setSelectedView]  = useState(Views.Nothing);
    //maybe position change is from overflowing? It changes with whether it's inside the View with BackButton
    return (
    <View>
        <Button title={selectedView} onPress={() => setExpanded(!expanded)}/>
        {expanded &&
        <View style={styles.horizContainer}>
            <TouchableOpacity onPress={() => setSelectedView(Views.Flow)}>
                <Image style={[selectedView === Views.Flow && styles.selectedIcon, styles.icon]} source={flowIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedView(Views.Mood)}>
                <Image style={[selectedView === Views.Mood && styles.selectedIcon, styles.icon]} source={moodIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedView(Views.Exercise)}>
                <Image style={[selectedView === Views.Exercise && styles.selectedIcon, styles.icon]} source={exerciseIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedView(Views.Cramps)}>
                <Image style={[selectedView === Views.Cramps && styles.selectedIcon, styles.icon]} source={crampsIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedView(Views.Sleep)}>
                <Image style={[selectedView === Views.Sleep && styles.selectedIcon, styles.icon]} source={sleepIcon}/>
            </TouchableOpacity>

        </View>
        }
    </View>
    )

}

// Calendar Screen component that can be accessed by other functions
export default function CalendarScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <BackButton
                    onPress={() => {
                        navigation.navigate('Year')
                    }}
                    title='Year'
                />
                <Dropdown/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    navbarContainer: {
        marginTop: 98,
        position: 'relative',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row"
    },
    selectedIcon: {
        backgroundColor: '#EFEFF4'
    },
    icon: {
        margin: 5,
        width: 35,
        height: 35
    }
})
