import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CalendarList } from 'react-native-calendars';
import { DayComponent } from '../components/DayComponent'
import Selector, {SelectedIcon} from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import { GETYearData } from '../../services/CalendarService';
import { VIEWS } from '../../services/utils/constants';
import { getISODate } from '../../services/utils/helpers';
import { useFocusEffect } from '@react-navigation/native';

const sideComponentWidth = 120
export let scrollDate = new Date()

export const Calendar = ({ navigation, marked, setYearInView, selectedView, currentDate }) => {

    return (
        <CalendarList
        // Initially visible month. Default = now
        current={currentDate ? currentDate : scrollDate}

        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}

        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={0}

        // Enable or disable scrolling of calendar list
        scrollEnabled={true}

        // Check which months are currently in view
        onVisibleMonthsChange={(months) => {
            scrollDate = months[0]['dateString']
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
    const [yearInView, setYearInView] = useState([])

    const [cachedYears, setCachedYears] = useState({})
    const [marked, setMarked] = useState({})

    useEffect(() => {
        async function fetchYearData() {
            // Whenever the user scrolls and changes what year is in view
            for(let year of yearInView) {

                // If the data for that year doesn't already exist
                if (cachedYears[year] === undefined) {

                    let currentYearData = {}
                    currentYearData[year] = await GETYearData(year)

                    let newCachedYears = {}
                    newCachedYears[year] = true
                    setCachedYears(cachedState => ({...cachedState, ...newCachedYears}))

                    let newMarkedData = {}
                    // We know that this data is now in the variable, so now attempt
                    // to convert it into the appropriate key and value data
                    let monthArray = currentYearData[year]
                    if (monthArray) {
                        for (let i = 0; i < monthArray.length; i++) {
                            for (let j = 0; j < monthArray[i].length; j++) {
                                let date = new Date(year, i, j + 1)
                                let isoDate = getISODate(date);
                                let symptomData = monthArray[i][j]
        
                                // Add it into the marked state, which then updates the calendar
                                newMarkedData[isoDate] = {
                                    symptoms: symptomData,
                                    disable: date > new Date()
                                }
                            }
                        }
                    }
                    setMarked(markedState => ({...markedState, ...newMarkedData}));
                } 
            }
        }

        fetchYearData()
    }, [yearInView]) 

    useFocusEffect(
        useCallback(() => {
            let newMarkedData = route.params?.inputData
            if (newMarkedData) {
                setMarked(markedState => ({...markedState, ...newMarkedData}));
            }

        }, [route.params?.inputData])
    )

    const toggleSelectedView = (targetView, toggleable) => {
        if (toggleable) {
            if (selectedView === targetView) {
                setSelectedView(VIEWS.Nothing);
                console.log("bruh");
            } else {
                console.log("Selected " + targetView)
                setSelectedView(targetView);
            }
        }
    }

    useEffect(() => {
        if(route.params?.newDate && selectedView !== VIEWS.Flow)
            setSelectedView(VIEWS.Flow)
    }, [route.params?.newDate])

    const renderedArrow = dropdownExpanded ? <Icon name="keyboard-arrow-up" size={24}/> : <Icon name="keyboard-arrow-down" size={24} />
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => setDropdownExpanded(!dropdownExpanded)} style={styles.navbarContainer}>
                <Text style={styles.dropdownText}>{selectedView}</Text>
                <SelectedIcon selectedView={selectedView} style={styles.selectorItem}/>
                {renderedArrow}
            </TouchableOpacity>
            <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} toggleSelectedView={toggleSelectedView}/>
        <View style={styles.calendar}>
            <Calendar 
                navigation={navigation} 
                marked={marked} 
                setYearInView={setYearInView} 
                selectedView={selectedView} 
                currentDate={route.params?.newDate}
            />
        </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    calendar: {
      marginBottom: '20%'
    },
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
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    selectorItem:{
        marginHorizontal: 10
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row"
    },
    dropdownText:{
        fontFamily: "Avenir",
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 27,
        letterSpacing: -0.4848649203777313,
        textAlign: "center",
    },
})
