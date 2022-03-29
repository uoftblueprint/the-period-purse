import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SymptomsChoicesButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import { PostSymptomsToTrack } from '../services/OnboardingService';
import FlowIcon from "../../ios/tppapp/Images.xcassets/icons/flow.svg";
import MoodIcon from "../../ios/tppapp/Images.xcassets/icons/mood.svg";
import ExerciseIcon from "../../ios/tppapp/Images.xcassets/icons/exercise.svg";
import CrampsIcon from "../../ios/tppapp/Images.xcassets/icons/cramps.svg";
import SleepIcon from "../../ios/tppapp/Images.xcassets/icons/sleep.svg";
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import CalendarIcon from "../../ios/tppapp/Images.xcassets/icons/symptoms_track_img.svg";
import BarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_bar3.svg";

let WHITE = "#FFFFFF"  // button is not selected
let TEAL = "#73C7B7"  // button is selected
export default function SymptomsChoices ({ route, navigation }) {
  const { periodLength, periodStart, periodEnd } = route.params;

  // checks for button selection are based on the background color 
  const [flow, setFlow] = useState(WHITE);
  const [sleep, setSleep] = useState(WHITE);
  const [mood, setMood] = useState(WHITE);
  const [cramp, setCramp] = useState(WHITE);
  const [exercise, setExercise] = useState(WHITE);

  const handleFlow = () => { 
    flow == WHITE ? setFlow(TEAL) : setFlow(WHITE);
  }
  const handleSleep = () => { 
    sleep == WHITE ? setSleep(TEAL) : setSleep(WHITE);
  }
  const handleMood = () => { 
    mood == WHITE ? setMood(TEAL) : setMood(WHITE);
  }
  const handleCramp = () => { 
    cramp == WHITE ? setCramp(TEAL) : setCramp(WHITE);
  }
  const handleExercise = () => { 
    exercise == WHITE ? setExercise(TEAL) : setExercise(WHITE);
  }

  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.PERIOD_START, {
            periodLength: periodLength
        })}}/>
      </BackButtonContainer>
      
      <SafeAreaView pointerEvents="none" style={{  alignItems: 'center', justifyContent: 'center', flex: 3.5 }}>
        <SafeAreaView style={{ alignItems: 'center'}}>
        <BackgroundShape style={{ top: 150 }}/>
        <CalendarIcon width='250' height='250' style={{ bottom: "28%" }}/>
        <BarIcon style={{ bottom: "26%" }}/>
        <TitleText style={{ bottom: "23%" }}>
          What symptoms do you {'\n'} want to track?
        </TitleText>
        <BodyText style={{ bottom: "23%" }}>
          You can change these later in {'\n'} your settings
        </BodyText>
        </SafeAreaView>
      </SafeAreaView>

      <ScrollView style={{ flex: 1.5, bottom: 40 }}>
        <SafeAreaView style={[styles.symptoms, { backgroundColor: flow }]}>
          <SymptomsChoicesButton onPress={handleFlow} title="Flow"></SymptomsChoicesButton>
          <FlowIcon style={styles.icon}/>
        </SafeAreaView>
        <SafeAreaView style={[styles.symptoms, { backgroundColor: mood }]}>
          <SymptomsChoicesButton onPress={handleMood} title="Mood"></SymptomsChoicesButton>
          <MoodIcon style={styles.icon}/>
        </SafeAreaView>
        <SafeAreaView style={[styles.symptoms, { backgroundColor: sleep }]}>
          <SymptomsChoicesButton onPress={handleSleep} title="Sleep"></SymptomsChoicesButton>
          <SleepIcon style={styles.icon}/>
        </SafeAreaView>
        <SafeAreaView style={[styles.symptoms, { backgroundColor: cramp }]}>
          <SymptomsChoicesButton onPress={handleCramp} title="Cramps"></SymptomsChoicesButton>
          <CrampsIcon style={styles.icon}/>
        </SafeAreaView>
        <SafeAreaView style={[styles.symptoms, { backgroundColor: exercise }]}>
          <SymptomsChoicesButton onPress={handleExercise} title="Exercise"></SymptomsChoicesButton>
          <ExerciseIcon style={styles.icon}/>
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView style={{ flex: 0.5 }}>
        <TwoButtonContainer style={{ top: 20 }}>
          <NextButton title="Next" onPress={() => 
            {
              trackingPreferences = [flow == TEAL, mood == TEAL, sleep == TEAL, cramp == TEAL, exercise == TEAL];
              PostSymptomsToTrack(trackingPreferences[0], trackingPreferences[1], trackingPreferences[2],
                                  trackingPreferences[3], trackingPreferences[4]);
              navigation.navigate(STACK_SCREENS.BACKUP, {
                periodLength: periodLength,
                periodStart: periodStart,
                periodEnd: periodEnd,
                trackingPreferences: trackingPreferences
              });
            }}
            disabled={[flow, mood, sleep, cramp, exercise].some((element) => element == TEAL) ? false : true}/>
        </TwoButtonContainer>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  symptoms: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 16,
    width: 227,
    height: 70,
    marginBottom: 13
  },
  icon: {
    right: 60, 
    top: 25
  }
});
