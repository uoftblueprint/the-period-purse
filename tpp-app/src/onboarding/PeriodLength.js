import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CustomNextButton, CustomSkipButton, CustomBackButton, TwoButtonContainer, BodyText, TitleText } from './PeriodStart';
import { STACK_SCREENS } from './Welcome';

export default function PeriodLength ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <TitleText>
        How long does your {'\n'} period usually last?
      </TitleText>
      <BodyText>
        Type an rough date and we’ll {'\n'} calculate the rest! 
      </BodyText>
      <CustomSkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>

      <TwoButtonContainer>
        <CustomBackButton title="Back" onPress={() => navigation.navigate(STACK_SCREENS["Get Started"])}/>
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
