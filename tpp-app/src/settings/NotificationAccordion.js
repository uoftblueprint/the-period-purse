import React, { Component, createElement, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { POSTRemindLogPeriodFreq, POSTRemindLogSymptomsFreq } from '../services/SettingsService';

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
        <SafeAreaView style={styles.container}>
            <TouchableOpacity ref={this.accordion} style={styles.dropDownTextBox} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.dropDownLeftText]}>{this.props.title}</Text>
                <Text style={styles.dropDownRightText}>{this.props.selectedText}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"#5A9F93"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    
                <PickerTab pickerType={this.props.type} selectedText={this.props.selectedText}/>
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
        case "periodTime":
            picker = <PeriodTimePicker setValue={props.selectedText}/>
            break;
        case "symptomTime":
            picker = <SymptomTimePicker setValue={props.selectedText} />
            break;
        case "days":
            picker = <SchedulingPicker setValue={props.selectedText}/>
            break;
        case "howOften":
            picker = <FrequencyPicker setValue={props.selectedText}/>
            break;
        default:
            break;
    }
    
    return (
        picker
    )

}

const FrequencyPicker = (props) => {
    const [selectedValue, setSelectedValue] = useState(props.setValue);
    return (
        <View>
        <Picker
         selectedValue={selectedValue}
         onValueChange={(itemValue) =>
         {setSelectedValue(itemValue),
         POSTRemindLogSymptomsFreq(selectedValue)}}>
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

const SymptomTimePicker = (props) => {
    var storedTime = "10:00"
    var storedMeridian = "AM"
    if (typeof props.setValue == 'string'){
        const values = props.setValue.split("")
        storedTime = values[0]
        storedMeridian = values[1]
    }

    const [selectedValue, setSelectedValue] = useState(storedTime);
    const [selectedMeridian, setMeridian] = useState(storedMeridian);
return(
    <View>
    <Picker  
    selectedValue={selectedValue}
    onValueChange={(itemValue) =>
    setSelectedValue(itemValue)
    }>
     <Picker.Item 
    label={"1:00"}
    value={"1:00"} 
    />
    <Picker.Item 
    label={"2:00"}
    value={"2:00"} 
    />
    <Picker.Item 
    label={"3:00"}
    value={"3:00"} 
    />
    <Picker.Item 
    label={"4:00"}
    value={"4:00"} 
    />
    <Picker.Item 
    label={"5:00"}
    value={"5:00"} 
    />
    <Picker.Item 
    label={"6:00"}
    value={"6:00"} 
    />
    <Picker.Item 
    label={"7:00"}
    value={"7:00"} 
    />
    <Picker.Item 
    label={"8:00"}
    value={"8:00"} 
    />
    <Picker.Item 
    label={"9:00"}
    value={"9:00"} 
    />
    <Picker.Item 
    label={"10:00"}
    value={"10:00"} 
    />
    <Picker.Item 
    label={"11:00"}
    value={"11:00"} 
    />
    <Picker.Item 
    label={"12:00"}
    value={"12:00"} 
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
const PeriodTimePicker = (props) => {
    var storedTime = "10:00"
    var storedMeridian = "AM"
    if (typeof props.setValue == 'string'){
        const values = props.setValue.split("")
        storedTime = values[0]
        storedMeridian = values[1]
    }

    const [selectedValue, setSelectedValue] = useState(storedTime);
    const [selectedMeridian, setMeridian] = useState(storedMeridian);
return(
    <View>
    <Picker  
    selectedValue={selectedValue}
    onValueChange={(itemValue) =>
    setSelectedValue(itemValue)
    }>
     <Picker.Item 
    label={"1:00"}
    value={"1:00"} 
    />
    <Picker.Item 
    label={"2:00"}
    value={"2:00"} 
    />
    <Picker.Item 
    label={"3:00"}
    value={"3:00"} 
    />
    <Picker.Item 
    label={"4:00"}
    value={"4:00"} 
    />
    <Picker.Item 
    label={"5:00"}
    value={"5:00"} 
    />
    <Picker.Item 
    label={"6:00"}
    value={"6:00"} 
    />
    <Picker.Item 
    label={"7:00"}
    value={"7:00"} 
    />
    <Picker.Item 
    label={"8:00"}
    value={"8:00"} 
    />
    <Picker.Item 
    label={"9:00"}
    value={"9:00"} 
    />
    <Picker.Item 
    label={"10:00"}
    value={"10:00"} 
    />
    <Picker.Item 
    label={"11:00"}
    value={"11:00"} 
    />
    <Picker.Item 
    label={"12:00"}
    value={"12:00"} 
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
const SchedulingPicker = (props) => {
    const [selectedValue, setSelectedValue] = useState(props.setValue);

    return (
        <View>
        <Picker  
        selectedValue={selectedValue}
        onValueChange={(itemValue) =>
        {setSelectedValue(itemValue)
        POSTRemindLogPeriodFreq(selectedValue)
        }
        }>
             <Picker.Item 
                label={"1 days"}
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
    container: {
       padding: -48,
       
    },

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