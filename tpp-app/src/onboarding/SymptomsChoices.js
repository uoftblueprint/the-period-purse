import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import { PostSymptomsToTrack } from '../services/OnboardingService';

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
  }
});
