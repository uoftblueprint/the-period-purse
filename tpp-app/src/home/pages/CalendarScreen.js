import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { BackButton } from '../components/BackButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const DayComponent = ({ date, state, marking, navigation }) => {

    // useEffect(() => {

    // }, [])

    return(
    <TouchableOpacity onPress={() => navigation.navigate("LogSymptoms", {"date": date})}>
        <View style={styles.dayContainer}>
            <Text>
                {date.day}
            </Text>
        </View>
    </TouchableOpacity>)
}

const Calendar = ({navigation}) => {
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
                //   borderColor: '#D1D3D4',
                //   borderWidth: 1,
                //   borderRadius: 8,
                flex:1,
                // alignItems: 'flex-start',
                //   paddingRight: 20,
                //   paddingBottom: 20,
                //   paddingLeft: 0,
                  margin: 0,
                },
                emptyDayContainer: {
                //   borderColor: '#D1D3D4',
                //   borderWidth: 1,
                //   borderRadius: 8,
                flex:1,
                //   padding:10,
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
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <BackButton 
                    onPress={() => {
                        navigation.navigate('Year')
                    }}
                    title='Year'
                />
            </View>
            <Calendar navigation={navigation}></Calendar>
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
        position: 'relative',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    dayContainer:{
        borderColor: '#D1D3D4',
        borderWidth: 1,
        borderRadius: 8,
        width: 50,
        height: 50,
        // paddingRight: 30,
        // paddingBottom: 30,
        paddingLeft: 5,
        paddingTop:3,
        margin: 2,
    }
})