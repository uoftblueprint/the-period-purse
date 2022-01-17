
import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import MoodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import SleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import VectorImage from 'react-native-vector-image';

const Selector = (props) => {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
        {props.expanded &&
        <View style={styles.selectorContainer}>
            <TouchableOpacity onPress={() => props.toggleSelectedView(props.views.Flow)} style={[props.selectedView === props.views.Flow&& styles.selectedIcon, styles.iconContainer]} >
                <FlowIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.toggleSelectedView(props.views.Mood)} style={[props.selectedView === props.views.Mood && styles.selectedIcon, styles.iconContainer]}>
                <MoodIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.toggleSelectedView(props.views.Exercise)} style={[props.selectedView === props.views.Exercise && styles.selectedIcon, styles.iconContainer]}>
                <ExerciseIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.toggleSelectedView(props.views.Cramps)} style={[props.selectedView === props.views.Cramps && styles.selectedIcon, styles.iconContainer]}>
                <CrampsIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.toggleSelectedView(props.views.Sleep)} style={[props.selectedView === props.views.Sleep && styles.selectedIcon, styles.iconContainer]}>
                <SleepIcon style={styles.icon} fill="black"/>
            </TouchableOpacity>

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
