import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity} from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'

const CustomNextButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.nextButtonContainer}>
    <Text style={styles.nextButtonText}>{title}</Text>
  </TouchableOpacity>
);

const CustomSkipButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{marginTop: 112}}>
        <Text style={styles.skipButtonText}>{title}</Text>
    </TouchableOpacity>
)

export default function PeriodLength ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
        <Text style={styles.titleText}>
            How long does your {'\n'} period usually last?
        </Text>
        <Text style={styles.text}>
            Type an rough date and we’ll {'\n'} calculate the rest! 
        </Text>
        <CustomSkipButton title="Skip" onPress={() => navigation.navigate("Symptoms Choices")}/>

        <View style={styles.twoButtonContainer}>
            <Button title="Back" color="#5A9F93" onPress={() => navigation.navigate("Period Start")} style={styles.backButton}/>
            <View style={{width: 87.5}}/>
            <CustomNextButton title="Next" onPress={() => navigation.navigate("Symptoms Choices")}/>
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
  appIcon: {
    width: 182, 
    height: 182,
    alignSelf: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 26, 
    fontWeight: '800', 
    marginTop: 50
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
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 149,
    height: 54,
    bottom: 10
  },
  nextButtonText: {
    color: "#fff",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 15, 
    fontWeight: '800', 
    marginTop: 17
  }, 
  backButton: {
    position: 'absolute',
    marginRight: 87.5
  }, 
  twoButtonContainer: {
    alignItems: 'stretch',
    justifyContent: 'center', 
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 100,
    position: 'absolute',
    bottom: 70,
  }
});
