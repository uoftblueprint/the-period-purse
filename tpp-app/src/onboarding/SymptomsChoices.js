import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CustomNextButton, CustomSkipButton, CustomBackButton } from './PeriodStart';
import { STACK_SCREENS } from './Welcome';

export default function SymptomsChoices ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <Text style={styles.titleText}>
        What symptoms do you {'\n'} want to track?
      </Text>
      <Text style={styles.text}>
        You can change these later in {'\n'} your settings
      </Text>
      <CustomSkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>

      <View style={styles.twoButtonContainer}>
        <CustomBackButton title="Back" onPress={() => navigation.navigate(STACK_SCREENS["Period Start"])}/>
        <CustomNextButton title="Next" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>
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
  twoButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center', 
    position: 'absolute',
    bottom: 70,
    right: 40
  }
});