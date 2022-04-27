import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CalendarList } from 'react-native-calendars';
import { DayComponent } from '../components/DayComponent'
import Selector, {SelectedIcon} from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GETYearData } from '../../services/CalendarService';
import { VIEWS } from '../../services/utils/constants';
import { getISODate } from '../../services/utils/helpers';
import { useFocusEffect } from '@react-navigation/native';
import LegendButton from "../../../ios/tppapp/Images.xcassets/icons/legend_icon.svg";
import { CALENDAR_STACK_SCREENS } from '../CalendarNavigator';
import OnboardingBackground from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'


const sideComponentWidth = 120

export const Calendar = ({navigation, marked, setYearInView, selectedView}) => {

    return (
        <CalendarList
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}

        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={0}

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
            calendarBackground: 'transparent',
            // Sun Mon Tue Wed Thu Fri Sat Bar
            textSectionTitleColor: '#000000',
            todayTextColor: '#000000',
            dayTextColor: '#000000',
            monthTextColor: '#000000',
            textDayFontFamily: 'Avenir',
            textMonthFontFamily: 'Avenir',
            textDayHeaderFontFamily: 'Avenir',
            textDayFontWeight: '500',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '800',
            textDayFontSize: 10,
            textMonthFontSize: 16,
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

    const renderedArrow = dropdownExpanded ? <Icon name="keyboard-arrow-up" size={24}/> : <Icon name="keyboard-arrow-down" size={24}/>
    return (        
    
        <ImageBackground source={OnboardingBackground} style={styles.image}>
            <SafeAreaView style={styles.dropdown}>
                <TouchableOpacity onPress={() => setDropdownExpanded(!dropdownExpanded)} style={styles.navbarContainer}>
                    <Text style={styles.dropdownText}>{selectedView}</Text>
                    <SelectedIcon selectedView={selectedView} style={styles.selectorItem}/>
                    {renderedArrow}
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate(CALENDAR_STACK_SCREENS.LEGEND_PAGE, {screen: CALENDAR_STACK_SCREENS.LEGEND_PAGE})}
                style={styles.legend}>
                <LegendButton></LegendButton>
                </TouchableOpacity>
            </SafeAreaView>
            
            <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} toggleSelectedView={toggleSelectedView}/>

            <SafeAreaView style={styles.container}>
            <View style={styles.calendar}>
                <Calendar navigation={navigation} marked={marked} setYearInView={setYearInView} selectedView={selectedView}/>
            </View>            
            </SafeAreaView>
       </ImageBackground>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: '100%',
      backgroundColor: '#fff',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        overflow: "hidden",
        flex: 1
    },
    legend: {
      position: 'absolute',
      right: 20,
    },
    calendar: {
      marginBottom: '20%',
      zIndex: 3
    },
    container: {
        flex: 1,
        // paddingBottom: '30%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        height: '100%'
    },
    navbarContainer: {
        marginTop: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    selectorItem:{
        marginHorizontal: 10
    },
    horizContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-around',
        flexDirection: "row",
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
