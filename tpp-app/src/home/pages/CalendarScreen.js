import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import Selector from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
//import { GETYearData } from '../../services/CalendarService';
import { Symptoms, ExerciseActivity } from '../../services/utils/models';
import { FLOW_LEVEL, MOOD_LEVEL, EXERCISE_TYPE, CRAMP_LEVEL, FILTER_COLOURS } from '../../services/utils/constants';
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";


const VIEWS = {
    Flow: "Period Flow",
    Nothing: "Select",
    Mood: "Mood",
    Exercise: "Exercise",
    Cramps: "Cramps",
    Sleep: "Sleep"
}
const sideComponentWidth = 120

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// The component that is used by each day in the calendar
const DayComponent = ({ date, state, marking, selectedView, navigation }) => {

    let bgColor;

    if (marking) {
        let viewKey = getKeyByValue(VIEWS, selectedView).toLowerCase()
        let symptomAttribute = marking.symptoms[viewKey]
        
        
        if (symptomAttribute) {
            let attribute = symptomAttribute
            
            switch (viewKey) {
                case 'sleep':
                    let sleepScore = attribute / 60
                    if (sleepScore >= 8) {
                        attribute = 'HEAVY'
                    } else if (sleepScore >= 6.5) {
                        attribute = 'MEDIUM'
                    } else if (sleepScore >= 5) {
                        attribute = 'LIGHT'
                    } else {
                        attribute = 'LITTLE'
                    }    
                    break;
                case 'exercise':
                    if (symptomAttribute.exercise_minutes > 120) {
                        attribute = 'HEAVY'
                    } else if (symptomAttribute.exercise_minutes > 90) {
                        attribute = 'MEDIUM'
                    } else if (symptomAttribute.exercise_minutes > 60) {
                        attribute = 'LIGHT'
                    } else {
                        attribute = 'LITTLE'
                    }    

                    break;
            }
            bgColor = FILTER_COLOURS[viewKey.toUpperCase()][attribute]
        }
    }


    return(
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.dayContainer} backgroundColor={bgColor}>
                <Text>
                    {date.day}    
                </Text>
                {/* <View style={styles.dayIcon}>
                    <Text>{icon}</Text>                
                </View> */}
            </View>
        </TouchableOpacity>
    )
}

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
    const [yearData, setYearData] = useState({'2021': 
    
        [
            new Symptoms(),
            new Symptoms(),
            new Symptoms(),
        ]
    
    })

    const [marked, setMarked] = useState({
        '2022-03-28': {
            symptoms: new Symptoms(FLOW_LEVEL.MEDIUM, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum'),
        }
    })

    useEffect(() => {
        // Whenever the user scrolls and changes what year is in view
        yearInView.forEach(year => {
            let yearNumber = year.toString()
            // If the data for that year doesn't already exist
            if (yearData[yearNumber] === undefined) {
                //newData = GETYearData(year)
                let newData = {
                    '2022':
                    [   
                        [
                            new Symptoms(FLOW_LEVEL.LIGHT, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.LIGHT, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum'),
                            new Symptoms()
                        ],
                        [
                            new Symptoms(FLOW_LEVEL.HEAVY, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.HEAVY, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum'),
                        ],
                        [
                            new Symptoms(FLOW_LEVEL.HEAVY, MOOD_LEVEL.GREAT, 800, CRAMP_LEVEL.TERRIBLE, new ExerciseActivity(EXERCISE_TYPE.YOGA, 125), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.MEDIUM, MOOD_LEVEL.GREAT, 420, CRAMP_LEVEL.BAD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 95), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.LIGHT, MOOD_LEVEL.GREAT, 300, CRAMP_LEVEL.NEUTRAL, new ExerciseActivity(EXERCISE_TYPE.YOGA, 65), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.SPOTTING, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.GOOD, new ExerciseActivity(EXERCISE_TYPE.YOGA, 50), 'lorem ipsum'),
                            new Symptoms(FLOW_LEVEL.SPOTTING, MOOD_LEVEL.GREAT, 150, CRAMP_LEVEL.NONE, new ExerciseActivity(EXERCISE_TYPE.YOGA, 0), 'lorem ipsum'),
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
                            let isoDate = date.toISOString().substring(0,10);
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
    dayContainer:{
        borderColor: '#D1D3D4',
        borderWidth: 1,
        borderRadius: 8,
        width: 50,
        height: 50,
        paddingLeft: 5,
        paddingTop:3,
        margin: 2,
    },
    dayIcon: {
        position: 'relative',
        fontSize: 100,
        left: '25%',
    }
})
