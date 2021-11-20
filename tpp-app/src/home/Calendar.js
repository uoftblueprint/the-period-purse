import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Calendar = () => {
    
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
            textDayHeaderFontSize: 10
        }}
        />
    )
}

const YearButton = () => {
    return (
        <View style={styles.yearButtonContainer}>
            <Button
                icon={
                    backIcon
                }
                titleStyle={styles.yearButtonText}
                title='Year'
                type="clear"
            />
        </View>
    )
}

const backIcon = () => {
    return (
        <Icon
        name="arrow-back-ios"
        size={24}
        color="#5A9F93"
    />
    )
}

export default function CalendarView ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <YearButton></YearButton>
            </View>
            <Calendar></Calendar>
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
    yearButtonContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        width: 120,
        height: 54,
        bottom: 10
    },
    yearButtonText: {
        fontStyle: 'normal',
        fontWeight: "600",
        color: '#000',
        alignItems: 'center',
        lineHeight: 20,
    }
});
