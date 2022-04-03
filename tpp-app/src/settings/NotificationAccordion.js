import React, { Component, createElement } from 'react';
import {TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default class NotficationAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded : false,
        }
    }

    render () {
        return (
            <TouchableOpacity>

            </TouchableOpacity>
        )
    }
}