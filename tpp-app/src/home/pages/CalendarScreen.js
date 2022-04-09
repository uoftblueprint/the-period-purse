import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { DayComponent } from '../components/DayComponent'
import Selector from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import { GETYearData } from '../../services/CalendarService';
import { VIEWS } from '../../services/utils/constants';
import { getISODate } from '../../services/utils/helpers';
import { useFocusEffect } from '@react-navigation/native';

const sideComponentWidth = 120

export const Calendar = ({navigation, marked, setYearInView, selectedView}) => {

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
export default function CalendarScreen ({ route, navigation }) {
    const [dropdownExpanded, setDropdownExpanded] = useState(false);
    const [selectedView, setSelectedView] = useState(VIEWS.Nothing);
    const [yearInView, setYearInView] = useState([new Date().getFullYear()])

    const [cachedYears, setCachedYears] = useState({})
    const [marked, setMarked] = useState({})

    useEffect(() => {

        // Whenever the user scrolls and changes what year is in view
        yearInView.forEach(async(year) => {
            let yearNumber = year.toString()
            // If the data for that year doesn't already exist
            if (cachedYears[yearNumber] === undefined) {
                let currentYearData = {}
                currentYearData[year] = await GETYearData(year)
                
                let newCachedYears = {}
                newCachedYears[yearNumber] = true
                setCachedYears(cachedState => ({...cachedState, ...newCachedYears}))
                
                let newMarkedData = {}
                // We know that this data is now in the variable, so now attempt
                // to convert it into the appropriate key and value data
                let monthArray = currentYearData[yearNumber]
                if (monthArray) {
                    for (let i = 0; i < monthArray.length; i++) {
                        for (let j = 0; j < monthArray[i].length; j++) {
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
    }, [yearInView]) 

    useFocusEffect(
        useCallback(() => {
            let newMarkedData = route.params?.inputData
            console.log(newMarkedData)
            if (newMarkedData) {
                setMarked(markedState => ({...markedState, ...newMarkedData}))
            }

        }, [route.params?.inputData])
    )


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
            </View>
            <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} toggleSelectedView={toggleSelectedView}/>
            <Calendar navigation={navigation} marked={marked} setYearInView={setYearInView} selectedView={selectedView}/>
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
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
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
