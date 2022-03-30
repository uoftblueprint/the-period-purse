import React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Sentry from "@sentry/react-native";
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import { TabBarMiddleButton } from './src/home/components/TabBarMiddleButton';
//import Welcome from './src/onboarding/Welcome';
import InfoNavigator from './src/info/InfoNavigator';

import SettingsIcon from './ios/tppapp/Images.xcassets/icons/settings_icon.svg';
import InfoIcon from './ios/tppapp/Images.xcassets/icons/info_icon.svg';
import CycleCalendarTabs from './src/home/components/CycleCalendarTabs';
import ScrollTest from './ScrollTest';


// Initialize Sentry's SDK
Sentry.init({
  dsn: "https://35946e620f1a4559b9abd70d044e6ca0@o1164205.ingest.sentry.io/6253138",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false
});

const Tab = createBottomTabNavigator();

const InfoIconStyled = ({tintColor}) => (
    <View style={{top: 3}}>
        <InfoIcon/>
    </View>
);

const SettingsIconStyled = ({tintColor}) => (
  <View style={{top: 3}}>
      <SettingsIcon/>
  </View>
);

export function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  );
}


export function MainPage() {
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
      (data) => {
        console.log('PushNotificationsIOS.requestPermissions', data);
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
        <Tab.Navigator initialRouteName='MiddleButton'>
          <Tab.Screen name="Info" component={InfoNavigator} options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <InfoIconStyled {...tintColor} />
            )
          }}/>
          <Tab.Screen name="MiddleButton" component={CalendarNavigator} options={{
            headerShown: false,
            tabBarButton: (props) => (
              <TabBarMiddleButton {...props} style={{ top: -30 }} inOverlay={false} />
            )
          }}/>
          <Tab.Screen name="Settings" component={Settings} options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <SettingsIconStyled {...props} />
          )
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

function App() {
  return (
    // <Welcome></Welcome>
       <MainPage></MainPage>
      // <ScrollTest/>
  );
}

export default Sentry.wrap(App);
