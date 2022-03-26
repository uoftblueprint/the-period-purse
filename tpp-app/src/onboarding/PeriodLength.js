import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TextInput, Text, SafeAreaView } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodLength } from '../services/OnboardingService';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import PeriodLengthIcon from "../../ios/tppapp/Images.xcassets/icons/last_period_length.svg";
import BarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_bar.svg";
import KeyboardIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_keyboard.svg";

export default function PeriodLength ({ navigation }) {
  const [periodLength, setPeriodLength] = useState(null)

  function KeyboardIconPref() {
    if(periodLength)
      return (<Text style={styles.dayText}>days</Text>);
    else
      return (<KeyboardIcon style={styles.icon}/>);
  }

  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.GET_STARTED)}}/>
      </BackButtonContainer>

      <SafeAreaView pointerEvents="none" style={{ alignItems: 'center' }}>
      <BackgroundShape style={{ top: 10 }}/>
      <PeriodLengthIcon width='130' height='130' style={{ bottom: '38%' }}/>
      <BarIcon style={{ bottom: '30%'}}/>

      <TitleText style={{ bottom: '28%' }}>
        How long does your {'\n'} period usually last?
      </TitleText>
      <BodyText style={{ bottom: "28%" }}>
        This will help us make our {'\n'} reminders more accurate
      </BodyText>

      <InputContainer style={{ bottom: '25%'}}>
        <TextInput style={periodLength ? styles.output : styles.input} 
        placeholder="Tap to input" 
        keyboardType="number-pad" 
        returnKeyType='done'
        onChangeText={(periodLength) => setPeriodLength(periodLength)}
        />
        <KeyboardIconPref/>
      </InputContainer>
      </SafeAreaView>

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.PERIOD_START)}/>
        <NextButton title="Next" onPress={() => 
          {
            PostInitialPeriodLength(parseInt(periodLength));
            navigation.navigate(STACK_SCREENS.PERIOD_START);
          }}
          disabled={periodLength ? false : true}/>
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
  input: {
    fontFamily: "Avenir",
    fontSize: 17,
    alignSelf: 'center',
    marginTop: '10%',
    color: "#6D6E71",
    right: 5
  },
  icon: {
    alignSelf: 'center',
    left: '30%',
    bottom: '30%'
  },
  dayText: {
    fontFamily: "System",
    fontSize: 18,
    color: "#000000",
    alignSelf: 'center',
    left: '30%',
    bottom: '40%'
  },
  output: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: '600',
    alignSelf: 'center',
    color: "#000000",
    top: '15%'
  }
});
