import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Sentry from "@sentry/react-native";
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import SettingsNavigator from './src/settings/SettingsNavigator';
import { TabBarMiddleButton } from './src/home/components/TabBarMiddleButton';
import Welcome from './src/onboarding/Welcome';
import InfoNavigator from './src/info/InfoNavigator';
import {
    POSTRemindLogSymptoms,
    POSTRemindLogSymptomsFreq,
    POSTRemindLogSymptomsTime,
    GETRemindLogSymptomsFreq, GETRemindLogSymptomsTime, GETRemindLogSymptoms
} from './src/services/SettingsService';
import SettingsIcon from './ios/tppapp/Images.xcassets/icons/settings_icon.svg';
import InfoIcon from './ios/tppapp/Images.xcassets/icons/info_icon.svg';
import PrivacyPolicyScreen from './src/home/pages/PrivacyPolicyScreen';
import TermsAndConditions from './src/home/pages/TermsAndConditions';
import { StartLoadScreen } from './src/home/pages/StartLoadScreen';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import {errorAlertModal} from "./src/error/errorAlertModal";


export const STACK_SCREENS = {
  MAIN_PAGE: "MainPage",
  TERMS_AND_CONDITION: "TermsAndCondition",
  PRIVACY_POLICY: "PrivacyPolicy"
}

// Initialize Sentry's SDK
Sentry.init({
  dsn: "https://35946e620f1a4559b9abd70d044e6ca0@o1164205.ingest.sentry.io/6253138",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const InfoIconStyled = (props) => (
    <View style={{top: 3}}>
        <InfoIcon fill={props.focused ? '#5A9F93' : '#6D6E71'} />
    </View>
);

const SettingsIconStyled = (props) => (
  <View style={{top: 3}}>
      <SettingsIcon fill={props.focused ? '#5A9F93' : '#6D6E71'} />
  </View>
);


const MainPage = () => {
  return(<Tab.Navigator initialRouteName='MiddleButton'>
          <Tab.Screen name="Learn" component={InfoNavigator} options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <InfoIconStyled {...props} />
            ),
            tabBarActiveTintColor: "#5A9F93",
            tabBarInactiveTintColor: "#6D6E71",
          }}/>
          <Tab.Screen name="MiddleButton" component={CalendarNavigator} options={{
            headerShown: false,
            tabBarButton: (props) => (
              <TabBarMiddleButton {...props} style={{ top: -30 }} inOverlay={false} />
            )
          }}/>
          <Tab.Screen name="Settings" component={SettingsNavigator} options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <SettingsIconStyled {...props} />
            ),
            tabBarActiveTintColor: "#5A9F93",
            tabBarInactiveTintColor: "#6D6E71",
          }}/>
        </Tab.Navigator>)
}

export function MainNavigator() {
  const navigationRef = useNavigationContainerRef();

  // Requests for notification permissions and also creates a local notification listener
  // Does not handle remote notifications from a server.
  useEffect(() => {

    PushNotificationIOS.addEventListener('localNotification', ((notification) => {
      const isClicked = notification.getData().userInteraction === 1;

      // Write code to do something special if it is clicked
      if (isClicked) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0)
        navigationRef.navigate('MiddleButton', {screen: 'Calendar'})
      }
    }));

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      async (data) => {
        console.log('PushNotificationsIOS.requestPermissions', data);

        if (await GETRemindLogSymptomsFreq() === null) {
            await POSTRemindLogSymptomsFreq("Every day");
        }
        if (await GETRemindLogSymptomsTime() == null) {
            await POSTRemindLogSymptomsTime("10:00 AM");
        }
        if (await GETRemindLogSymptoms() === null) {
            await POSTRemindLogSymptoms(true);
        }

      },
      (data) => {
        console.log('PushNotificationsIOS.requestPermissions failed', data);
      }
    )
    return () => {
      PushNotificationIOS.removeEventListener('localNotification')
    }
  }, [])

  return (
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={STACK_SCREENS.MAIN_PAGE} component={MainPage}/>
          <Stack.Screen name={STACK_SCREENS.PRIVACY_POLICY} component={PrivacyPolicyScreen} 
          options={{title: "Privacy Policy",
            headerShown: true,
            headerStyle: {height: 200},
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 20,
              fontFamily: "Avenir",
              color: "black"
            },
            headerTintColor:"#5A9F93",
            headerBackTitleVisible: false
          }}/>
          <Stack.Screen name={STACK_SCREENS.TERMS_AND_CONDITION} component={TermsAndConditions} 
          options={{title: "Terms and Conditions",
            headerShown: true,
            headerStyle: {height: 200},
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 20,
              fontFamily: "Avenir",
              color: "black"
            },
            headerTintColor:"#5A9F93",
            headerBackTitleVisible: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        errorAlertModal();
    } else {
        console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
    console.log('setNativeExceptionHandler');
});


function App() {
  return (<StartLoadScreen/>);
}


export default Sentry.wrap(App);
