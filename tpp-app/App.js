import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './src/home/Calendar';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';

import InfoIcon from './ios/tppapp/Images.xcassets/info-icon-3x.png'
import BloodDropIcon from './ios/tppapp/Images.xcassets/icons/blood-drop.png'
import CalendarIcon from './ios/tppapp/Images.xcassets/icons/calendar-icon.png'
import SettingsIcon from './ios/tppapp/Images.xcassets/icons/settings_icon.png';

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

function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Info" component={InfoScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}


export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Info" component={Info} options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
                <InfoIconStyled {...tintColor} />
                )

          }}/>
          <Tab.Screen name="MiddleButton" component={Calendar} options={{
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
