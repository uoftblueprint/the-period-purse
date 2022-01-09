import React, {useState} from 'react';
import { View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Selector from '../components/Selector';

const VIEWS = {
    Flow: "Period Flow",
    Nothing: "Select",
    Mood: "Mood",
    Exercise: "Exercise",
    Cramps: "Cramps",
    Sleep: "Sleep"
}
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


// Calendar Screen component that can be accessed by other functions
export default function CalendarScreen ({ navigation }) {
    const [dropdownExpanded, setDropdownExpanded] = useState(false);
    const [selectedView, setSelectedView] = useState(VIEWS.Nothing);
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <BackButton
                    onPress={() => {
                        navigation.navigate('Year')
                    }}
                    title='Year'
                />
                <View>
                    <Button title={selectedView} onPress={() => setDropdownExpanded(!dropdownExpanded)}/>
                </View>
            </View>
            <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} setSelectedView={setSelectedView}/>
            <Calendar/>
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
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row"
    },
})
