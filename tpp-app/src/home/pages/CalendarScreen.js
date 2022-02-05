import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import Selector from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VIEWS = {
    Flow: "Period Flow",
    Nothing: "Select",
    Mood: "Mood",
    Exercise: "Exercise",
    Cramps: "Cramps",
    Sleep: "Sleep"
}
const sideComponentWidth = 120

const storeData = async () => {
    try {
      const jsonValue = JSON.stringify("coollll")
      await AsyncStorage.setItem('wooow', jsonValue)
      console.log('did it')
    } catch (e) {
        console.log("big error" + e);
    }

    try {
        const res = await AsyncStorage.getItem('wooow')
        console.log('grabbed ' + res)
    } catch (e) {
        console.log("big error" + e);
    }
  }

// The component that is used by each day in the calendar
const DayComponent = ({ date, state, marking, navigation }) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("LogSymptoms", {"date": date})}>
            <View style={styles.dayContainer}>
                <Text>
                    {date.day}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Calendar = ({navigation}) => {
    storeData()
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
        dayComponent={({date, state, marking}) => <DayComponent date={date} state={state} marking={marking} navigation={navigation}/>}

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
            textDayHeaderFontSize: 10,
            'stylesheet.calendar.main': {
                dayContainer: {
                    flex:1,
                    margin: 0,
                },
                emptyDayContainer: {
                    flex:1,
                    margin: 0,
                },
                week: {
                    marginTop: 0,
                    marginBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                },
            }
        }}
        />
    )
}


// Calendar Screen component that can be accessed by other functions
export default function CalendarScreen ({ navigation }) {
    const [dropdownExpanded, setDropdownExpanded] = useState(false);
    const [selectedView, setSelectedView] = useState(VIEWS.Nothing);
    const toggleSelectedView = (targetView) => {
        if (selectedView === targetView){
            setSelectedView(VIEWS.Nothing);
        }
        else {
            setSelectedView(targetView);
        }
    }
    const renderedArrow = dropdownExpanded ? <Icon name="keyboard-arrow-up" size={24}/> : <Icon name="keyboard-arrow-down" size={24} />
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                {/*<BackButton
                    onPress={() => {
                        navigation.navigate('Year')
                    }}
                    title='Year'
                    width={sideComponentWidth}
                />*/}
                <Button icon={renderedArrow}
                    iconRight={true}
                    title={selectedView}
                    titleStyle={styles.dropdownText}
                        type="clear"
                    onPress={() => setDropdownExpanded(!dropdownExpanded)}
                    />
                <View style={{width:sideComponentWidth}}>
                    {/* This is a placeholder for the help button on final. Needed it for spacing*/}
                </View>
            </View>
            <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} toggleSelectedView={toggleSelectedView}/>
            <Calendar navigation={navigation}/>
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
        backgroundColor: '#FFFFFF'
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row"
    },
    dropdownText:{
        fontStyle: 'normal',
        fontWeight: "700",
        color: "#000",
        alignItems: 'center',
        lineHeight:20,

    },
    dayContainer:{
        borderColor: '#D1D3D4',
        borderWidth: 1,
        borderRadius: 8,
        width: 50,
        height: 50,
        paddingLeft: 5,
        paddingTop:3,
        margin: 2,
    }
})
