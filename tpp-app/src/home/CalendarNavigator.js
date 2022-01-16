import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './pages/CalendarScreen'
import YearScreen from './pages/YearScreen'
import LogSymptomsScreen from './pages/LogSymptomsScreen';
import SelectLogOptionOverlay from './pages/SelectLogOptionOverlay';

// Create a navigation stack that can be used to access other pages
// Stack begins first page at CalendarScreen. This is done so that the global
// tab bar on the bottom is kept when navigating within pages.
const Stack = createNativeStackNavigator();
export default function CalendarNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Calendar"} component={CalendarScreen} />
            <Stack.Screen name={"Year"} component={YearScreen} />
            <Stack.Screen name={"SelectLogOption"} component={SelectLogOptionOverlay} options={{ presentation: 'containedTransparentModal' }} />
            <Stack.Screen name={"LogSymptoms"} component={LogSymptomsScreen} options={{ presentation: 'modal' }}/>
        </Stack.Navigator>
    )
}
