import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import addDays from 'date-fns/addDays';

function Interval({interval, index}){
    console.log("Interval component from " + JSON.stringify(interval))  ;
    let startDate = interval.start;
    const formattedStart = startDate.toLocaleString('default', { month: 'short', day: 'numeric' });
    console.log("start date is " + formattedStart);
    let days = interval.periodDays;
    let endDate = addDays(startDate, days);
    let formattedEnd = endDate.toLocaleString('default', { month: 'short', day: 'numeric' });

    let header = (<View>
        <Text style={styles.intervalHeader}>{formattedStart} - {formattedEnd}</Text>
        <Text style={styles.periodText}>{days}-day period</Text>
    </View>)

    console.log("number of period days is " + days);
    let daysArray = Array.from(Array(days).keys());
    console.log(daysArray);
    
    return (
        <View style={{marginBottom: 19}}>
            {index == 0 ? <Text style={[styles.intervalHeader, styles.initialHeader]}>Current cycle: Started {formattedStart}</Text> : header}
            <View style={{flexDirection: "row"}}>
                {daysArray.map(day => (
                    <View style={styles.redDot}/>
                ))}
            </View>
        </View >
    )
}
function MinimizedHistoryCard({intervals}){
    console.log("from minimized history card");
    console.log(intervals);
    return (
        <View style={styles.card}>            
            <SafeAreaView style={[styles.rowContainer, styles.bottomBorder]}>
                <Text style={styles.title}>Cycle History</Text>
                <Text>Button Placeholder</Text>
            </SafeAreaView>
            {intervals.map((interval, index)=> {
                if(index < 3){
                    return  <Interval interval={interval} key={index} index={index}/>
                }
            })}
        </View>

    );
}
export {MinimizedHistoryCard};
export default function CycleHistoryCard(header, isExpanded){

}


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
        marginHorizontal: 28
    },
    card: {
        borderRadius: 12,
        backgroundColor: 'white',
        marginHorizontal: 16
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
    }
})