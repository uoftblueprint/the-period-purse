import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker'


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

const DropDown = () => {

    const [open, setOpen] = useState(false);
    // Set the dropdown to period by default
    const [value, setValue] = useState('period');
    // Drop down picker items with corresponding values
    const [items, setItems] = useState([
        {label: 'Period', value: 'period'},
        {label: 'Mood', value: 'mood'},
        {label: 'Sleep', value: 'sleep'},
        {label: 'Cramps', value: 'cramps'},
        {label: 'Exercise', value: 'exercise'}
      ]);

    return (
        <DropDownPicker
            containerStyle={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            showArrowIcon={false}
            showTickIcon={false}
            />      
        )
}

export default () => {
    return (
        <View>
            <DropDown></DropDown>
            <Calendar></Calendar>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        marginTop: 100,
    }
});
