import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from "./Settings"
import Notifications from './Notifications';
const Stack = createNativeStackNavigator();
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsNavigator() {
    return(
        <Stack.Navigator intialRouteName="Settings" screenOptions={{ headerShown: true,
            headerStyle: {height: 200},
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 20,
              fontFamily: "Avenir",
            },
          }}>
             <Stack.Screen name={"Settings"} component={Settings} />
             <Stack.Screen name={"Notifications"} component={Notifications} />
        </Stack.Navigator>
    )
};