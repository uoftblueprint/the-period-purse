import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { TitleText, BodyText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import { PostInitialPeriodStart } from '../services/OnboardingService';

export default function PeriodStart ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.PERIOD_LENGTH)}}/>
      </BackButtonContainer>
      <TitleText>
        When did your {'\n'} period last start?
      </TitleText>
      <BodyText>
        Record your last period or {'\n'} skip if you don’t know
      </BodyText>

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES)}/>
        <NextButton title="Next" onPress={() => 
          {
            PostInitialPeriodStart(new Date(2011, 11, 30));
            navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES);
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
  }
});
