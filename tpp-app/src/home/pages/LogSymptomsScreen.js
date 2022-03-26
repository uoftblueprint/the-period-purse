import React, { useState, useEffect, setState, createRef } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg';
import Arrow from '../../../ios/tppapp/Images.xcassets/icons/arrow.svg';
import { getDateString } from "../../services/utils/helpers";
import Accordion from "../components/Accordion";
import { getCalendarByYear, getSymptomsFromCalendar } from "../../services/utils/helpers";
import { ExerciseActivity, Symptoms } from "../../services/utils/models";
import { CRAMP_LEVEL, EXERCISE_TYPE, FLOW_LEVEL, MOOD_LEVEL } from "../../services/utils/constants";
//import { GETAllTrackingPreferences } from '../../services/SettingsService.js';


const DateArrow = ({ onPress, isRight }) => {
    const transform = { transform: [{ rotate: "180deg" }] };
    return (
        <TouchableOpacity onPress={onPress} style={[ styles.arrows, isRight && transform]}>
            <Arrow />
        </TouchableOpacity>
    )
}

const symptoms = ['flow', 'mood', 'sleep', 'cramps', 'exercise', 'notes'];

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

  // TODO
  // const trackingPrefs = GETAllTrackingPreferences returns array of booleans for [flow, mood, sleep, cramps, exercise, notes]
  const trackingPrefs = [true, true, true, true, true, true];
  // const cal = getCalendarByYear(year)
  // const currentSymptoms = await getSymptomsFromCalendar(cal, day, month, year);
  const currentSymptoms = new Symptoms(FLOW_LEVEL.MEDIUM, MOOD_LEVEL.GREAT, 2324, CRAMP_LEVEL.GOOD,
    new ExerciseActivity(EXERCISE_TYPE.YOGA, 230), 'lorem ipsum');


  const [flowStr, setFlow] = useState(currentSymptoms['flow']);
  const [moodStr, setMood] = useState(currentSymptoms['mood']);
  const [sleepMins, setSleep] = useState(currentSymptoms['sleep']);
  const [crampsStr, setCramps] = useState(currentSymptoms['cramps']);
  const [exerciseObj, setExercise] = useState(currentSymptoms['exercise']); // ExerciseActivity object
  const [notesStr, setNotes] = useState(currentSymptoms['notes']);

  // literally to quick access states in a dynamic way
  const form = {
    flow: {
      state: flowStr,
      setState: setFlow
    },
    mood: {
      state: moodStr,
      setState: setMood
    },
    sleep: {
      state: sleepMins,
      setState: setSleep
    },
    cramps: {
      state: crampsStr,
      setState: setCramps
    },
    exercise: {
      state: exerciseObj,
      setState: setExercise
    },
    notes: {
      state: notesStr,
      setState: setNotes
    },
  }

  return (
    <SafeAreaView style={styles.screen}><ScrollView>

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
        if (trackingPrefs[i])
        { return (
            <Accordion
                key={i}
                type={symptom}
                isLastChild={ (i === symptoms.length - 1) ? true : false }
                value={form[symptom].state}
                setState={form[symptom].setState.bind(form)}
            />
        )}
      })}

      <View style={[styles.centerText, {marginLeft: 28, marginRight: 28}]}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            form.flow.setState(FLOW_LEVEL.SPOTTING)

          }}
        >
          <Text style={{color: '#fff'}}>Save</Text>
        </TouchableOpacity>
      </View>

    </ScrollView></SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
    },
    saveButton: {
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5A9F93',
      width: '100%',
      height: 39,
      marginTop: 25
    }
});
