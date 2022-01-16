import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';

import VectorImage from 'react-native-vector-image';

const Tab = createBottomTabNavigator();

/** Recursive function to get the current active screen state through nested navigators */
const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}

const CustomTabBarButton = ({ onPress }) => {
  const calendarShowing = useIsFocused();

  let icon = calendarShowing
    ? <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/plus_sign.svg')}/>
    : <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/calendar_icon.svg')} />;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';

  const navigation = useNavigation();
  const activeRoute = getActiveRouteState(navigation.getState());
  let overlayVisible = activeRoute?.state?.routes?.some((screen) => screen["name"] === "SelectLogOption");

  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow
        }}
        onPress={() => {
          calendarShowing && !overlayVisible
            ? navigation.navigate('MiddleButton', { screen: 'SelectLogOption' })
            : navigation.navigate('MiddleButton', { screen: 'Calendar' })
        }}
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
        justifyContent: 'center',
        transform: [
          { rotate: "45deg" }
        ]
      }}>
        {icon}
      </View>

    </TouchableOpacity>
  );
};


const InfoIconStyled = ({tintColor}) => (
    <View style={{top: 3}}>
        <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/info_icon.svg')} />
    </View>
);

const SettingsIconStyled = ({tintColor}) => (
  <View style={{top: 3}}>
      <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/settings_icon.svg')} />
  </View>
);

export function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="Settings" component={Settings} />
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
          <Tab.Screen name="MiddleButton" component={CalendarNavigator} options={{
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
