import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import OnboardingService from './OnboardingService';

async function savePeriodLength(periodLength) {
  try {
    await OnboardingService.PostInitialPeriodLength(periodLength); 
  }
  catch {

  }
}

export default function PeriodLength ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Get Started"])}}/>
      </BackButtonContainer>
      <TitleText>
        How long does your {'\n'} period usually last?
      </TitleText>
      <BodyText>
        This will help us make our {'\n'} reminders more accurate
      </BodyText>

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
        <NextButton title="Next" onPress={() => 
          {
            savePeriodLength(5)
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
  }
});
