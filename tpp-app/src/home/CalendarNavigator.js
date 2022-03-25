import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CycleCalendarTabs from './components/CycleCalendarTabs';
import YearScreen from './pages/YearScreen'
import LogSymptomsScreen from './pages/LogSymptomsScreen';
import SelectLogOptionOverlay from './pages/SelectLogOptionOverlay';
import LogMultipleDatesScreen from './pages/LogMultipleDatesScreen';

// Create a navigation stack that can be used to access other pages
// Stack begins first page at CalendarScreen. This is done so that the global
// tab bar on the bottom is kept when navigating within pages.
const Stack = createNativeStackNavigator();

export default function CalendarNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"CycleCalendarTabs"} component={CycleCalendarTabs} />
            <Stack.Screen name={"Year"} component={YearScreen} />
            <Stack.Screen name={"SelectLogOption"} component={SelectLogOptionOverlay}
              options={{
                animation: 'fade',
                presentation: 'transparentModal'
              }} />
            <Stack.Screen name={"LogSymptoms"} component={LogSymptomsScreen} options={{ presentation: 'modal' }}/>
            <Stack.Screen name={"LogMultipleDates"} component={LogMultipleDatesScreen} options={{ presentation: 'fullScreenModal' }}/>
        </Stack.Navigator>
    )
}
