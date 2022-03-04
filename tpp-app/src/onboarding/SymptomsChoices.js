import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, View } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton, SymptomsChoicesButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, SymptomsChoicesButtonContainer } from './components/ContainerComponents';
import { PostSymptomsToTrack } from '../services/OnboardingService';
// import FlowIcon from "../../ios/tppapp/Images.xcassets/icons/flow.svg";
// import MoodIcon from "../../ios/tppapp/Images.xcassets/icons/mood.svg";
// import ExerciseIcon from "../../ios/tppapp/Images.xcassets/icons/exercise.svg";
// import CrampsIcon from "../../ios/tppapp/Images.xcassets/icons/cramps.svg";
// import SleepIcon from "../../ios/tppapp/Images.xcassets/icons/sleep.svg";

export default function SymptomsChoices ({ navigation }) {
  const [flow, setFlow] = useState('#FFFFFF');
  const [sleep, setSleep] = useState('#FFFFFF');
  const [mood, setMood] = useState('#FFFFFF');
  const [cramp, setCramp] = useState('#FFFFFF');
  const [exercise, setExercise] = useState('#FFFFFF');

  const handleFlow = () => { 
    flow == '#FFFFFF' ? setFlow('#73C7B7') : setFlow('#FFFFFF');
  }
  const handleSleep = () => { 
    sleep == '#FFFFFF' ? setSleep('#73C7B7') : setSleep('#FFFFFF');
  }
  const handleMood = () => { 
    mood == '#FFFFFF' ? setMood('#73C7B7') : setMood('#FFFFFF');
  }
  const handleCramp = () => { 
    cramp == '#FFFFFF' ? setCramp('#73C7B7') : setCramp('#FFFFFF');
  }
  const handleExercise = () => { 
    exercise == '#FFFFFF' ? setExercise('#73C7B7') : setExercise('#FFFFFF');
  }

  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Period Start"])}}/>
      </BackButtonContainer>
      <TitleText>
        What symptoms do you {'\n'} want to track?
      </TitleText>
      <BodyText>
        You can change these later in {'\n'} your settings
      </BodyText>

      <ScrollView style={{height: 10}}>
        <View style={[styles.symptoms, { backgroundColor: flow }]}>
          <SymptomsChoicesButton onPress={handleFlow} title="Flow"></SymptomsChoicesButton>
        </View>
        <View style={[styles.symptoms, { backgroundColor: mood }]}>
          <SymptomsChoicesButton onPress={handleMood} title="Mood"></SymptomsChoicesButton>
          </View>
        <View style={[styles.symptoms, { backgroundColor: sleep }]}>
          <SymptomsChoicesButton onPress={handleSleep} title="Sleep"></SymptomsChoicesButton>
          </View>
        <View style={[styles.symptoms, { backgroundColor: cramp }]}>
          <SymptomsChoicesButton onPress={handleCramp} title="Cramps"></SymptomsChoicesButton>
          </View>
        <View style={[styles.symptoms, { backgroundColor: exercise }]}>
          <SymptomsChoicesButton onPress={handleExercise} title="Exercise"></SymptomsChoicesButton>
        </View>
      </ScrollView>

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Backup"])}/>
        <NextButton title="Next" onPress={() => 
          {
            PostSymptomsToTrack(true, true, false, false, false);
            navigation.navigate(STACK_SCREENS["Backup"]);
          }}/>
      </TwoButtonContainer>
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
  }
});
