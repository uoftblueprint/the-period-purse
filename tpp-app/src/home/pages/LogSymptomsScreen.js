import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg';
import Arrow from '../../../ios/tppapp/Images.xcassets/icons/arrow.svg';
import { getDateString } from "../../services/utils/helpers";
import Accordion from "../components/Accordion";
import { getCalendarByYear, getSymptomsFromCalendar } from "../../services/utils/helpers";
//import { GETAllTrackingPreferences } from '../../services/SettingsService.js';


const DateArrow = ({ onPress, isRight }) => {
    const transform = { transform: [{ rotate: "180deg" }] };
    return (
        <TouchableOpacity onPress={onPress} style={[ styles.arrows, isRight && transform]}>
            <Arrow />
        </TouchableOpacity>
    )
}


export default function LogSymptomsScreen({ navigation, route }) {

  // this is how you access the params passed from the previous page
  // const date = route.params.date
  // console.log(date)
  // {year: 2022, month: 2, day: 22 }
  // TODO: MAKE SURE TO CONSOLE LOG THE DATE AND check that you're passing in the right indexed month for functions

  const year = route.params.date.year;
  const month = route.params.date.month;
  const day = route.params.date.day;

  const dateStr = getDateString(new Date(year, month - 1, day), 'MM DD, YYYY');
  const [selectedDate, changeDate] = useState(dateStr);

  const symptoms = ['flow', 'mood', 'sleep', 'cramps', 'exercise', 'notes'];
  // TODO
  // const trackingPrefs = GETAllTrackingPreferences returns array of booleans for [flow, mood, sleep, cramps, exercise, notes]
  // const cal = getCalendarByYear(year)
  // const currentSymptoms = await getSymptomsFromCalendar(cal, day, month, year);


  return (
    <View style={styles.screen}>

      {/* HEADER NAV */}
      <View style={styles.navbarContainer}>

          {/* CLOSE BUTTON */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
            <CloseIcon fill={'#000000'}/>
          </TouchableOpacity>

          {/* SWITCH AND DISPLAY DATE */}
          <View style={styles.switchDate}>
            <DateArrow onPress isRight={false} />
            <View style={styles.centerText}>
              <Text style={styles.subtitle}>Log your symptoms for:</Text>
              <Text style={styles.navbarTitle}>{selectedDate}</Text>
            </View>
            <DateArrow onPress isRight={true} />
          </View>

      </View>

      {/* SYMPTOM ACCORDIONS */}
      {symptoms.map((symptom, i) => {
        // TODO: if trackingPrefs[i]

        return (
          <Accordion
              key={i}
              type={symptom}
              isLastChild={ (i === symptoms.length - 1) ? true : false }
              initialValue={null} // TODO: change to currentSymptoms[acc.title]
          />)
      })}

    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    navbarContainer: {
        paddingTop: 98,
        paddingBottom: 30,
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#EFEFF4',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    switchDate: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    navbarTitle: {
        color: '#000000',
        fontWeight: "600",
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 30,
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
    centerText: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: '#6D6E71'
    }
});
