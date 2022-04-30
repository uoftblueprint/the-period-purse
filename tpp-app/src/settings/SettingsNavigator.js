import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import Settings from "./Settings"
import Notifications from './Notifications';
const Stack = createNativeStackNavigator();
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteAccount from "./DeleteAccount";
import BackUpAccount from "./BackUpAccount";

export const STACK_SCREENS = {
  SETTINGS: "Settings",
  NOTIFICATIONS: "Notifications",
  BACK_UP_ACCOUNT: "Back Up Account",
  DELETE_ACCOUNT: "Delete Account"
}
export default function SettingsNavigator({navigation}) {
    return(
        <Stack.Navigator intialRouteName="Settings" screenOptions={{ headerShown: true,
            headerStyle: {height: 200},
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 20,
              fontFamily: "Avenir",
            },
          }}>
             <Stack.Screen name={STACK_SCREENS.SETTINGS} component={Settings} />
             <Stack.Screen name={STACK_SCREENS.NOTIFICATIONS} component={Notifications} 
              // options={{
              //   headerLeft : () => (<TouchableOpacity 
              //     onPress={() => navigation.goBack(null)}
              // >
              //     <Icon name="keyboard-arrow-left" size={36} color={"#5A9F93"}/>
              // </TouchableOpacity>)}}
              />
              <Stack.Screen name={STACK_SCREENS.BACK_UP_ACCOUNT} component={BackUpAccount} />
              <Stack.Screen name={STACK_SCREENS.DELETE_ACCOUNT} component={DeleteAccount} />
        </Stack.Navigator>
    )
};