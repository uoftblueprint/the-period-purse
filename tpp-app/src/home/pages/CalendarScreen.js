import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CalendarList } from 'react-native-calendars';
import { DayComponent } from '../components/DayComponent'
import Selector, {SelectedIcon} from '../components/Selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GETYearData } from '../../services/CalendarService';
import { VIEWS } from '../../services/utils/constants';
import { getISODate, getMonthsDiff, initializeEmptyYear } from '../../services/utils/helpers';
import { useFocusEffect } from '@react-navigation/native';
import { GETJoinedDate } from '../../services/OnboardingService';
import ErrorFallback from "../../error/error-boundary";
import { CALENDAR_STACK_SCREENS } from '../CalendarNavigator';
import OnboardingBackground from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import LoadingVisual from '../components/LoadingVisual';
import { GETTutorial } from '../../services/TutorialService';
import LegendButton from "../../../ios/tppapp/Images.xcassets/icons/legend_icon.svg";

export let scrollDate = getISODate(new Date());

export const Calendar = ({ navigation, marked, setYearInView, selectedView, route }) => {
    const jumpDate = route.params?.newDate ? route.params.newDate : getISODate(new Date());
    let joinedDate = ""; 
    GETJoinedDate().then(res => { joinedDate = res })
    const pastScroll = 12 + (getMonthsDiff(joinedDate))
    return (
        <CalendarList
        // Initially visible month. Default = now
        current={jumpDate}

        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={pastScroll}

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
    const [selectedView, setSelectedView] = useState(VIEWS.Flow);
    const [yearInView, setYearInView] = useState([])

    const [cachedYears, setCachedYears] = useState({})
    const [marked, setMarked] = useState({})
    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        async function fetchYearData() {

            let promises = [];
            // Whenever the user scrolls and changes what year is in view
            for(let year of yearInView) {

                // If the data for that year doesn't already exist
                if (cachedYears[year] === undefined) {

                    let currentYearData = {}
                    const yearDataFromStorage = await GETYearData(year);

                    // If there's nothing logged for that year, we may still want to disable dates
                    // Get an empty year
                    currentYearData[year] = yearDataFromStorage ? yearDataFromStorage : initializeEmptyYear(year);

                    let newCachedYears = {}
                    newCachedYears[year] = true
                    promises.push(setCachedYears(cachedState => ({...cachedState, ...newCachedYears})))

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
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                // console.log(141, date, today, date > today);
                                newMarkedData[isoDate] = {
                                    symptoms: symptomData,
                                    disable: date > today
                                }
                            }
                        }
                    }
                    promises.push(setMarked(markedState => ({...markedState, ...newMarkedData})));
                }
            }

            Promise.all(promises).then(
                () => {
                    setLoaded(true);
                }
            )

        }

        fetchYearData()
    }, [yearInView])

    useFocusEffect(
        useCallback(() => {

            // set newly marked calendar dates with changed symptoms
            let newMarkedData = route.params?.inputData
            if (newMarkedData) {
                setMarked(markedState => ({...markedState, ...newMarkedData}));
            }

            // show tutorial overlay if coming from Confirmation screen, else ignore
            GETTutorial()
              .then((val) => {
                // show tutorial overlay if coming from Confirmation screen, else ignore
                if (val === 'true') navigation.navigate(CALENDAR_STACK_SCREENS.TUTORIAL)
              })
              .catch((e) => console.log('showTutorial failed', JSON.stringify(e)))

        }, [route.params?.inputData])
    )

    const toggleSelectedView = (targetView, toggleable) => {
        if (toggleable) {
            if (selectedView === targetView) {
                setSelectedView(VIEWS.Nothing);
            } else {
                console.log("Selected " + targetView)
                setSelectedView(targetView);
            }
        }
    }
    useEffect(() => {
        if(route.params?.newDate && selectedView !== VIEWS.Flow)
            setSelectedView(VIEWS.Flow);
    }, [route.params?.newDate])

    const renderedArrow = dropdownExpanded ? <Icon name="keyboard-arrow-up" size={24}/> : <Icon name="keyboard-arrow-down" size={24} />
    if (loaded){
        return (
        <ErrorFallback>
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
                
                <Selector expanded={dropdownExpanded} views={VIEWS} selectedView={selectedView} setSelectedView={setSelectedView}/>

                <SafeAreaView style={styles.container}>
                    <View style={styles.calendar}>
                        <Calendar 
                        navigation={navigation} 
                        marked={marked} 
                        setYearInView={setYearInView} 
                        selectedView={selectedView} 
                        route={route}
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ErrorFallback>
        )
    }
    else {
        return (<LoadingVisual/>)
    }
}

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: '100%',
      backgroundColor: '#fff',
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
