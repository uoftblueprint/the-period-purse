
import React, {useEffect, useState, createElement} from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {GETAllTrackingPreferences} from '../../services/SettingsService';
import { TRACK_SYMPTOMS } from "../../services/utils/constants";
import {VIEWS} from "../../services/utils/constants";
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import MoodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import SleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import {useIsFocused} from "@react-navigation/native";

//write function that takes props & renders the corresponding icon
export const SelectedIcon = ({selectedView, style}) => {
    switch(selectedView) {
        case VIEWS.Cramps:
            return (<CrampsIcon style={style}/>)
            break;
        case VIEWS.Exercise:
            return (<ExerciseIcon style={style}/>);
            break;
        case VIEWS.Flow:
            return (<FlowIcon style={style}/>);
            break;
        case VIEWS.Mood:
            return (<MoodIcon style={style} fill="black"/>);
            break;
        case VIEWS.Sleep:
            return (<SleepIcon style={style}/>);
            break;
        case VIEWS.Nothing:
            // need to return something? Maybe just check before calling so we don't get this case
            return (<View/>);
            break;
    }


}

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
  let [numTracked, setNumTracked] = useState(0);
    let flowSelected = props.selectedView === VIEWS.Flow;
    let moodSelected = props.selectedView === VIEWS.Mood;
    let exerciseSelected = props.selectedView === VIEWS.Exercise;
    let crampsSelected = props.selectedView === VIEWS.Cramps;
    let sleepSelected = props.selectedView === VIEWS.Sleep;
    let selectedColor = "#B31F20";
    let unselectedColor = "#6D6E71";
    const isFocused = useIsFocused();

  useEffect(() => {
      if (isFocused) {
          GETAllTrackingPreferences().then(allPrefs => {
              //convert into map so you can directly index in
              let newPrefsMap = Object.assign({}, ...allPrefs.map(pref => ({[pref[0]]: (pref[1] === 'true')})));

              // find only tracked symptom, if there is only one
              let numTracked = 0;
              let onlyTracked;
              for (const prefName in newPrefsMap) {
                  if (newPrefsMap[prefName]) {
                      numTracked += 1;
                      onlyTracked = trackSymptomsToViews[prefName];
                  }
              }

              if (numTracked === 1) {
                  // only one option for selection, so disable toggling & select the only option
                  props.toggleSelectedView(onlyTracked, true)
                  setToggleable(false);

              } else {
                  setToggleable(true);
              }
              setNumTracked(numTracked);
              setPrefsMap(newPrefsMap)
          });
      }
  }, [isFocused])

  

    const iconData = [
        {
            view: VIEWS.Flow,
            selected: flowSelected,
            internalIcon: FlowIcon,
            visible: prefsMap[TRACK_SYMPTOMS.FLOW]
        },
        {
            view: VIEWS.Mood,
            selected: moodSelected,
            internalIcon: MoodIcon,
            visible: prefsMap[TRACK_SYMPTOMS.MOOD]
        },
        {
            view: VIEWS.Exercise,
            selected: exerciseSelected,
            internalIcon: ExerciseIcon,
            visible: prefsMap[TRACK_SYMPTOMS.EXERCISE]
        },
        {
            view: VIEWS.Cramps,
            selected: crampsSelected,
            internalIcon: CrampsIcon,
            visible: prefsMap[TRACK_SYMPTOMS.CRAMPS]
        },
        {
            view: VIEWS.Sleep,
            selected: sleepSelected,
            internalIcon: SleepIcon,
            visible: prefsMap[TRACK_SYMPTOMS.SLEEP]


        },
    ]



    return (
        <View style={[{backgroundColor: '#fff'}, props.expanded && styles.elevatedSelector]}>
            {props.expanded &&
            <View style={[styles.selectorContainer, numTracked === 5 && styles.allSelectedContainer]}>
                 {iconData.map((icon, i) => {
                    let renderedIcon = createElement(icon.internalIcon, {
                        fill: icon.selected ? selectedColor : unselectedColor
                    })
                    return (
                        icon.visible && <TouchableOpacity
                            onPress={() => props.toggleSelectedView(icon.view, toggleable)}
                            key={i}
                            style={[icon.selected && styles.selectedIcon, styles.iconContainer]}
                        >
                            {renderedIcon}
                        </TouchableOpacity>
                    )
                })}
            </View>
            }
        </View>
    )
    }


const styles = StyleSheet.create({
    selectorContainer: {
        flex:1,
        alignSelf:'stretch',
        justifyContent: 'space-evenly',
        flexDirection: "row",
        marginBottom: '14%',
    },
    allSelectedContainer: {
        justifyContent: 'space-evenly'
    },
    elevatedSelector: {
        position: "absolute",
        width: "100%",
        zIndex: 3,
        marginTop: 43,
        height: "7%",
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
