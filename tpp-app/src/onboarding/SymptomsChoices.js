import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CustomNextButton, CustomSkipButton, CustomBackButton, TwoButtonContainer, BodyText, TitleText } from './PeriodStart';
import { STACK_SCREENS } from './Welcome';

export default function SymptomsChoices ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <TitleText>
        What symptoms do you {'\n'} want to track?
      </TitleText>
      <BodyText>
        You can change these later in {'\n'} your settings
      </BodyText>
      <CustomSkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>

      <TwoButtonContainer>
        <CustomBackButton title="Back" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
        <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>
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