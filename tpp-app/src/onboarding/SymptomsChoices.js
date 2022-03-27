import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import { PostSymptomsToTrack } from '../services/OnboardingService';

let onboardingBg = require('../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background-light.png')

export default function SymptomsChoices ({ navigation }) {
  return (
    <ImageBackground  source={onboardingBg} style={styles.backgroundImg}>
      <View style={styles.container}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.PERIOD_START)}}/>
        </BackButtonContainer>
        <TitleText>
          What symptoms do you {'\n'} want to track?
        </TitleText>
        <BodyText>
          You can change these later in {'\n'} your settings
        </BodyText>

        <TwoButtonContainer>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.BACKUP)}/>
          <NextButton title="Next" onPress={() => 
            {
              PostSymptomsToTrack(true, true, false, false, false);
              navigation.navigate(STACK_SCREENS.BACKUP);
            }}/>
        </TwoButtonContainer>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%', 
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
