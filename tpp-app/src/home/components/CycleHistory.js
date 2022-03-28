import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import addDays from 'date-fns/addDays';
import { STACK_SCREENS } from '../CalendarNavigator';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShowMore = ({navigation}) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate(STACK_SCREENS.CYCLE_HISTORY, {screen: STACK_SCREENS.CYCLE_HISTORY})}>
            <View style={styles.showMoreButton}>
                <Text style={styles.showMoreText}>
                    Show More
                </Text>
                <Icon name="keyboard-arrow-right" size={24} color={"#2F7A6D"}/>
            </View>
        </TouchableOpacity>
    );

}

function Interval({interval, isMostRecent}){
    let startDate = interval.start;
    const formattedStart = startDate.toLocaleString('default', { month: 'short', day: 'numeric' });
    let days = interval.periodDays;
    let endDate = addDays(startDate, days);
    let formattedEnd = endDate.toLocaleString('default', { month: 'short', day: 'numeric' });

    let header = (<View>
        <Text style={styles.intervalHeader}>{formattedStart} - {formattedEnd}</Text>
        <Text style={styles.periodText}>{days}-day period</Text>
    </View>)

    let daysArray = Array.from(Array(days).keys());
    
    return (
        <View style={styles.interval}>
            {isMostRecent ? <Text style={[styles.intervalHeader, styles.initialHeader]}>Current cycle: Started {formattedStart}</Text> : header}
            <View style={{flexDirection: "row"}}>
                {daysArray.map((day, index) => (
                    <View style={styles.redDot} key={index}/>
                ))}
            </View>
        </View >
    )
}
function MinimizedHistoryCard({navigation, intervals}){
    return (
        <View style={styles.card}>            
            <View style={styles.historyContainer}>
                <SafeAreaView style={[styles.rowContainer, styles.bottomBorder]}>
                    <Text style={styles.title}>Cycle History</Text>
                    <ShowMore navigation={navigation}/>
                </SafeAreaView>
                {intervals.map((interval, index)=> {
                    if(index < 3){
                        return  <Interval interval={interval} key={index} index={index} isMostRecent={index == 0}/>
                    }
                })}

            </View>
        </View>
    );
}

function ExpandedHistoryCard({intervals, renderedYear}){
    let currentYear = new Date().getFullYear();
    return(
        <View style={styles.card}>
            <View style={styles.historyContainer}>
                <View>
                    <Text style={ styles.title}> {renderedYear} </Text>
                </View>
                {intervals.map((interval, index) => {
                    return  <Interval interval={interval} key={index} index={index} isMostRecent={index == 0 & renderedYear== currentYear}/>
                })}
            </View>
        </View>
    )
}
export {MinimizedHistoryCard, ExpandedHistoryCard};


const styles = StyleSheet.create({
    redDot: {
        backgroundColor: "#B31F20",
        borderRadius: 50,
        width: 10,
        height: 10,
        marginHorizontal: 1
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: "center"
    },
    intervalHeader: {
        fontFamily: "Avenir",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 19,
        letterSpacing: -0.30000001192092896,
        textAlign: "left",
    },
    initialHeader: {
        marginBottom: 7
    },
    periodText: {
        fontFamily: "Avenir",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "300",
        lineHeight: 16,
        letterSpacing: -0.30000001192092896,
        textAlign: "left",
    },
    bottomBorder: {
        borderBottomColor: "#C4C4C4",
        borderBottomWidth: 1
    },
    title: {
        fontFamily: "Avenir",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: 22,
        letterSpacing: -0.30000001192092896,
        textAlign: "left",
        color: "#6D6E71"
    },
    showMoreText: {
        fontFamily: "Avenir",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: 19,
        letterSpacing: -0.4848649203777313,
        textAlign: "center",
        color: "#2F7A6D"
    },
    showMoreButton: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyContainer: {
        marginHorizontal: 28,
        marginTop: 19
    },
    interval: {
        marginBottom: 19,
    }
})