import React, { Component, createElement, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NotficationAccordion extends Component {
    constructor(props) {
        super(props);
        this.type = props.type;
        this.state = { 
            expanded : false,
          };
    }

    render () {
        return (
        <SafeAreaView>
            <TouchableOpacity ref={this.accordion} style={styles.dropDownTextBox} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.dropDownLeftText]}>{this.props.title}</Text>
                <Text style={styles.dropDownRightText}>{this.props.selectedText}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"#5A9F93"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    
                <PickerTab pickerType={this.props.type}/>
                </View>
            }
        </SafeAreaView>
            
        )
    }
    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
      }
  
}


const PickerTab = (props) => {
    let picker;

    switch (props.pickerType) {
        case "time":
            picker = <TimePicker/>
            break;

        case "days":
            picker = <SchedulingPicker/>
            break;
        
        case "howOften":
            picker = <FrequencyPicker/>
            break;
    
        default:
            break;
    }
    
    return (
        picker
    )

}

const FrequencyPicker = () => {
    const [selectedValue, setSelectedValue] = useState();
    const [selectedMeridian, setMeridian] = useState();
    return (
        <View>
        <Picker
         selectedValue={selectedValue}
         onValueChange={(itemValue) =>
         setSelectedValue(itemValue)}>
        <Picker.Item 
    label={"Every day"}
    value={"Every day"} 
    />
    <Picker.Item 
    label={"Every week"}
    value={"Every week"} 
    />
    <Picker.Item 
    label={"Every month"}
    value={"Every month"} 
    />
    <Picker.Item 
    label={"Only during period"}
    value={"Only during period"} 
    />
        </Picker>
    </View>
    );
}

const TimePicker = () => {
    const [selectedValue, setSelectedValue] = useState();
    const [selectedMeridian, setMeridian] = useState();
return(
    <View>
    <Picker  
    selectedValue={selectedValue}
    onValueChange={(itemValue) =>
    setSelectedValue(itemValue)
    }>
     <Picker.Item 
    label={"1"}
    value={"1"} 
    />
    <Picker.Item 
    label={"2"}
    value={"2"} 
    />
    <Picker.Item 
    label={"3"}
    value={"3"} 
    />
    <Picker.Item 
    label={"4"}
    value={"4"} 
    />
    <Picker.Item 
    label={"5"}
    value={"5"} 
    />
    <Picker.Item 
    label={"6"}
    value={"6"} 
    />
    <Picker.Item 
    label={"7"}
    value={"7"} 
    />
    <Picker.Item 
    label={"8"}
    value={"8"} 
    />
    <Picker.Item 
    label={"9"}
    value={"9"} 
    />
    <Picker.Item 
    label={"10"}
    value={"10"} 
    />
    <Picker.Item 
    label={"11"}
    value={"11"} 
    />
    <Picker.Item 
    label={"12"}
    value={"12"} 
    />
    </Picker>
    <Picker  
            selectedValue={selectedMeridian}
            onValueChange={(itemValue) =>
            setMeridian(itemValue)
            }>
            <Picker.Item 
            label={"AM"}
            value={"AM"} 
            />
            <Picker.Item 
            label={"PM"}
            value={"PM"} 
            />
            </Picker>
    </View>
)
}

const SchedulingPicker = () => {
    const [selectedValue, setSelectedValue] = useState();

    return (
        <View>
        <Picker  
        selectedValue={selectedValue}
        onValueChange={(itemValue) =>
        setSelectedValue(itemValue)
        }>
             <Picker.Item 
                label={"1 day"}
                value={"1"} 
                />
                <Picker.Item 
                label={"2 days"}
                value={"2"} 
                />
                <Picker.Item 
                label={"3 days"}
                value={"3"} 
                />
                <Picker.Item 
                label={"4 days"}
                value={"1"} 
                />
                <Picker.Item 
                label={"5 days"}
                value={"5"} 
                />
                <Picker.Item 
                label={"6 days"}
                value={"6"} 
                />
                <Picker.Item 
                label={"7 days"}
                value={"7"} 
                />
        </Picker>
        </View>
    );

}

const styles =  StyleSheet.create({
    dropDownTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingTop: 16,
        paddingRight: 16,
        paddingLeft: 16,
        height: 62,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    dropDownLeftText : {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 16,
        height: 34,
        lineHeight: 34
    },
    dropDownRightText : {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 34,   
        color: "#5A9F93",
        right: -50
    },
    child:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding:16,
    },
    parentHr:{
        height:1,
        color: '#FFFF',
        width:'100%'
    },
})