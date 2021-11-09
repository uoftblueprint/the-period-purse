import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';


export default () => {
    return (<CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
        
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
    />)
}