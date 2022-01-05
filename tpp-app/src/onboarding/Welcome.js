import React from 'react';
import {StyleSheet, Text, Image, ImageBackground, View } from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/AppIcon.appiconset/1024.png'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeriodStart from './PeriodStart';
import PeriodLength from './PeriodLength';
import SymptomsChoices from './SymptomsChoices';
import Backup from './Backup';
import Registration from './Registration'
import Password from './Password';
import { MainPage } from '../../App';
import Success from './Success';
import Confirmation from './Confirmation';
import { WideButton } from './components/ButtonComponents';

export const STACK_SCREENS = {
  "Get Started" : "Get Started",
  "Period Length" : "Period Length", 
  "Period Start":  "Period Start",
  "Symptoms Choices" : "Symptoms Choices",
  "Backup" : "Backup", 
  "Main Page": "Main Page", 
  "Registration": "Registration",
  "Password": "Password", 
  "Success": "Success", 
  "Confirmation": "Confirmation"
};

// Get Start Page Component 
const GetStarted = ({ navigation }) => (
  <ImageBackground source={OnboardingBackground} style={styles.container}>
    <Image style={styles.appIcon} source={MNationIcon}/>
    <Text style={styles.titleText}>Welcome!</Text>
    <View style={{height: 80}}></View>
    <WideButton title="Quick Start" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Period Length"])}/>
    <WideButton title="Register" color="#B31F20" onPress={() => navigation.navigate(STACK_SCREENS["Registration"])}/>
  </ImageBackground>
);

// Stack Navigation for the Onboarding Pages 
const Stack = createNativeStackNavigator();
export default function Welcome() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen
        name={STACK_SCREENS["Get Started"]}
        component={GetStarted}
      />
      <Stack.Screen
        name={STACK_SCREENS["Period Length"]}
        component={PeriodLength}
      />
      <Stack.Screen
        name={STACK_SCREENS["Period Start"]}
        component={PeriodStart}
      />
      <Stack.Screen
        name={STACK_SCREENS["Symptoms Choices"]}
        component={SymptomsChoices}
      />
      <Stack.Screen
        name={STACK_SCREENS["Backup"]}
        component={Backup}
      />
      <Stack.Screen 
        name={STACK_SCREENS["Main Page"]}
        component={MainPage}
      />
      <Stack.Screen 
        name={STACK_SCREENS["Registration"]}
        component={Registration}
      />
      <Stack.Screen 
        name={STACK_SCREENS["Password"]}
        component={Password}
      />
      <Stack.Screen 
        name={STACK_SCREENS["Success"]}
        component={Success}
      />
      <Stack.Screen 
        name={STACK_SCREENS["Confirmation"]}
        component={Confirmation}
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
});
