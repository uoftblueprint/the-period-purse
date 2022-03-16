import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg';
import Arrow from '../../../ios/tppapp/Images.xcassets/icons/arrow.svg';
import { getDateString } from "../../services/utils/helpers";
import Accordion from "../components/Accordion";
//import { GETAllTrackingPreferences } from '../../services/SettingsService.js';

const DateArrow = ({ onPress, isRight }) => {
    const transform = { transform: [{ rotate: "180deg" }] };
    return (
        <TouchableOpacity onPress={onPress} style={[ styles.arrows, isRight && transform]}>
            <Arrow />
        </TouchableOpacity>
    )
}

let accordionChildren;
const accordionData = [
  {
    title: 'Flow',
    child: 'blahblah'
  },
  {
    title: 'Mood',
    child: 'blahblah'
  },
  {
    title: 'Sleep',
    child: 'blahblah'
  },
  {
    title: 'Cramps',
    child: 'blahblah'
  },
  {
    title: 'Exercise',
    child: 'blahblah'
  },
  {
    title: 'Notes',
    child: 'blahblah'
  },
]


export default function LogSymptomsScreen({ navigation, route }) {

  // this is how you access the params passed from the previous page
  // const date = route.params.date
  // console.log(date)
  // {year: 2022, month: 2, day: 22, timestamp: 1645488000000, dateString: "2022-02-22"}

  const dateStr = getDateString(
    new Date(route.params.date.year, route.params.date.month - 1, route.params.date.day),
    'MM DD, YYYY');
  const [selectedDate, changeDate] = useState(dateStr);

  // GETAllTrackingPreferences returns array of booleans for [flow, mood, sleep, cramps, exercise]

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
      {accordionData.map((acc, i) => {
        return (
          <Accordion
              key={i}
              title={acc.title}
              data={acc.child}
              isLastChild={ (i === accordionData.length - 1) ? true : false }
          />)
      })}

      <Button onPress={() => navigation.goBack()} title="Dismiss" />
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
        justifyContent: 'center',
    },
    switchDate: {
      flexDirection: 'row',
      alignItems: 'center',
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
