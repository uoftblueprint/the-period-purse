import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import Constants from 'expo-constants';
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg';
import Arrow from '../../../ios/tppapp/Images.xcassets/icons/arrow.svg';
import Accordion from "../components/Accordion";
import { getDateString, isValidDate } from "../../services/utils/helpers";
import { getCalendarByYear, getSymptomsFromCalendar } from "../../services/utils/helpers";
import { ExerciseActivity, Symptoms } from "../../services/utils/models";
import { GETAllTrackingPreferences } from "../../services/SettingsService";
import { POSTsymptomsForDate } from "../../services/LogSymptomsService";
import { TRACK_SYMPTOMS } from "../../services/utils/constants";
import { STACK_SCREENS } from "../CalendarNavigator";
import { getISODate } from '../../services/utils/helpers';


// Alert popup constants
const unsavedChanges = {
  title: "Unsaved changes",
  message: "Your changes have not been saved. Do you want to discard the changes and continue?",
  cancelTitle: "Cancel",
  acceptTitle: "Yes"
}

const submitError = (error) => {
  return {
    title: "Whoops",
    message: error,
    cancelTitle: "Cancel",
    acceptTitle: "OK"
  }
}

// Arrow component to switch dates
const DateArrow = ({ onPress, isRight }) => {
    const transform = { transform: [{ rotate: "180deg" }] };
    return (
        <TouchableOpacity onPress={onPress} style={[ styles.arrows, isRight && transform]}>
            <Arrow />
        </TouchableOpacity>
    )
}

const symptoms = ['flow', 'mood', 'sleep', 'cramps', 'exercise', 'notes']; // order of symptom accordions


