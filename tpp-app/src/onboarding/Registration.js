import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS, CustomStartButton } from './Welcome';
import { BackButtonContainer, BodyText, TitleText } from './PeriodStart';
import { BackButton } from '../home/components/BackButtonComponent';

export default function Registration ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton onPress={() => {navigation.navigate(STACK_SCREENS["Backup"])}}/>
      </BackButtonContainer>

    <TextInput style={styles.input} placeholder="me@email.com" keyboardType="email-address" />
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
    borderColor: "#5A9F93",
    width: "90%",
    alignSelf: "center",
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontFamily: "Avenir", 
    fontSize: 14
  },
});