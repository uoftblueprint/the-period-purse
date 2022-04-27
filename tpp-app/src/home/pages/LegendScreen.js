import React, { useEffect, useState, useCallback } from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png';
import LegendButton from "../../../ios/tppapp/Images.xcassets/icons/legend_icon.svg";
import FlowLegend from "../../../ios/tppapp/Images.xcassets/icons/flow_legend.svg";
import CrampLegend from "../../../ios/tppapp/Images.xcassets/icons/cramp_legend.svg";
import SleepLegend from "../../../ios/tppapp/Images.xcassets/icons/sleep_legend.svg";
import ExerciseLegend from "../../../ios/tppapp/Images.xcassets/icons/exercise_legend.svg";


function Header({navigation}){
    return(
    <View style={ styles.headerContainer}>
        <View
        style={[styles.nonCenterComponent]}
        >
            <TouchableOpacity 
                onPress={() =>navigation.goBack()}
            >
                <Icon name="keyboard-arrow-left" size={36} color={"#5A9F93"}/>
            </TouchableOpacity>
        </View>
        <LegendButton style={styles.legendButton}></LegendButton>
        <Text style={styles.headerText}> Legend </Text>
        <View style={styles.nonCenterComponent}><Text></Text></View>
    </View>
    );
}


export default function LegendScreen({navigation}){
    
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.container}>
                <Header navigation={navigation}/>
                <SafeAreaView style={styles.legendView}>
                    <FlowLegend style={styles.legendTopCard}></FlowLegend>
                    <CrampLegend style={styles.legendCard}></CrampLegend>
                    <SleepLegend style={styles.legendCard}></SleepLegend>
                    <ExerciseLegend style={styles.legendCard}></ExerciseLegend>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    legendView: {
        flex: 1,
        alignItems: 'center'
    },
    legendButton: {
        marginRight: 5
    },
    legendTopCard: {
        marginTop: 35,
    },
    legendCard: {
        marginTop: 15
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "7%"
    },
    nonCenterComponent: {
        flex: 1,
    },
    headerText: { 
        fontFamily: "Avenir",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: 27,
        letterSpacing: -0.4848649203777313,
    }

})