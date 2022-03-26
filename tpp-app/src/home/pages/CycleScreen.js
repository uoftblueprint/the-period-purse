
import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useState } from 'react';
import {StyleSheet, Text, ImageBackground, SafeAreaView} from 'react-native';
import CycleCard from '../components/CycleCard';
import background from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png';
import {Card} from 'react-native-elements';

import BloodDrop from '../../../ios/tppapp/Images.xcassets/icons/flow_with_heart.svg';
import Calendar from '../../../ios/tppapp/Images.xcassets/icons/menstruation_calendar.svg';
import FlowIcon from "../../../ios/tppapp/Images.xcassets/icons/flow.svg";

function InfoCard(props){
  return (
    <Card containerStyle={[styles.card, {backgroundColor: props.backgroundColor}]}>
      <Text style={styles.header}>{props.header}</Text>
      <SafeAreaView style={[styles.rowContainer, styles.daysRow]}>
        <Text style={styles.daysText}>{props.days} Days</Text>
        {props.children}
      </SafeAreaView>
    </Card>
  )

}

export default function CycleScreen (){
  return (
    <ImageBackground source={background} style={styles.container}>    
      <SafeAreaView style={styles.rowContainer}>
        <InfoCard header="Average period length" days={7} backgroundColor="#FFDBDB">
          <BloodDrop fill="red"/>
        </InfoCard>
        <InfoCard header="Average cycle length" days={7} backgroundColor="#B9E0D8">
          <Calendar fill="red"/>
        </InfoCard>

      </SafeAreaView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card:{
    borderRadius: 12,
    width: 164,
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
    textAlign: "left"
  },
  daysRow: {
    top:20
  },
  daysText: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 27,
    letterSpacing: -0.30000001192092896,
    textAlign: "left",
  }
})
