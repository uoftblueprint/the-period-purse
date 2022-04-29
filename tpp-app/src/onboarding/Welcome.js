import React from 'react';
import {StyleSheet, Text, Image, ImageBackground, View, TouchableOpacity, Button} from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/SplashScreen.imageset/splashscreen.png'
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeriodStart from './PeriodStart';
import PeriodLength from './PeriodLength';
import SymptomsChoices from './SymptomsChoices';
import Backup from './Backup';
import Registration from './Registration'
import Password from './Password';
import { MainNavigator } from '../../App';
import Success from './Success';
import Confirmation from './Confirmation';
import { WideButton } from './components/ButtonComponents';
import { STACK_SCREENS } from './Confirmation';
import AppleSignin from './AppleSignin';
import PrivacyPolicyScreen from '../home/pages/PrivacyPolicyScreen';
import TermsAndConditions from '../home/pages/TermsAndConditions';
import ErrorFallback from "../error/error-boundary";

// Get Start Page Component
const GetStarted = ({ navigation }) => {

  const openPrivacyPolicy = () => {
    navigation.navigate(STACK_SCREENS.PRIVACY_POLICY)
  }
  const openTermsAndCondition = () => {
      navigation.navigate(STACK_SCREENS.TERMS_AND_CONDITION)
  }

  return(
  <ErrorFallback>
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <Image style={styles.appIcon} source={MNationIcon}/>
      <Text style={styles.titleText}>Welcome!</Text>
      <View style={{height: 80}}></View>
      <WideButton title="Quick Start" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS.PERIOD_LENGTH)}/>
      <AppleSignin navigation={navigation}/>
      <View style={styles.copyright}>
          <Text>{`By continuing, you accept the`}</Text>
      </View>
      <View style={styles.terms}>
          <TouchableOpacity onPress={openTermsAndCondition} style={styles.textLink} >
              <Text style={styles.termsText}> Terms and Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}> and </Text>
          <TouchableOpacity onPress={openPrivacyPolicy} style={styles.textLink} >
              <Text style={styles.termsText}>Privacy Policy </Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  </ErrorFallback>
  )
};

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
        component={MainNavigator}
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
      <Stack.Screen
        name={STACK_SCREENS.PRIVACY_POLICY}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name={STACK_SCREENS.TERMS_AND_CONDITION}
        component={TermsAndConditions}
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
  terms: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  termsText: {
      color: "black",
      textDecorationLine: "underline",
      fontWeight: "bold",
  },
  copyright: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
