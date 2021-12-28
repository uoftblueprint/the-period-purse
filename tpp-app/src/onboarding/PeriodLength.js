import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CustomNextButton, CustomSkipButton, CustomBackButton, TwoButtonContainer, BodyText, TitleText, BackButtonContainer } from './PeriodStart';
import { STACK_SCREENS } from './Welcome';
import { BackButton } from '../home/components/BackButtonComponent';

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
        <CustomBackButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
        <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
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
