
import React, {createElement} from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import MoodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import SleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import {VIEWS} from '../../services/utils/constants';

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

const Selector = (props) => {
    let flowSelected = props.selectedView === VIEWS.Flow;
    let moodSelected = props.selectedView === VIEWS.Mood;
    let exerciseSelected = props.selectedView === VIEWS.Exercise;
    let crampsSelected = props.selectedView === VIEWS.Cramps;
    let sleepSelected = props.selectedView === VIEWS.Sleep;

    let selectedColor = "#B31F20";
    let unselectedColor = "#6D6E71";

    const iconData = [
        {
            view: VIEWS.Flow,
            selected: flowSelected,
            internalIcon: FlowIcon
        },
        {
            view: VIEWS.Mood,
            selected: moodSelected,
            internalIcon: MoodIcon
        },
        {
            view: VIEWS.Exercise,
            selected: exerciseSelected,
            internalIcon: ExerciseIcon
        },
        {
            view: VIEWS.Cramps,
            selected: crampsSelected,
            internalIcon: CrampsIcon
        },
        {
            view: VIEWS.Sleep,
            selected: sleepSelected,
            internalIcon: SleepIcon
        },
    ]



    return (
        <View style={[{backgroundColor: '#FFFFFF'}, props.expanded && styles.elevatedSelector]}>
            {props.expanded &&
            <View style={[styles.selectorContainer]}>
                 {iconData.map((icon, i) => {
                    let renderedIcon = createElement(icon.internalIcon, {
                        fill: icon.selected ? selectedColor : unselectedColor
                    })
                    return (
                        <TouchableOpacity
                            onPress={() => props.toggleSelectedView(icon.view)}
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
        justifyContent: 'space-around',
        flexDirection: "row",
        marginBottom: 50,
    },
    elevatedSelector: {
        position: "absolute",
        width: "100%",
        zIndex: 3,
        marginTop: 30,
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
