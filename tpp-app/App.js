import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import InfoIcon from './ios/tppapp/Images.xcassets/info-icon-3x.png'
import BloodDropIcon from './ios/tppapp/Images.xcassets/icons/blood-drop.png'
import CalendarIcon from './ios/tppapp/Images.xcassets/icons/calendar-icon.png'
import SettingsIcon from './ios/tppapp/Images.xcassets/icons/settings_icon.png';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => {
  const calendarShowing = useIsFocused();
  let icon = calendarShowing ? BloodDropIcon : CalendarIcon;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';
  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow
        }}
        onPress={onPress}
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
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.metadata',
                'https://www.googleapis.com/auth/drive.readonly',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/drive.apps.readonly'], // We want   read and write access
            webClientId: "64015320596-sj0gule87m7s205lb5lv5jnlhd68c8u4.apps.googleusercontent.com", // REPLACE WITH YOUR ACTUAL  CLIENT ID !
            offlineAccess: true
        });
    }, []);

  return (
      <NavigationContainer>
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
