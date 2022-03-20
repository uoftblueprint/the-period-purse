import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import Selector from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarByYear, getSymptomsFromCalendar, initializeEmptyYear } from '../../services/utils/helpers';
import { FLOW_LEVEL } from '../../services/utils/constants';
import { POSTsymptomsForDate } from '../../services/LogSymptomsService';
import { Symptoms } from '../../services/utils/models';
import { STACK_SCREENS } from '../CalendarNavigator';

const VIEWS = {
    Flow: "Period Flow",
    Nothing: "Select",
    Mood: "Mood",
    Exercise: "Exercise",
    Cramps: "Cramps",
    Sleep: "Sleep"
}
const sideComponentWidth = 120


// The component that is used by each day in the calendar
const DayComponent = ({ date, state, marking, navigation, calendarData }) => {

    const [symptoms, setSymptoms] = useState(new Symptoms);
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

    useEffect(() => {
        getSymptoms();
    }, [])
    
    useEffect(() => {
        setBackgroundColor(symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE ? "#FFFFFF" : "#B31F20");
    }, [symptoms])

    const getSymptoms = async () => {
        const data = await getSymptomsFromCalendar(calendarData, date.day, date.month, date.year);
        setSymptoms(data);
    }

    // const backgroundColor = symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE ? "#FFFFFF" : "#B31F20";    

    return(
        <TouchableOpacity onPress={() => navigation.navigate(STACK_SCREENS.LOG_SYMPTOMS, {"date": date})}>
            <View style={{...styles.dayContainer, backgroundColor: backgroundColor}}>
                <Text>
                    {date.day}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const Calendar = ({navigation}) => {
    const [calendarData, setCalendarData] = useState({});

    useEffect(() => {
        getCalendarData()
    },[])

    const getCalendarData = async () => {
        // will need to choose the correct year depending on which year the user is looking at
        const data = await getCalendarByYear(2022);
        setCalendarData(data);
    }

    // AsyncStorage.setItem("2022", JSON.stringify(initializeEmptyYear(2022)));
    console.log("Calendar stuff:",calendarData);
    // let symptomtest = new Symptoms();
    // symptomtest.flow = FLOW_LEVEL.MEDIUM;
    // POSTsymptomsForDate(10, 3, 2022, symptomtest);
    // console.log(GETsymptomsForDate(10, 3, 2022));
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
        dayComponent={({date, state, marking}) => <DayComponent date={date} state={state} marking={marking} navigation={navigation} calendarData={calendarData}/>}

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
        backgroundColor: '#FFFFFF'
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
        // backgroundColor: '#B31F20',
        borderWidth: 1,
        borderRadius: 8,
        width: 50,
        height: 50,
        paddingLeft: 5,
        paddingTop:3,
        margin: 2,
    }
})
