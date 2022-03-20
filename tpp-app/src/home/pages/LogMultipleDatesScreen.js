import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg'
import { CalendarList } from 'react-native-calendars';
import { STACK_SCREENS } from '../CalendarNavigator';
import { getCalendarByYear, getSymptomsFromCalendar, initializeEmptyYear } from '../../services/utils/helpers';
import { Symptoms } from '../../services/utils/models';
import { FLOW_LEVEL } from '../../services/utils/constants';
import { LogMultipleDayPeriod } from '../../services/LogSymptomsService';


const DayComponent = ({ date, navigation, calendarData, addDate, removeDate }) => {

    const [symptoms, setSymptoms] = useState(new Symptoms);
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")

    // useEffect(() => {
    //     getSymptoms()
    // }, [])

    // const getSymptoms = async () => {
    //     const data = await getSymptomsFromCalendar(calendarData, date.day, date.month, date.year);
    //     setSymptoms(data);
    // }

    const multiSelect = () => {
        if(backgroundColor == "#FFFFFF"){
            setBackgroundColor("#73C7B7");
            addDate(date);
        } else {
            setBackgroundColor("#FFFFFF");
            removeDate(date);
        }
    }

    // const backgroundColor = symptoms.flow == null || symptoms.flow == FLOW_LEVEL.NONE ? "#FFFFFF" : "#5A9F93";    

    return(
        // onpress should select the dates for multi select
        <TouchableOpacity onPress={() => multiSelect()}>
            <View style={{...styles.dayContainer, backgroundColor: backgroundColor}}>
                <Text>
                    {date.day}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const Calendar = ({navigation, addDate, removeDate}) => {
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
    console.log(calendarData);
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
        dayComponent={({date}) => <DayComponent date={date}  navigation={navigation} calendarData={calendarData} addDate={addDate} removeDate={removeDate}/>}

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


export default function LogMultipleDatesScreen ({ navigation }) {
    const [selectedDates, setSelectedDates] = useState([])

    const addDate = date => {
        if (!selectedDates.includes(date)){
            selectedDates.push(date);
        }
    }

    const removeDate = date => {
        const index = selectedDates.indexOf(date);
        if (index != -1){
            selectedDates.splice(index, 1);
        }
    }

    const onSubmit = async() => {
        try {
            await LogMultipleDayPeriod(selectedDates);
        } catch (error) {
            console.log(error);
        }
        
    }


    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.close}>
                  <CloseIcon fill={'#181818'}/>
                </TouchableOpacity>
                <Text style={styles.navbarTitle}>Tap date to log period</Text>

            </View>
            
            <Calendar navigation={navigation} addDate={addDate} removeDate={removeDate}/>
            <TouchableOpacity onPress={() => {onSubmit()}} style={styles.submitButton}>
                <CloseIcon fill={'#181818'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navbarContainer: {
        paddingTop: 98,
        paddingBottom: 30,
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#72C6B7',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbarTitle: {
        color: '#181818',
        fontWeight: "600",
        fontSize: 20,
    },
    close: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 18,
      bottom: 27
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
    },
    submitButton: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 8, //IOS
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom:30,
        right:40,
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#73C7B7', 
    }
})
