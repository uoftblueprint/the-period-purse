
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Image } from "react-native";


export default class SelectPicker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currVal: props.currVal // child value to match parent Accordion value
        };
        this.optionIcons = props.optionIcons;
        this.selectThis = props.selectThis;
    }

    updateChildVal = (newValue) => {
        this.setState({ currVal : newValue })
    }

    Option = (value, icon, key) => {
        return (
            <View style={styles.option} key={key}>
                <TouchableOpacity
                    onPress={() => {
                      let newVal = this.state.currVal === value ? null : value;
                      this.selectThis(newVal);
                      this.updateChildVal(newVal);
                    }}
                    style={[
                      styles.iconButton,
                      this.state.currVal === value ? styles.selected : styles.unselected
                    ]}
                >
                    {icon}
                </TouchableOpacity>
                <Text style={styles.label}>
                    {value[0].toUpperCase() + value.slice(1).toLowerCase()}
                </Text>
            </View>
        )
    }

    render() {
      return (
        <View style={styles.container}>
            {
                this.optionIcons.map((icon, i) => {
                    return this.Option(icon.props.value, icon, i)
                })
            }
        </View>
      )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 327
    },
    option: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 17,
        marginRight: 17,
        marginTop: 10,
        marginBottom: 10
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        borderRadius: 16
    },
    label: {
        paddingTop: 10
    },
    selected: {
        backgroundColor: '#72C6B7'
    },
    unselected: {
        backgroundColor: '#EFEFF4'
    },
});
