import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarScreen } from './pages/CalendarScreen'
import { YearScreen } from './pages/YearScreen'


const Stack = createNativeStackNavigator();
export default function CalendarNavigator({ navigation }) {
    return (
            <Stack.Navigator initialRouteName="Calendar">
                <Stack.Screen
                    name={"Calendar"}
                    component={CalendarScreen}
                    
                />
                <Stack.Screen
                    name={"Year"}
                    component={YearScreen}
                />
            </Stack.Navigator>
    )
}