import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS, CustomStartButton } from './Welcome';
import { BodyText, TitleText } from './PeriodStart';

export default function Backup ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <TitleText>
        Would you like to {'\n'} back up your data?
      </TitleText>
      <BodyText>
        Your data will be lost if you {'\n'} switch devices
      </BodyText>

      <CustomStartButton title="Register" color="#B31F20" onPress={() => navigation.navigate(STACK_SCREENS["Registration"])}/>
      <CustomStartButton title="Continue as guest" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>
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