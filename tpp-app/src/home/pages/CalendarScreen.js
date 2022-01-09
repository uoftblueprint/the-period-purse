import React, {useState} from 'react';
import { View, StyleSheet, Button, Text, Image, TouchableOpacity } from 'react-native';
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
/*TODO: This is kinda cringe. Wanted this to prevent magic #.
 Need side components to be same width so the selectedView is centered by flexbox
 */
const sideComponentWidth = 120
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
                    width={sideComponentWidth}
                />
                <View>
                    <Button title={selectedView} onPress={() => setDropdownExpanded(!dropdownExpanded)}/>
                </View>
                <View style={{width:sideComponentWidth}}>
                    {/* This is a placeholder for the help button on final. Needed it for spacing*/}
                    <Text>
                        ?
                    </Text>
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
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        backgroundColor: '#00FF00'
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row"
    },
})
