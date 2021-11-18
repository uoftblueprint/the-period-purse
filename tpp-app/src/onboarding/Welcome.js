import React from 'react';
import {StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/AppIcon.appiconset/1024.png'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeriodStart from './PeriodStart';
import PeriodLength from './PeriodLength';
import SymptomsChoices from './SymptomsChoices';
import { MyTabs } from '../../App';

const CustomStartButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

// Get Start Page Component 
const GetStarted = ({ navigation }) => (
  <ImageBackground source={OnboardingBackground} style={styles.container}>
    <Image style={styles.appIcon} source={MNationIcon}/>
    <Text style={styles.titleText}>Welcome!</Text>
    <CustomStartButton title="Get Started" onPress={() => navigation.navigate("Period Start")}/>
  </ImageBackground>
);

// Stack Navigation for the Onboarding Pages 
const Stack = createNativeStackNavigator();
export default function Welcome() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen
        name="Get Started"
        component={GetStarted}
      />
      <Stack.Screen
        name="Period Start"
        component={PeriodStart}
      />
      <Stack.Screen
        name="Period Length"
        component={PeriodLength}
      />
      <Stack.Screen
        name="Symptoms Choices"
        component={SymptomsChoices}
      />
      <Stack.Screen 
        name="Main Page"
        component={MyTabs}
      />
      </Stack.Navigator>
    </NavigationContainer>
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
  appButtonContainer: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 205,
    height: 74,
    alignSelf: 'center', 
    marginTop: 96.18
  },
  appButtonText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 24, 
    fontWeight: '800' 
  }
});
