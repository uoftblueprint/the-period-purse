import React, { useState } from 'react';
import {StyleSheet, Text, ImageBackground, SafeAreaView, View, ScrollView} from 'react-native';
import CycleCard from '../components/CycleCard';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png';
import CycleService from '../../services/cycle/CycleService';
import {MinimizedHistoryCard} from '../components/CycleHistory';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import BloodDrop from '../../../ios/tppapp/Images.xcassets/icons/flow_with_heart.svg';
import Calendar from '../../../ios/tppapp/Images.xcassets/icons/menstruation_calendar.svg';
import Paddy from '../../../ios/tppapp/Images.xcassets/icons/paddy.svg';
import { Footer } from '../../services/utils/footer';
import LoadingVisual from '../components/LoadingVisual';

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
      { props.daysTillPeriod > 0 && <Text style={styles.periodNotifText}> Your period might be coming within the next {props.daysTillPeriod} days.</Text> }
      { props.daysTillPeriod <= 0 && <Text style={styles.periodNotifText}> Your period will likely come any day now!</Text> }
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
    SHOW_TIP: false
  };


  let [avgPeriodLength, setAvgPeriodLength] = useState(DEFAULTS.AVG_PERIOD_LENGTH);
  let [avgCycleLength, setAvgCycleLength] = useState(DEFAULTS.AVG_CYCLE_LENGTH);
  let [periodDays, setPeriodDays] = useState(DEFAULTS.PERIOD_DAYS);
  let [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState(DEFAULTS.DAYS_SINCE_LAST_PERIOD);
  let [cycleDonutPercent, setCycleDonutPercent] = useState(DEFAULTS.CYCLE_DONUT_PERCENT);
  let [daysTillPeriod, setDaysTillPeriod] = useState(DEFAULTS.DAYS_TILL_PERIOD);
  let [intervals, setIntervals] = useState(DEFAULTS.INTERVALS);
  let [showTip, setShowTip] = useState(DEFAULTS.SHOW_TIP);
  let [loaded, setLoaded] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  useFocusEffect(React.useCallback(() => {


     let gettingPeriod = CycleService.GETPeriodDay().then(days => {
       setPeriodDays(days);
       setShowTip(days <= 0);
     })
     .catch(() => {setPeriodDays(DEFAULTS.PERIOD_DAYS)});

     let gettingCycle = CycleService.GETCycleDonutPercent().then(percent => {
       setCycleDonutPercent(percent * 100);
     })
     .catch(() => setCycleDonutPercent(DEFAULTS.CYCLE_DONUT_PERCENT));

     let gettingPeriodEndDays = CycleService.GETDaysSinceLastPeriodEnd().then(days => {
       setDaysSinceLastPeriod(days);
     })
     .catch(setDaysSinceLastPeriod(DEFAULTS.DAYS_SINCE_LAST_PERIOD));

     let gettingAveragePeriodLength = CycleService.GETAveragePeriodLength().then(numDays => {
       if(numDays){
         // Round to one decimal place
        setAvgPeriodLength(Math.round(numDays * 10) / 10);
       }
       else {
         setAvgPeriodLength(DEFAULTS.AVG_PERIOD_LENGTH);
       }
     })
     .catch(() => setAvgPeriodLength(DEFAULTS.AVG_PERIOD_LENGTH));
     
     let gettingAverageCycleLength = CycleService.GETAverageCycleLength().then(numDays => {
       if(numDays){
         // Round to one decimal place
         setAvgCycleLength(Math.round(numDays * 10) / 10);
       }
       else {
         setAvgCycleLength(DEFAULTS.AVG_CYCLE_LENGTH);
       }
     })
     .catch(() => setAvgCycleLength(DEFAULTS.AVG_CYCLE_LENGTH));

     let gettingPredictedDays = CycleService.GETPredictedDaysTillPeriod().then(numDays => {
       let toSet;
       if(numDays && numDays != -1){
         toSet = numDays;
       }
       else{
         toSet = DEFAULTS.DAYS_TILL_PERIOD;
         //if the prediction is invalid, don't show the tooltip
         //will not show tip until average cycle is computed
        //  setShowTip(false);
       }
       setDaysTillPeriod(toSet);
     })
     .catch(() => {
       setDaysTillPeriod(DEFAULTS.DAYS_TILL_PERIOD);
       setShowTip(false);
     });
     
     let gettingCycleHistory = CycleService.GETCycleHistoryByYear(new Date().getFullYear()).then(intervals =>{
       setIntervals(intervals);
     })
     .catch(()=> {
       setIntervals(DEFAULTS.INTERVALS);
     })

     Promise.all(
       gettingPeriod,
       gettingCycle,
       gettingPeriodEndDays,
       gettingAverageCycleLength,
       gettingAveragePeriodLength,
       gettingAverageCycleLength,
       gettingPredictedDays,
       gettingCycleHistory
     ).then(
      () => {
        setLoaded(true);
      }
     )

  }, []));


  const tipInvisibleStyle = {
    marginBottom: tabBarHeight
  }
  const tipVisibleStyle = {
    marginBottom: 50
  }
  const cardContainerStyle = showTip ? Object.assign({}, styles.cardContainer, tipVisibleStyle) : Object.assign({}, styles.cardContainer, tipInvisibleStyle);

  if (loaded) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.container}>    
        {/* View that contains all the relevant cards */}
        <ScrollView>
          {/* Period Notification (Period in X days) */}
          <SafeAreaView style={cardContainerStyle}>
            {showTip && (
            <PeriodNotification daysTillPeriod={daysTillPeriod}>
              <Paddy style={styles.paddyIcon}/>
            </PeriodNotification>
            )}
            <CycleCard 
              periodDays={periodDays} 
              daysSinceLastPeriod={daysSinceLastPeriod} 
              cycleDonutPercent={cycleDonutPercent}
              showTip={showTip}
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
            <View style={{marginBottom: 70}}>
              <Footer navigation={navigation} />
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>);

  } else {
    return <LoadingVisual/>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  cardContainer: {
      flex: 1,
      marginHorizontal: 16,
      alignItems: 'stretch',
      paddingBottom: 50,
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
     marginVertical: "7%"
  }
})
