import React from 'react';
import {StyleSheet, Text, Image, ImageBackground, View } from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/AppIcon.appiconset/1024.png'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png'
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
import { STACK_SCREENS } from './Confirmation';

let onboardingBg = require('../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background-light.png')

// Get Start Page Component
const GetStarted = ({ navigation }) => (
  <ImageBackground source={onboardingBg} style={styles.backgroundImg}>
    <View style={styles.container}>
      <Image style={styles.appIcon} source={MNationIcon}/>
      <Text style={styles.titleText}>Welcome!</Text>
      <View style={{height: 80}}></View>
      <WideButton title="Quick Start" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS.PERIOD_LENGTH)}/>
      <WideButton title="Register" color="#B31F20" onPress={() => navigation.navigate(STACK_SCREENS.REGISTRATION)}/>
    </View>
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
        name={STACK_SCREENS.GET_STARTED}
        component={GetStarted}
      />
      <Stack.Screen
        name={STACK_SCREENS.PERIOD_LENGTH}
        component={PeriodLength}
      />
      <Stack.Screen
        name={STACK_SCREENS.PERIOD_START}
        component={PeriodStart}
      />
      <Stack.Screen
        name={STACK_SCREENS.SYMPTOMS_CHOICES}
        component={SymptomsChoices}
      />
      <Stack.Screen
        name={STACK_SCREENS.BACKUP}
        component={Backup}
      />
      <Stack.Screen
        name={STACK_SCREENS.MAIN_PAGE}
        component={MainPage}
      />
      <Stack.Screen
        name={STACK_SCREENS.REGISTRATION}
        component={Registration}
      />
      <Stack.Screen
        name={STACK_SCREENS.PASSWORD}
        component={Password}
      />
      <Stack.Screen
        name={STACK_SCREENS.SUCCESS}
        component={Success}
      />
      <Stack.Screen
        name={STACK_SCREENS.CONFIRMATION}
        component={Confirmation}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%', 
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
