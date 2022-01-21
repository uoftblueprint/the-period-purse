import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import InfoIcon from './ios/tppapp/Images.xcassets/info-icon-3x.png'
import BloodDropIcon from './ios/tppapp/Images.xcassets/icons/blood-drop.png'
import CalendarIcon from './ios/tppapp/Images.xcassets/icons/calendar-icon.png'
import SettingsIcon from './ios/tppapp/Images.xcassets/icons/settings_icon.png';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => {
  const calendarShowing = useIsFocused();
  let icon = calendarShowing ? BloodDropIcon : CalendarIcon;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';
  const navigation = useNavigation();

  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow
        }}
        onPress={() => {
          if (calendarShowing) {
            navigation.navigate('MiddleButton', { screen: 'LogSymptoms' });
          } else {
            navigation.navigate('MiddleButton', { screen: 'Calendar' });
          }
        }}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        boxSizing: 'border-box',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image
          style={{
            width: 24.67,
            height: 30.83
          }}
          source={icon}
        />
      </View>
    </TouchableOpacity>
  );
};


const InfoIconStyled = ({tintColor}) => (
    <View style={{top: 3}}>
                      <Image
                        source={InfoIcon}
                        style={{width: 20, height: 20, tintColor: tintColor}}
                      />
                </View>
);

const SettingsIconStyled = ({tintColor}) => (
  <View style={{top: 3}}>
      <Image
        source={SettingsIcon}
        style={{width: 20, height: 20, tintColor: tintColor}}
      />
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


export default function App() {
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
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator>
          <Tab.Screen name="Info" component={Info} options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
                <InfoIconStyled {...tintColor} />
                )
          }}/>
          <Tab.Screen name="MiddleButton" component={CalendarNavigator} options={{
            headerShown: false,
            tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
