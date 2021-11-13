import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/AppIcon.appiconset/1024.png'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'

const CustomStartButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Welcome ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
        <Image style={styles.appIcon} source={MNationIcon}/>
        <Text style={styles.text}>Welcome!</Text>
        <CustomStartButton title="Get Started" onPress={() => navigation.navigate("Period Start")}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  appIcon: {
    width: 182, 
    height: 182,
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 26, 
    fontWeight: '800', 
    height: 35.52,
    marginTop: 50
  },
  appButtonContainer: {
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 205,
    height: 74,
    alignSelf: 'center', 
    marginTop: 96.18
  },
  appButtonText: {
    color: "#fff",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 24, 
    fontWeight: '800', 
    height: 32.78,
    marginTop: 20.5
  }
});
