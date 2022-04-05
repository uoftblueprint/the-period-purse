
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, ImageBackground, SafeAreaView, View, ScrollView} from 'react-native';
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
      <View style={styles.infoCardInternal}>
        <Text style={styles.header}>{props.header}</Text>
        <SafeAreaView style={[styles.rowContainer, styles.daysRow, {justifyContent: "space-between"}]}>
          <Text style={styles.daysText}>{props.days} Days</Text>
          <SafeAreaView style={styles.whiteBackground}>
            {props.children}
          </SafeAreaView>
        </SafeAreaView>
      </View>
    </View>
  )
}

function PeriodNotification(props){
  return (
    <View style={[styles.periodNotifCard, styles.element]}>
      <Text style={styles.periodNotifText}> Your period might be coming within the next {props.daysTillPeriod} days.</Text>
        {props.children}
    </View>
  )
}

export default function CycleScreen ({navigation}){
  const DEFAULTS = {
    AVG_PERIOD_LENGTH: 0,
    AVG_CYCLE_LENGTH: 0,
    PERIOD_DAYS : 0,
    DAYS_SINCE_LAST_PERIOD: 0,
    CYCLE_DONUT_PERCENT: 0,
    DAYS_TILL_PERIOD: 0,
    INTERVALS: [],
    SHOW_TIP: true
  };


  let [avgPeriodLength, setAvgPeriodLength] = useState(DEFAULTS.AVG_PERIOD_LENGTH);
  let [avgCycleLength, setAvgCycleLength] = useState(DEFAULTS.AVG_CYCLE_LENGTH);
  let [periodDays, setPeriodDays] = useState(DEFAULTS.PERIOD_DAYS);
  let [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState(DEFAULTS.DAYS_SINCE_LAST_PERIOD);
  let [cycleDonutPercent, setCycleDonutPercent] = useState(DEFAULTS.CYCLE_DONUT_PERCENT);
  let [daysTillPeriod, setDaysTillPeriod] = useState(DEFAULTS.DAYS_TILL_PERIOD);
  let [intervals, setIntervals] = useState(DEFAULTS.INTERVALS);
  let [showTip, setShowTip] = useState(DEFAULTS.SHOW_TIP);

  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
     //TODO: delete this testing stuff
    /* Testing.clearCycleDonut();
     Testing.ClearCalendar();
     Testing.PostDummyCalendarOverYear();
     Testing.PostAverageCycleLength();
     Testing.PostAveragePeriodLength(); */
     Testing.ClearCalendar();
     //DELETE above

     CycleService.GETPeriodDay().then(days => {
       setPeriodDays(days);
     })
     .catch(() => {setPeriodDays(DEFAULTS.PERIOD_DAYS)});

     CycleService.GETCycleDonutPercent().then(percent => {
       setCycleDonutPercent(percent * 100);
     })
     .catch(() => setCycleDonutPercent(DEFAULTS.CYCLE_DONUT_PERCENT));

     CycleService.GETDaysSinceLastPeriodEnd().then(days => {
       setDaysSinceLastPeriod(days);
     })
     .catch(setDaysSinceLastPeriod(DEFAULTS.DAYS_SINCE_LAST_PERIOD));

     CycleService.GETAveragePeriodLength().then(numDays => {
       if(numDays){
        setAvgPeriodLength(numDays);
       }
       else {
         setAvgPeriodLength(DEFAULTS.AVG_PERIOD_LENGTH);
       }
     })
     .catch(() => setAvgPeriodLength(DEFAULTS.AVG_PERIOD_LENGTH));
     
     CycleService.GETAverageCycleLength().then(numDays => {
       if(numDays){
        setAvgCycleLength(numDays);
       }
       else {
         setAvgCycleLength(DEFAULTS.AVG_CYCLE_LENGTH);
       }
     })
     .catch(() => setAvgCycleLength(DEFAULTS.AVG_CYCLE_LENGTH));

     CycleService.GETPredictedDaysTillPeriod().then(numDays => {
       let toSet;
       if(numDays && numDays != -1){
         toSet = numDays;
       }
       else{
         toSet = DEFAULTS.DAYS_TILL_PERIOD;
         //if the prediction is invalid, don't show the tooltip
         setShowTip(false);
       }
       setDaysTillPeriod(toSet);
     })
     .catch(() => {
       console.log("Error: Days till period");
       setDaysTillPeriod(DEFAULTS.DAYS_TILL_PERIOD);
       setShowTip(false);
     });
     
     CycleService.GETCycleHistoryByYear(new Date().getFullYear()).then(intervals =>{
       console.log("getting intervals that are: ");
       console.log(intervals);
       setIntervals(intervals);
     })
     .catch(()=> {
       console.log("Error: Cycle history by year");
       setIntervals(DEFAULTS.INTERVALS);
     })

  }, []);


  const tipInvisibleStyle = {
    marginBottom: tabBarHeight
  }

  const cardContainerStyle = showTip ? styles.cardContainer : Object.assign({}, styles.cardContainer, tipInvisibleStyle);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.container}>    
        {/* View that contains all the relevant cards */}
        <ScrollView contentContainerStyle={cardContainerStyle}>
          {/* Period Notification (Period in X days) */}
          {showTip && (
          <PeriodNotification daysTillPeriod={daysTillPeriod}>
            <Paddy style={styles.paddyIcon}/>
          </PeriodNotification>
          )}
          <CycleCard 
            periodDays={periodDays} 
            daysSinceLastPeriod={daysSinceLastPeriod} 
            cycleDonutPercent={cycleDonutPercent}
          />
          <SafeAreaView style={[styles.rowContainer, styles.infoCardContainer, styles.element]}>
            <InfoCard header="Average period length" days={avgPeriodLength} backgroundColor="#FFDBDB">
              <BloodDrop fill="red" style={styles.icon}/>
            </InfoCard>
            <InfoCard header="Average cycle length" days={avgCycleLength} backgroundColor="#B9E0D8">
              <Calendar fill="red" style={styles.icon}/>
            </InfoCard>
          </SafeAreaView>
          <MinimizedHistoryCard 
            navigation={navigation} 
            intervals={intervals}
            onPeriod={periodDays !=0}
          />

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
      flex: 1,
      marginHorizontal: 16,
      alignItems: 'stretch',
      justifyContent: 'space-evenly',
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
    width: "48%",
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
  },
  periodNotifCard: {
    backgroundColor: "#CFE4E0",
    borderRadius: 12,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
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
  },
  infoCardInternal: {
    marginHorizontal: 10,
  },
  element: {
    marginVertical: "15%"
  }
})