export default function LogSymptomsScreen({ navigation, route }) {
  const [trackingPrefs, setPrefs] = useState(['notes']); // list of symptoms to track, default is always 'notes'

  // Set trackingPrefs when component mounts
  useEffect(() => {
      async function fetchPreferences() {
        let allPrefs = await GETAllTrackingPreferences();
        let prefArr = [...trackingPrefs];
        // set trackingPrefs somewhere
        for (let pref of allPrefs) {
            let toTrack = pref[1].toLowerCase() === 'true';
          // if tracking that symptom is set to true, append it to trackingPrefs
          if (toTrack) {
              let title = pref[0];
              let symptom;
              switch(title) {
                case TRACK_SYMPTOMS.MOOD:
                  symptom = 'mood'
                  break;
                case TRACK_SYMPTOMS.SLEEP:
                  symptom = 'sleep'
                  break;
                case TRACK_SYMPTOMS.CRAMPS:
                  symptom = 'cramps'
                  break;
                case TRACK_SYMPTOMS.EXERCISE:
                  symptom = 'exercise'
                  break;
                default:
                  symptom = 'flow'
                  break;
              }
              if (!prefArr.includes(symptom)) prefArr.push(symptom);
          }
        }
        setPrefs(prefArr);
      }
      fetchPreferences();
  }, [])

  // function to get symptoms from async storage
  const getStoredSymps = async (day, month, year) => {
    const cal = await getCalendarByYear(year);
    let symps = getSymptomsFromCalendar(cal, day, month, year);
    return symps
  }

  let initialDate = new Date(route.params.date.year, route.params.date.month - 1, route.params.date.day, 0, 0, 0);
  const [selectedDate, changeDate] = useState(initialDate);
  const [dateStr, setDateStr] = useState(getDateString(initialDate, 'MM DD, YYYY')) // date in MM DD, YYYY format
  const [stored, setStoredSymps] = useState(new Symptoms()); // original stored symptoms

  // SYMPTOM STATES
  const [flowStr, setFlow] = useState(null);
  const [moodStr, setMood] = useState(null);
  const [sleepMins, setSleep] = useState(null);
  const [crampsStr, setCramps] = useState(null);
  const [exerciseObj, setExercise] = useState(null);
  const [notesStr, setNotes] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [isDirty, setDirty] = useState(false); // if there are changes to submit
  const [fetchingSymps, setSympFetch] = useState(true); // if need to fetch symptoms from storage

  // literally to quick access symptom states in a dynamic way
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

  // Fetch symptom data from async storage.
  // Activated when component first mounts or fetchingSymps = true when switching dates.
  useEffect(() => {
    if (fetchingSymps) {
      async function fetchData() {
        let initSymps = await getStoredSymps(selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear());
        setStoredSymps(initSymps);

        // set symptom states
        setFlow(initSymps.flow);
        setMood(initSymps.mood);
        setSleep(initSymps.sleep);
        setCramps(initSymps.cramps);
        setExercise(initSymps.exercise);
        setNotes(initSymps.notes);

        setSympFetch(false);
      }
      fetchData().catch(e => console.log(e))
    }
  }, [fetchingSymps])

  // Activated when a symptom state changes
  useEffect(() => {
    // Stop changes if currently submitting
    if (submitting) return;

    // update isDirty every time a form state changes
    const newDirty = symptoms.some((symptom) => {
        let newSymp = form[symptom].state;
        if (newSymp && newSymp.constructor.name === 'ExerciseActivity') {
          let original = stored[symptom] ?? new ExerciseActivity();
          return (original.exercise !== newSymp.exercise || original.exercise_minutes !== newSymp.exercise_minutes)
        } else if (typeof newSymp === 'string') {
          let original = stored[symptom] ?? '';
          return original.trim() !== newSymp.trim();
        } else {
          return stored[symptom] !== newSymp;
        }
    })
    setDirty(newDirty);

    // For sleep, exercise, and notes: convert 0 or user-defined-empty states to null
    if (typeof sleepMins === 'number' && sleepMins <= 0) {
      setSleep(null);
    }

    // For exerciseObj, if exercise doesn't exist and mins is 0 or null, then set value to null
    if (exerciseObj && !(exerciseObj.exercise) && exerciseObj.exercise_minutes <= 0) {
      setExercise(null);
    }

    if (typeof notesStr === 'string' && notesStr.length <= 0) {
      setNotes(null);
    }
  }, [flowStr, moodStr, sleepMins, crampsStr, exerciseObj, notesStr]);

  // POST symptoms and close screen when submitting is true
  useEffect(() => {
    if (!submitting) return

    let finalSymps = new Symptoms(flowStr, moodStr, sleepMins, crampsStr, exerciseObj, notesStr);
    // If all symptoms are null, POST null instead of an empty Symptom object
    let notEmpty = Object.values(finalSymps).some((symptom) => symptom !== null);
    let submitSymp = notEmpty ? finalSymps : null;

    POSTsymptomsForDate(selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear(), submitSymp)
      .then(() => {
        let inputData = {}
        inputData[getISODate(selectedDate)] = {
          symptoms: submitSymp
        }
        navigation.navigate(STACK_SCREENS.CALENDAR_PAGE, {inputData: [inputData]})
        // navigation.goBack(isDirty);
      })
      .catch((e) => {
        let errorInfo = submitError(typeof e === 'string' ? e : JSON.stringify(e));
        alertPopup(errorInfo)
          .then(() => { // YES close screen
            navigation.goBack();
          })          
          .catch() // CANCEL do nothing and close alert
        setSubmitting(false);
      })
  }, [submitting])

  // Returns an alert pop up in the form of a promise for user to resolve/reject
  const alertPopup = (info) => new Promise((resolve, reject) => {
    Alert.alert(
      info.title,
      info.message,
      [
        {
          text: info.cancelTitle,
          onPress: () => reject(),
          style: "cancel"
        },
        { text: info.acceptTitle, onPress: () => resolve() }
      ]
    );
  })

  // Helper function to set form state back to default
  const resetForm = async (newDate) => {
    changeDate(newDate);
    setDateStr(getDateString(newDate, 'MM DD, YYYY'));
    setSympFetch(true); // triggers useEffect to fetch symptoms of newDate
    setDirty(false);
    setSubmitting(false);
  }

  // Helper function to determine whether to display arrow to switch dates
  const isNewDayValid = (goFwd, today) => {
    const day = goFwd ? today.getDate() + 1 : today.getDate() - 1;
    const newDate = new Date(today.getFullYear(), today.getMonth(), day, 0, 0, 0)
    return isValidDate(newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear());
  }

  // Change the selected date to log symptoms for
  const switchDate = async (goFwd) => {
    let newDate = selectedDate;
    newDate.setDate(goFwd ? newDate.getDate() + 1 : newDate.getDate() - 1);

    if (isDirty) {
      alertPopup(unsavedChanges)
        .then(async () => { // YES switch date
          await resetForm(newDate);
        })
        .catch() // CANCEL do nothing and close alert
    } else {
      await resetForm(newDate);
    }
  }


  return (
    <SafeAreaView style={styles.screen}><ScrollView>

      {/* HEADER NAV */}
      <View style={styles.navbarContainer}>

          {/* CLOSE BUTTON */}
          <TouchableOpacity
            onPress={() => {
              if (isDirty) {
                alertPopup(unsavedChanges)
                  .then(() => { // YES discard changes
                    navigation.goBack();
                  })
                  .catch() // CANCEL do nothing and close alert
              } else {
                navigation.goBack();
              }
            }}
            style={styles.close}>
              <CloseIcon fill={'#000000'}/>
          </TouchableOpacity>

          {/* SWITCH AND DISPLAY DATE */}
          <View style={styles.switchDate}>
            {isNewDayValid(false, selectedDate) &&
              <DateArrow
                onPress={async () => await switchDate(false)}
                isRight={false}
              />
            }
            <View style={styles.centerText}>
              <Text style={styles.subtitle}>Log your symptoms for:</Text>
              <Text style={styles.navbarTitle}>{dateStr}</Text>
            </View>
            {isNewDayValid(true, selectedDate) &&
              <DateArrow
                onPress={async () => await switchDate(true)}
                isRight={true}
              />
            }
          </View>

      </View>

      {/* SYMPTOM ACCORDIONS */}
      {symptoms.map((symptom, i) => {
        if (trackingPrefs.includes(symptom))
        { return (
            <Accordion
                key={i}
                type={symptom}
                isLastChild={ (i === symptoms.length - 1) ? true : false }
                value={form[symptom].state} // pass in parent state
                setState={form[symptom].setState.bind(form)} // pass in parent setState function
            />
        )}
      })}

      <View style={[styles.centerText, {marginHorizontal: 28}]}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setSubmitting(true) }
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
        paddingTop: Constants.statusBarHeight
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
        paddingRight: 30
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
