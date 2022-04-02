import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { DayComponent } from '../components/DayComponent'
import Selector from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import { Symptoms, ExerciseActivity } from '../../services/utils/models';
import { FLOW_LEVEL, MOOD_LEVEL, CRAMP_LEVEL, EXERCISE_TYPE } from '../../services/utils/constants';
import { GETYearData } from '../../services/CalendarService';
import { VIEWS } from '../../services/utils/constants';
import { getISODate } from '../../services/utils/helpers';

const sideComponentWidth = 120


export const Calendar = ({navigation, marked, yearData, setYearInView, selectedView}) => {

    return (
        <CalendarList
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}

        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}

        // Enable or disable scrolling of calendar list
        scrollEnabled={true}

        // Check which months are currently in view
        onVisibleMonthsChange={(months) => {
            let currentYears = []
            months.forEach(month => {
                let currentYear = parseInt(month['year'])
                if (currentYear && !currentYears.includes(currentYear)) {
                    currentYears.push(parseInt(month['year']))
                }
            })
            setYearInView(currentYears)
        }}

        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        dayComponent={({date, state, marking}) => <DayComponent date={date} state={state} marking={marking} navigation={navigation} selectedView={selectedView}/>}
        
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

        markedDates={marked} 
        />
    )
}

// Calendar Screen component that can be accessed by other functions
export default function CalendarScreen ({ navigation }) {
    const [dropdownExpanded, setDropdownExpanded] = useState(false);
    const [selectedView, setSelectedView] = useState(VIEWS.Nothing);
    const [yearInView, setYearInView] = useState([new Date().getFullYear()])

    const [yearData, setYearData] = useState({})
    const [marked, setMarked] = useState({})

    useEffect(() => {
        // Whenever the user scrolls and changes what year is in view
        yearInView.forEach(year => {
            let yearNumber = year.toString()
            // If the data for that year doesn't already exist
            if (yearData[yearNumber] === undefined) {
                newData = GETYearData(year)
                let newData = {
                    '2022':
                    [   
                        [
                            new Symptoms(FLOW_LEVEL.LIGHT, MOOD_LEVEL.ANGRY, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.BALL_SPORT, 230), 'lorem ipsum'),
                            new Symptoms()
                        ],
                        [
                            new Symptoms(FLOW_LEVEL.HEAVY, MOOD_LEVEL.HAPPY, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.MARTIAL_ARTS, 230), 'lorem ipsum'),
                        ],
                        [
                            new Symptoms(FLOW_LEVEL.HEAVY, MOOD_LEVEL.LOL, 800, CRAMP_LEVEL.TERRIBLE, new ExerciseActivity(EXERCISE_TYPE.CARDIO, 125), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.MEDIUM, MOOD_LEVEL.LOVED, 420, CRAMP_LEVEL.BAD, new ExerciseActivity(EXERCISE_TYPE.CYCLE_SPORT, 95), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.LIGHT, MOOD_LEVEL.NEUTRAL, 300, CRAMP_LEVEL.NEUTRAL, new ExerciseActivity(EXERCISE_TYPE.STRENGTH, 65), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.SPOTTING, MOOD_LEVEL.SAD, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.WATER_SPORT, 50), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.NONE, MOOD_LEVEL.SICK, 150, CRAMP_LEVEL.NONE, new ExerciseActivity(EXERCISE_TYPE.WINTER_SPORT, 0), 'lorem ipsum'),
                        ],
                    ]       
                }
                
                const newYear = {...yearData, ...newData};
                setYearData(newYear)

                newMarkedData = {}
                // We know that this data is now in the variable, so now attempt
                // to convert it into the appropriate key and value data
                let monthArray = newYear[yearNumber]
                if (monthArray) {
                    for (var i = 0; i < monthArray.length; i++) {
                        for (var j = 0; j < monthArray[i].length; j++) {
                            let date = new Date(year, i, j + 1)
                            let isoDate = getISODate(date);
                            let symptomData = monthArray[i][j]
    
                            // Add it into the marked state, which then updates the calendar
                            newMarkedData[isoDate] = {
                                symptoms: symptomData
                            }
                        }
                    }
    
                }
                setMarked(markedState => ({...markedState, ...newMarkedData}))
            }  

        })
    }, [yearInView, selectedView]) 


    const toggleSelectedView = (targetView) => {
        
        if (selectedView === targetView){
            setSelectedView(VIEWS.Nothing);
        }
        else {
            console.log("Selected " + targetView)
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
            <Calendar navigation={navigation} marked={marked} yearData={yearData} setYearInView={setYearInView} selectedView={selectedView}/>
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
})
