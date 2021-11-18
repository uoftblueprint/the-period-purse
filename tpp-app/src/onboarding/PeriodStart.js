import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Welcome';

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
        <Text style={styles.titleText}>
            When did your {'\n'} period last start?
        </Text>
        <Text style={styles.text}>
            Record your last period or {'\n'} skip if you don’t know
        </Text>
        <CustomSkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>

        <View style={styles.twoButtonContainer}>
            <CustomBackButton title="Back" onPress={() => navigation.navigate(STACK_SCREENS["Period Length"])}/>
            <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>
        </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 26, 
    fontWeight: '800', 
    marginTop: 200
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 16, 
    fontWeight: '400', 
    marginTop: 19,
    color: '#5F5F5F'
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
  }, 
  twoButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center', 
    position: 'absolute',
    bottom: 70,
    right: 40
  }
});
