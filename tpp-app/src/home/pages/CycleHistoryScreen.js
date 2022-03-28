import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
import {STACK_SCREENS} from '../CalendarNavigator'
import Icon from 'react-native-vector-icons/MaterialIcons';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png';
import {ExpandedHistoryCard} from '../components/CycleHistory';
import CycleService from '../../services/cycle/CycleService';
import {GETStoredYears} from '../../services/utils/helpers';

function Header({navigation}){
    return(
    <View style={ styles.headerContainer}>
        <TouchableOpacity 
            onPress={() =>navigation.navigate(STACK_SCREENS.CYCLE_CALENDAR_TABS, {screen: STACK_SCREENS.CYCLE_CALENDAR_TABS})}
            style={styles.headerComponent}
        >
            <Icon name="keyboard-arrow-left" size={36} color={"#5A9F93"}/>
        </TouchableOpacity>
        <Text style={[styles.headerComponent, styles.headerText]}> Cycle History </Text>
    </View>
    );
}

function YearButton({year, selectedYear, setSelectedYear}){
    console.log()

    let backgroundColor = year == selectedYear ? "#B31F20" : "#FFFFFF";
    let textColor = year == selectedYear ? "#FFFFFF" : "#C4C4C4";
    return (
        <TouchableOpacity 
            onPress={() => setSelectedYear(year)}
            style= {[styles.button, {backgroundColor: backgroundColor}]}
        >
            <Text style={{color: textColor}}>{year}</Text>
        </TouchableOpacity>
    )
}
export default function CycleHistoryScreen({navigation}){
    let [currentIntervals, setCurrentIntervals] = useState([]);
    let [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    let [storedYears, setStoredYears] = useState([]);
    
    useEffect(() => {
        GETStoredYears().then(
            years => {
                setStoredYears(years);
            }
        )
    }, []);

    //update the cycles being rendered to reflect selected year
    useEffect(() => {
        CycleService.GETCycleHistoryByYear(selectedYear).then(
            intervals => {
                setCurrentIntervals(intervals);
            }
        )
    },[selectedYear]);
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.container}>
                <Header navigation={navigation}/>
                <SafeAreaView style={styles.cardContainer}>
                    <View style={styles.buttonContainer}>
                        {storedYears.map(year => <YearButton year={year} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>).reverse()}
                    </View>
                    <ExpandedHistoryCard 
                        navigation={navigation} 
                        intervals={currentIntervals} 
                        renderedYear={selectedYear}
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
        borderColor: "#C4C4C4",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 9
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerComponent: {
        flexGrow:1
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