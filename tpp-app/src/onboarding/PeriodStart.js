import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Welcome';
import styled from 'styled-components/native'; 
import { BackButton } from '../home/components/BackButtonComponent';

export const CustomNextButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.nextButtonContainer}>
    <Text style={styles.nextButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const CustomSkipButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 112 }}>
        <Text style={styles.skipButtonText}>{title}</Text>
    </TouchableOpacity>
)

export const CustomBackButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
      <Text style={styles.backButtonText}>{title}</Text>
  </TouchableOpacity>
)

export default function PeriodStart ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Period Length"])}}/>
      </BackButtonContainer>
      <TitleText>
        When did your {'\n'} period last start?
      </TitleText>
      <BodyText>
        Record your last period or {'\n'} skip if you don’t know
      </BodyText>

      <TwoButtonContainer>
        <CustomBackButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>
        <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>
      </TwoButtonContainer>
    </ImageBackground>
  );
}

export const TwoButtonContainer = styled.View`
  flexDirection: row;
  alignSelf: center;
  position: absolute;
  bottom: 70px;
  right: 40px
`;

export const TitleText = styled.Text`
  textAlign: center;
  fontFamily: Avenir;
  fontSize: 26px; 
  fontWeight: 800;
`;

export const BodyText = styled.Text`
  textAlign: center;
  fontFamily: System;
  fontSize: 16px; 
  fontWeight: 400;
  color: #000000;
  padding: 10px
`;

export const BackButtonContainer = styled.View`
  alignItems: stretch;
  justifyContent: center;
  borderRadius: 10px;
  width: 120px;
  height: 54px;
  position: absolute; 
  top: 30px
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  skipButtonText: {
    color: '#6D6E71', 
    textAlign: 'center', 
    textDecorationLine: 'underline', 
    fontWeight: '800', 
    fontSize: 15, 
    fontFamily: 'Avenir'
  }, 
  nextButtonContainer: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 149,
    height: 54,
    bottom: 10
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 15, 
    fontWeight: '800'
  }, 
  backButtonContainer: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    borderRadius: 10,
    width: 149,
    height: 54,
    bottom: 10
  },
  backButtonText: {
    color: "#5A9F93", 
    fontSize: 15 
  }
});
