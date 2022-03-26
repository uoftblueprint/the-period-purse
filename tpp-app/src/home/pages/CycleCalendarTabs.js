import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CalendarScreen from '../pages/CalendarScreen';
import CycleScreen from '../pages/CycleScreen';


const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {
  return (
<<<<<<< HEAD:tpp-app/src/home/components/CycleCalendarTabs.js
=======

>>>>>>> ad1f2a6d340c1b315fefde66b2b8b974c88f9fb4:tpp-app/src/home/pages/CycleCalendarTabs.js
      <Tab.Navigator style={{top: 40}}>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Cycle" component={CycleScreen} />
      </Tab.Navigator>
  );
}
