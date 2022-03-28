
import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, ImageBackground, SafeAreaView, View} from 'react-native';
import CycleCard from '../components/CycleCard';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png';
import CycleService from '../../services/cycle/CycleService';
import Testing from '../../services/cycle/Testing';
import {MinimizedHistoryCard} from '../components/CycleHistory';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import BloodDrop from '../../../ios/tppapp/Images.xcassets/icons/flow_with_heart.svg';
import Calendar from '../../../ios/tppapp/Images.xcassets/icons/menstruation_calendar.svg';
import Paddy from '../../../ios/tppapp/Images.xcassets/icons/paddy.svg';

function InfoCard(props){
  return (
    <View style={[styles.card, {backgroundColor: props.backgroundColor}]}>
      <Text style={styles.header}>{props.header}</Text>
      <SafeAreaView style={[styles.rowContainer, styles.daysRow]}>
        <Text style={styles.daysText}>{props.days} Days</Text>
        <SafeAreaView style={styles.whiteBackground}>
          {props.children}
        </SafeAreaView>
      </SafeAreaView>
    </View>
  )
}

function PeriodNotification(props){
  return (
    <View style={styles.periodNotifCard}>
      <Text style={styles.periodNotifText}> Your period might be coming within the next {props.daysTillPeriod} days.</Text>
        {props.children}
    </View>
  )
}

export default function CycleScreen ({navigation}){

  let [avgPeriodLength, setAvgPeriodLength] = useState(0);
  let [avgCycleLength, setAvgCycleLength] = useState(0);
  let [periodDays, setPeriodDays] = useState(0);
  let [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState(0);
  let [cycleDonutPercent, setCycleDonutPercent] = useState(20);
  let [daysTillPeriod, setDaysTillPeriod] = useState(0);
  let [intervals, setIntervals] = useState([]);
  let [showTip, setShowTip] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
     Testing.ClearCalendar();
    //  Testing.PostDummyCalendarOverYear();
     Testing.PostAverageCycleLength();
     Testing.PostAveragePeriodLength();
     CycleService.POSTCycleDonutPercent(0.5);

     CycleService.GETPeriodDay().then(days => {
       setPeriodDays(days);
     });

     CycleService.GETCycleDonutPercent().then(percent => {
       setCycleDonutPercent(percent * 100);
     });

     CycleService.GETDaysSinceLastPeriodEnd().then(days => {
       setDaysSinceLastPeriod(days);
     });

     CycleService.GETAveragePeriodLength().then(numDays => {
       if(numDays){
        setAvgPeriodLength(numDays);
       }
       else {
         setAvgPeriodLength(-1);
       }
     });
     
     CycleService.GETAverageCycleLength().then(numDays => {
       if(numDays){
        setAvgCycleLength(numDays);
       }
       else {
         setAvgCycleLength(-1);
       }
     });

     CycleService.GETPredictedDaysTillPeriod().then(numDays => {
       if(numDays){
         setDaysTillPeriod(numDays);
       }
       else{
         setDaysTillPeriod(-1);
       }
     });
     
     CycleService.GETCycleHistoryByYear(new Date().getFullYear()).then(intervals =>{
       setIntervals(intervals);
     })

  }, []);

  const tipInvisibleStyle = {
    marginBottom: tabBarHeight
  }

  const cardContainerStyle = showTip ? styles.cardContainer : Object.assign({}, styles.cardContainer, tipInvisibleStyle);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.container}>    
        <SafeAreaView style={cardContainerStyle}>
          {showTip && (<PeriodNotification daysTillPeriod={daysTillPeriod}>
            <Paddy style={styles.paddyIcon}/>
          </PeriodNotification>)}
          <CycleCard periodDays={periodDays} daysSinceLastPeriod={daysSinceLastPeriod} cycleDonutPercent={cycleDonutPercent}/>
            <SafeAreaView style={[styles.rowContainer, styles.infoCardContainer]}>
              <InfoCard header="Average period length" days={avgPeriodLength} backgroundColor="#FFDBDB">
                <BloodDrop fill="red" style={styles.icon}/>
              </InfoCard>
              <InfoCard header="Average cycle length" days={avgCycleLength} backgroundColor="#B9E0D8">
                <Calendar fill="red" style={styles.icon}/>
              </InfoCard>
          </SafeAreaView>
          <MinimizedHistoryCard navigation={navigation} intervals={intervals}/>

        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  cardContainer: {
      flex: 1,
      marginHorizontal: 16,
      justifyContent: 'space-evenly'
  },  
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  infoCardContainer:{
    justifyContent: 'space-between'
  },
  card:{
    borderRadius: 12,
    width: 170,
    height: 101
  },
  header: {
    color: "#6D6E71",
    fontFamily: "Avenir",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 15,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
    top: 10,
    left: 5
  },
  periodNotifCard: {
    backgroundColor: "#CFE4E0",
    borderRadius: 12,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1
  },
  periodNotifText: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
    width: 200,

  },
  daysRow: {
    top:20,
  },
  daysText: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 27,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
  },
  whiteBackground:{
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: 'center',
  },
  icon: {
        transform: [{scale:0.7}]
  },
  paddyIcon: {
    transform: [{scale:0.4}]
  }
})
