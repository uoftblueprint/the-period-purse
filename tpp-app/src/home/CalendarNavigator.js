import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './pages/CalendarScreen'
import YearScreen from './pages/YearScreen'

// Create a navigation stack that can be used to access other pages
// Stack begins first page at CalendarScreen
const Stack = createNativeStackNavigator();
export default function CalendarNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Calendar"}
                component={CalendarScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"Year"}
                component={YearScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}