
import React, {useEffect, useState} from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {GETAllTrackingPreferences} from '../../services/SettingsService';
import { TRACK_SYMPTOMS } from "../../services/utils/constants";
import {VIEWS} from "../../services/utils/constants";
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import MoodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import SleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";

const trackSymptomsToViews = {
    [TRACK_SYMPTOMS.MOOD] : VIEWS.Mood,
    [TRACK_SYMPTOMS.CRAMPS] : VIEWS.Cramps,
    [TRACK_SYMPTOMS.FLOW] : VIEWS.Flow,
    [TRACK_SYMPTOMS.EXERCISE] : VIEWS.Exercise,
    [TRACK_SYMPTOMS.SLEEP] : VIEWS.Sleep
}

const Selector = (props) => {
  let [prefsMap, setPrefsMap] = useState([]);
  let [toggleable, setToggleable] = useState(true);
  useEffect(() => {
      GETAllTrackingPreferences().then(allPrefs => {
          //convert into map so you can directly index in
          let newPrefsMap = Object.assign({}, ...allPrefs.map(pref => ({ [pref[0]] : (pref[1] === 'true')})));

          // find only tracked symptom, if there is only one
          let numTracked = 0;
          let onlyTracked;
          for (const prefName in newPrefsMap){
              if(newPrefsMap[prefName]){
                  numTracked+=1;
                  onlyTracked = trackSymptomsToViews[prefName];
              }
          }

          if(numTracked === 1){
              // only one option for selection, so disable toggling & select the only option
              props.toggleSelectedView(onlyTracked, true)
              setToggleable(false);

          }
          setPrefsMap(newPrefsMap)
      })
  }, [])

  
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
        {props.expanded &&
        <View style={styles.selectorContainer}>
            {prefsMap[TRACK_SYMPTOMS.FLOW] && <TouchableOpacity 
                onPress={() => props.toggleSelectedView(props.views.Flow, toggleable)} 
                style={[props.selectedView === props.views.Flow&& styles.selectedIcon, styles.iconContainer]} 
                disabled={!toggleable}>
                <FlowIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>}
            {prefsMap[TRACK_SYMPTOMS.MOOD] && <TouchableOpacity 
                onPress={() => props.toggleSelectedView(props.views.Mood, toggleable)} 
                style={[props.selectedView === props.views.Mood && styles.selectedIcon, styles.iconContainer]}
                disabled={!toggleable}>
                <MoodIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>}
            {prefsMap[TRACK_SYMPTOMS.EXERCISE] && <TouchableOpacity 
                onPress={() => props.toggleSelectedView(props.views.Exercise, toggleable)} 
                style={[props.selectedView === props.views.Exercise && styles.selectedIcon, styles.iconContainer]}
                disabled={!toggleable}>
                <ExerciseIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>}
            {prefsMap[TRACK_SYMPTOMS.CRAMPS] && <TouchableOpacity 
                onPress={() => props.toggleSelectedView(props.views.Cramps, toggleable)} 
                style={[props.selectedView === props.views.Cramps && styles.selectedIcon, styles.iconContainer]}
                disabled={!toggleable}>
                <CrampsIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>}
            {prefsMap[TRACK_SYMPTOMS.SLEEP] && <TouchableOpacity 
                onPress={() => props.toggleSelectedView(props.views.Sleep, toggleable)} 
                style={[props.selectedView === props.views.Sleep && styles.selectedIcon, styles.iconContainer]}
                disabled={!toggleable}>
                <SleepIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>}

        </View>
        }
    </View>
  )
}


const styles = StyleSheet.create({
    selectorContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'center',
        flexDirection: "row",
        marginBottom: 50,
    },
    selectedIcon: {
        backgroundColor: '#EFEFF4',
    },
    iconContainer:{
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    icon: {
        transform: [{scale:1.3}]
    }
});

export default Selector;
