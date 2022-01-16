
import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import flowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";
import moodIcon from "../../../ios/tppapp/Images.xcassets/icons/mood.svg";
import exerciseIcon from "../../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import crampsIcon from "../../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import sleepIcon from "../../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import VectorImage from 'react-native-vector-image';

const Selector = (props) => {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
        {props.expanded &&
        <View style={styles.selectorContainer}>
            <TouchableOpacity onPress={() => props.setSelectedView(props.views.Flow)} style={[props.selectedView === props.views.Flow&& styles.selectedIcon, styles.iconContainer]} >
                <VectorImage style={styles.icon} source={flowIcon}/>
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
