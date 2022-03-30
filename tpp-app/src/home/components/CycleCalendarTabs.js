import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CalendarScreen from '../pages/CalendarScreen';
import CycleScreen from '../pages/CycleScreen';
import Constants from 'expo-constants';


const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {
  return (
      <Tab.Navigator 
        style={{top: Constants.statusBarHeight}}
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: "#5A9F93"
          },
          tabBarStyle: {
            height: "7%"
          }
        }}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Cycle" component={CycleScreen} />
      </Tab.Navigator>
  );
}
