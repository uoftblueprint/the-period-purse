
import React, {Component, useMemo} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";


export default class TimeInput extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currHours: props.currVal,
            currMins: props.currVal,
            hourFocused: false,
            minsFocused: false
        };
        this.optionIcons = props.optionIcons;
        this._ismounted = false;
    }

    componentDidMount() {
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    // MAKE SURE MINS IS < 60
    // mounted = useIsMounted();
    // minsError = useMemo(
    //     () => this._ismounted && (this.state.currMins > 59)
    //         ? 'Minutes must be between 0 and 59.' : '',
    //     [this.state.currMins, mounted]); // add submitting
    // formValid = useMemo(
    //     () => ![emailError, messageError, subjectError, nameError, fileError].reduce((m, n) => m + n),
    //     [emailError, messageError, subjectError, nameError, fileError]);

    updateHours = (hours) => {
        this.setState({ currHours : hours })
    }

    updateMins = (mins) => {
        this.setState({ currMins : mins })
    }

    render() {
      return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, this.state.hourFocused && styles.inputFocused]}
                onChangeText={this.updateHours}
                value={this.state.currHours}
                placeholder="00"
                keyboardType="numeric"
                onFocus={ () => this.setState({ hourFocused: true }) }
                onBlur={ () => this.setState({ hourFocused: false }) }
            />
            <Text style={[styles.text, { marginRight: 12 }]}>hours</Text>
            <TextInput
                style={[styles.input, this.state.minsFocused && styles.inputFocused]}
                onChangeText={this.updateMins}
                value={this.state.currMins}
                placeholder="00"
                keyboardType="numeric"
                onFocus={ () => this.setState({ minsFocused: true }) }
                onBlur={ () => this.setState({ minsFocused: false }) }
            />
            <Text style={styles.text}>mins</Text>
        </View>
      )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#6D6E71',
        marginLeft: 12
    },
    input: {
        height: 40,
        width: 68,
        textAlign: 'center',
        padding: 10,
        color: '#5A9F93',
        backgroundColor: '#fff'
    },
    inputFocused: {
        color: '#6D6E71',
        backgroundColor: '#E3F4F1'
    }
});
