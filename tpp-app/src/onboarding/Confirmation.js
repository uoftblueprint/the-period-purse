import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { CrossButton } from './components/ButtonComponents';
import { BackButtonContainer, HorizontalLine, SymptomIconContainer } from './components/ContainerComponents';
import PaddyIcon from "../../ios/tppapp/Images.xcassets/icons/paddy.svg";
import FlowIcon from "../../ios/tppapp/Images.xcassets/icons/flow.svg";
import SleepIcon from "../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import MoodIcon from "../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../ios/tppapp/Images.xcassets/icons/cramps.svg";

export const STACK_SCREENS = {
  GET_STARTED : "Get Started",
  PERIOD_LENGTH : "Period Length",
  PERIOD_START :  "Period Start",
  SYMPTOMS_CHOICES : "Symptoms Choices",
  BACKUP : "Backup",
  MAIN_PAGE : "Main Page",
  REGISTRATION : "Registration",
  PASSWORD : "Password",
  SUCCESS : "Success",
  CONFIRMATION : "Confirmation"
};

export default function Confirmation ({ route, navigation }) {
  const { periodLength, periodStart, periodEnd, trackingPreferences } = route.params;

  function FlowPref() {
    if(trackingPreferences[0])
      return (<FlowIcon style={styles.icon}/>);
    else
      return (null);
  }
  function MoodPref() {
    if(trackingPreferences[1])
      return (<MoodIcon style={styles.icon}/>);
    else
      return (null);
  }
  function SleepPref() {
    if(trackingPreferences[2])
      return (<SleepIcon style={styles.icon}/>);
    else
      return (null);
  }
  function CrampsPref() {
    if(trackingPreferences[3])
      return (<CrampsIcon style={styles.icon}/>);
    else
      return (null);
  }
  function ExercisePref() {
    if(trackingPreferences[4])
      return (<ExerciseIcon style={styles.icon}/>);
    else
      return (null);
  }

  function DateRange() {
    if(periodStart && periodEnd)
      return (<Text style={styles.text}>{periodStart.toISOString().substring(0, 10)} to {periodEnd.toISOString().substring(0, 10)}</Text>)
    else
      return (null);
  }

  function Length() {
    if(periodLength > 0) 
      return (<Text style={styles.text}>{periodLength} days</Text>);
    else
      return (null);
  }

  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <CrossButton onPress={() => {navigation.navigate(STACK_SCREENS.MAIN_PAGE)}}/>
      </BackButtonContainer>

      <PaddyIcon style={{alignSelf: "center"}}/>
      <Text style={styles.bigText}>You're all set!</Text>

      <View style={styles.row}>
        <Text style={styles.smallText}>Average period length</Text>
        <Length/>
      </View>
      <HorizontalLine></HorizontalLine>

      <View style={styles.row}>
        <Text style={styles.smallText}>Last period</Text>
        <DateRange/>
      </View>
      <HorizontalLine></HorizontalLine>

      <View style={styles.row}>
        <Text style={styles.smallText}>Symptoms to log</Text>
        <SymptomIconContainer>
          <FlowPref/>
          <MoodPref/>
          <SleepPref/>
          <CrampsPref/>
          <ExercisePref/>
        </SymptomIconContainer>
      </View>
      <HorizontalLine></HorizontalLine>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  bigText: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 34,
    fontWeight: "800",
    color: "#000000",
    marginTop: 13,
    marginBottom: 24
  },
  text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    marginTop: 4,
    marginBottom: 15
  },
  smallText: {
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "800",
    color: "#5A9F93",
    marginTop: 20
  },
  row: {
    textAlign: "left",
    marginLeft: 30
  },
  icon: {
    marginRight: 15,
    marginBottom: 15,
    marginTop: 4
  }
});
