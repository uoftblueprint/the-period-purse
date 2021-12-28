import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CustomNextButton, CustomSkipButton, CustomBackButton, TwoButtonContainer, BodyText, TitleText, BackButtonContainer } from './PeriodStart';
import { STACK_SCREENS } from './Welcome';
import { BackButton } from '../home/components/BackButtonComponent';

export default function SymptomsChoices ({ navigation }) {
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

      <TwoButtonContainer>
        <CustomBackButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Backup"])}/>
        <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Backup"])}/>
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