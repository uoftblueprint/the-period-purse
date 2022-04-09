import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png';
import {ExpandedHistoryCard} from '../components/CycleHistory';
import CycleService from '../../services/cycle/CycleService';
import {GETStoredYears} from '../../services/utils/helpers';
import {useFocusEffect} from '@react-navigation/native';
import { set } from 'date-fns';

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
        <Text style={styles.headerText}> Period History </Text>
        <View style={styles.nonCenterComponent}><Text></Text></View>
    </View>
    );
}

function YearButton({year, selectedYear, setSelectedYear}){

    let backgroundColor = year === selectedYear ? "#B31F20" : "#FFFFFF";
    let textColor = year === selectedYear ? "#FFFFFF" : "#C4C4C4";
    let border = year === selectedYear ? null : styles.buttonBorder;
    return (
        <TouchableOpacity 
            onPress={() => setSelectedYear(year)}
            style= {[styles.button, border, {backgroundColor: backgroundColor}]}
        >
            <Text style={{color: textColor}}>{year}</Text>
        </TouchableOpacity>
    )
}

export default function CycleHistoryScreen({navigation}){
    let currentYear = new Date().getFullYear();
    let intervalsDefault = {};
    intervalsDefault[currentYear] = []
    const DEFAULTS = {
        INTERVALS: intervalsDefault,
        STORED_YEARS: [],
        ON_PERIOD: false
    }

    let [currentIntervals, setCurrentIntervals] = useState(DEFAULTS.INTERVALS);
    let [selectedYear, setSelectedYear] = useState(currentYear);
    let [storedYears, setStoredYears] = useState(DEFAULTS.STORED_YEARS);
    let [onPeriod, setOnPeriod] = useState(DEFAULTS.ON_PERIOD);
    
    useFocusEffect(
        React.useCallback(() => {
        GETStoredYears().then(
            years => {
                setStoredYears(years);
            }
        )
        .catch(() => setStoredYears(DEFAULTS.STORED_YEARS)) 
        CycleService.GETPeriodDay().then(days => {
            setOnPeriod(days !== 0 );
        })
        .catch(() => setOnPeriod(DEFAULTS.ON_PERIOD))
    }, []));

    //get intervals for all stored years
    useFocusEffect(
        React.useCallback(
        () => {
        async function storeYearsCycles() {
            for (const year of storedYears){
                intervals = await CycleService.GETCycleHistoryByYear(year)            
                currentIntervals[year] = intervals;
            }
            setCurrentIntervals({...currentIntervals});
            console.log(currentIntervals);
        }
        storeYearsCycles();
    }, [storedYears]));

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.container}>
                <Header navigation={navigation}/>
                <SafeAreaView style={styles.cardContainer}>
                    <View style={styles.buttonContainer}>
                        {storedYears.map((year, index) => <YearButton year={year} selectedYear={selectedYear} setSelectedYear={setSelectedYear} key={index}/>).reverse()}
                    </View>
                    <ExpandedHistoryCard 
                        navigation={navigation} 
                        intervals={currentIntervals[selectedYear]} 
                        renderedYear={selectedYear}
                        onPeriod={onPeriod}
                    />
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
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 17,
        marginTop: 18
    },
    cardContainer: {
        marginHorizontal: 16
    },  
    button: {
        borderRadius: 10,
        width: 62,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 9,
        borderWidth: 0
    },
    buttonBorder: {
        borderColor: "#C4C4C4",
        borderWidth: 1,
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