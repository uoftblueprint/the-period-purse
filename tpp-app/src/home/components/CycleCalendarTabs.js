import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CalendarScreen from '../pages/CalendarScreen';
import CycleScreen from '../pages/CycleScreen';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {
  return (
      <Tab.Navigator style={{top: 40}}>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Cycle" component={CycleScreen} />
      </Tab.Navigator>
  );
}
