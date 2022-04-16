import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg'
import { CalendarList } from 'react-native-calendars';
import { STACK_SCREENS } from '../CalendarNavigator';
import {getCalendarByYear, getISODate, GETStoredYears, getSymptomsFromCalendar} from '../../services/utils/helpers';
import { LogMultipleDayPeriod } from '../../services/LogSymptomsService';
import SubmitIcon from '../../../ios/tppapp/Images.xcassets/icons/checkmark';
import {GETYearData} from "../../services/CalendarService";
import {FLOW_LEVEL} from "../../services/utils/constants";

const DayComponent = ({props}) => {
    const {onPress, date, marking} = props;

    return(
        // onpress should select the dates for multi select
        <TouchableOpacity onPress={() => onPress(date)}>
            <View style={{
                ...styles.dayContainer,
                backgroundColor: marking && marking['customStyles'].backgroundColor,
            }}>
                <Text>
                    {date.day}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const Calendar = ({ navigation, setSelectedDates, markedDates}) => {
    
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
        onDayPress={setSelectedDates}
        markingType={'custom'}
        dayComponent={props => <DayComponent props={props}/>}
        markedDates={markedDates}

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
    // const [selectedDates, setSelectedDates] = useState([]);
    const [numSelected, setNumSelected] = useState(0);
    const [markedDates, setMarkedDates] = useState({});
    const DESELECTED_COLOR = '#FFFFFF';
    const SELECTED_COLOR = '#72C6B7';

    useEffect( () => {
        async function populateMarkedDates() {
            GETStoredYears()
                .then((years) => {
                    let promises = []
                    years.forEach((year) => {
                        promises.push(GETYearData(year));
                    });

                    Promise.all(promises)
                        .then((history) => {
                            let allMarkedDates = {}
                            history.forEach((year, yearIndex) => {
                                year.forEach((month, monthIndex) => {
                                    month.forEach((day, dayIndex) => {
                                        if (day.flow !== null && day.flow !== FLOW_LEVEL.NONE) {
                                            let monthString = monthIndex + 1 < 10 ? '0' + (monthIndex + 1) : (monthIndex + 1);
                                            let dayString = dayIndex + 1 < 10 ? '0' + (dayIndex + 1) : (dayIndex + 1);
                                            let stringDate = years[yearIndex] + '-' + monthString + '-' + dayString;
                                            allMarkedDates[stringDate] = {
                                                marked: false,
                                                customStyles: {
                                                    backgroundColor: '#72C6b7',
                                                },
                                            };
                                        }
                                    })
                                });
                            });
                            setMarkedDates(allMarkedDates);
                        })
                        .catch((error) => {
                            console.log(`GETCycleHistoryByYear error: ${JSON.stringify(error)}`);
                        });
                })
                .catch((error) => {
                    console.log(`GETStoredYears error: ${JSON.stringify(error)}`);
                });
        }

        populateMarkedDates();
    }, []);

    const unsavedChanges = {
        title: "Unsaved changes",
        message: "Your changes have not been saved. Do you want to discard the changes and continue?",
        cancelTitle: "Cancel",
        acceptTitle: "Yes"
      }

    const setSelectedDates = date => {
        if (markedDates[date.dateString]) {
          const isMarked = !markedDates[date.dateString].marked;
          setMarkedDates({
            ...markedDates,
            [date.dateString]: {
              marked: isMarked,
              customStyles: {
                backgroundColor: isMarked ? SELECTED_COLOR : DESELECTED_COLOR,
              },
            },
          });
    
          isMarked
            ? setNumSelected(numSelected + 1)
            : setNumSelected(numSelected - 1);
        } else {
          setMarkedDates({
            ...markedDates,
            [date.dateString]: {
              marked: true,
              customStyles: {
                backgroundColor: SELECTED_COLOR,
              },
            },
          });
    
          setNumSelected(numSelected + 1);
        }
    };
        

    const onSubmit = async() => {
        const selectedDates = [];

        Object.keys(markedDates).map(date => {
            if(markedDates[date].marked){
                const processed = date.split("-");
                const data = {year: processed[0], month: processed[1], day: processed[2]};
                
                selectedDates.push(data);
            }
        })

        let inputData = {}

        if(selectedDates.length > 0){
            try {
                await LogMultipleDayPeriod(selectedDates);
                for (let date of selectedDates) {
                    let cal = await getCalendarByYear(date.year);
                    let submitSymp = getSymptomsFromCalendar(cal, date.day, date.month, date.year);
                    let dateObject = new Date(date.year, date.month - 1, date.day)
                    inputData[getISODate(dateObject)] = {
                      symptoms: submitSymp
                    }
            
                }
            } catch (error) {
                console.log(error);
            }
        }



        navigation.navigate(STACK_SCREENS.CALENDAR_PAGE, {inputData: inputData});
    }

    const alertPopup = (info) =>  {
        Alert.alert(
          info.title,
          info.message,
          [
            {
              text: info.cancelTitle,
              style: "cancel"
            },
            { text: info.acceptTitle, onPress: () => navigation.navigate(STACK_SCREENS.CALENDAR_PAGE) }
          ]
        );
      }

    const onClose = () => {
        if(Object.keys(markedDates).some(key => markedDates[key].marked)){

            alertPopup(unsavedChanges);
          
        }else{
            navigation.navigate(STACK_SCREENS.CALENDAR_PAGE);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>

                <TouchableOpacity onPress={() => onClose()} style={styles.close}>
                  <CloseIcon fill={'#181818'}/>
                </TouchableOpacity>
                <View style={styles.navbarTextContainer}>
                    
                    <Text style={styles.navbarTitle}>Tap date to log period</Text>
                    <Text style={styles.navbarSubTitle}>
                        {numSelected !== 1
                        ? `${numSelected} days selected`
                        : `${numSelected} day selected`}
                    </Text>

                </View>
            </View>
            
            <Calendar 
                numSelected={numSelected}
                setNumSelected={setNumSelected}
                navigation={navigation}
                setSelectedDates={setSelectedDates}
                markedDates={markedDates}
            />
            {/* {Cal} */}
            <TouchableOpacity onPress={async() => {await onSubmit()}} style={styles.submitButton}>
                <SubmitIcon fill={'#181818'}/>
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
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbarTextContainer:{
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbarTitle: {
        color: '#181818',
        fontWeight: "600",
        fontSize: 20,
    },
    navbarSubTitle: {
        color: '#181818',
        fontWeight: "400",
        fontSize: 13,
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
        backgroundColor: '#5A9F93', 
    },
    selectedIcon: {
        position: 'relative',
        top: -4,
        height: 20,
        left: -2,
        marginLeft: 'auto',
        marginRight: 'auto'
        
    },

})
