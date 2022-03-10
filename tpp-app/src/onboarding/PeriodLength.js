import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TextInput, View } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodLength } from '../services/OnboardingService';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import PeriodLengthIcon from "../../ios/tppapp/Images.xcassets/icons/last_period_length.svg";

export default function PeriodLength ({ navigation }) {
  const [periodLength, setPeriodLength] = useState(null)
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Get Started"])}}/>
      </BackButtonContainer>

      <BackgroundShape style={{ top: -10, position: 'absolute' }}/>
      {/* <PeriodLengthIcon style={{ alignSelf: 'center', top: -10 }}/> */}

      <TitleText>
        How long does your {'\n'} period usually last?
      </TitleText>
      <BodyText>
        This will help us make our {'\n'} reminders more accurate
      </BodyText>

      <InputContainer>
        <TextInput style={styles.input} 
        placeholder="Tap to input" 
        keyboardType="number-pad" 
        returnKeyType='done'
        onChangeText={(periodLength) => setPeriodLength(periodLength)}
        />
      </InputContainer>

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
        <NextButton title="Next" onPress={() => 
          {
            PostInitialPeriodLength(parseInt(periodLength));
            navigation.navigate(STACK_SCREENS["Period Start"]);
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
  input: {
    fontFamily: "Avenir",
    fontSize: 17,
    height: 22,
    alignSelf: 'center',
    marginTop: '10%',
    color: "#6D6E71"
  }
});
