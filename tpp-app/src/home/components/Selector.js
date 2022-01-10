
import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import flowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import redFlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow_red.svg";
import moodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import redMoodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood_red.svg";
import exerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import redExerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise_red.svg";
import crampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import redCrampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps_red.svg";
import sleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import redSleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep_red.svg";
import VectorImage from 'react-native-vector-image';

const Selector = (props) => {
  let flowSelected = props.selectedView === props.views.Flow
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
        {props.expanded &&
        <View style={styles.selectorContainer}>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Flow)} style={[flowSelected && styles.selectedIcon, styles.iconContainer]} >
                {/* {flowSelected ? (<VectorImage style={[ styles.icon]} source={redFlowIcon}/>): (<VectorImage style={[ styles.icon]} source={flowIcon}/>)} */}
                <VectorImage style={styles.icon} source={flowSelected ? redFlowIcon : flowIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Mood)} style={[props.selectedView === props.views.Mood && styles.selectedIcon, styles.iconContainer]}>
                <VectorImage source={moodIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Exercise)} style={[props.selectedView === props.views.Exercise && styles.selectedIcon, styles.iconContainer]}>
                <VectorImage styles = {styles.icon} source={exerciseIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Cramps)} style={[props.selectedView === props.views.Cramps && styles.selectedIcon, styles.iconContainer]}>
                <VectorImage styles = {styles.icon} source={crampsIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Sleep)} style={[props.selectedView === props.views.Sleep && styles.selectedIcon, styles.iconContainer]}>
                <VectorImage styles = {styles.icon}  source={sleepIcon}/>
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
