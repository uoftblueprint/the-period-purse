import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, View } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton, SymptomsChoicesButton } from './components/ButtonComponents';
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
import BarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_bar.svg";

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
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <View style={{ alignItems: 'stretch', justifyContent: 'center', flex: 3.5 }}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Period Start"])}}/>
        </BackButtonContainer>
        <BackgroundShape style={{ top: -10, position: 'absolute' }}/>
        <CalendarIcon style={{ alignSelf: 'center', top: -10 }}/>
        <BarIcon style={{ alignSelf: 'center', top: 10 }}/>
        <TitleText style={{ top: 30 }}>
          What symptoms do you {'\n'} want to track?
        </TitleText>
        <BodyText style={{ top: 30 }}>
          You can change these later in {'\n'} your settings
        </BodyText>
      </View>

      <ScrollView style={{ flex: 1.5 }}>
        <View style={[styles.symptoms, { backgroundColor: flow }]}>
          <SymptomsChoicesButton onPress={handleFlow} title="Flow"></SymptomsChoicesButton>
          <FlowIcon style={styles.icon}/>
        </View>
        <View style={[styles.symptoms, { backgroundColor: mood }]}>
          <SymptomsChoicesButton onPress={handleMood} title="Mood"></SymptomsChoicesButton>
          <MoodIcon style={styles.icon}/>
        </View>
        <View style={[styles.symptoms, { backgroundColor: sleep }]}>
          <SymptomsChoicesButton onPress={handleSleep} title="Sleep"></SymptomsChoicesButton>
          <SleepIcon style={styles.icon}/>
        </View>
        <View style={[styles.symptoms, { backgroundColor: cramp }]}>
          <SymptomsChoicesButton onPress={handleCramp} title="Cramps"></SymptomsChoicesButton>
          <CrampsIcon style={styles.icon}/>
        </View>
        <View style={[styles.symptoms, { backgroundColor: exercise }]}>
          <SymptomsChoicesButton onPress={handleExercise} title="Exercise"></SymptomsChoicesButton>
          <ExerciseIcon style={styles.icon}/>
        </View>
      </ScrollView>

      <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
        <TwoButtonContainer style={{ top: 20 }}>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Backup"])}/>
          <NextButton title="Next" onPress={() => 
            {
              PostSymptomsToTrack(flow == '#73C7B7', mood == '#73C7B7', sleep == '#73C7B7', 
                                  cramp == '#73C7B7', exercise == '#73C7B7');
              navigation.navigate(STACK_SCREENS["Backup"]);
            }}/>
        </TwoButtonContainer>
      </View>
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
