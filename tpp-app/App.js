import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import VectorImage from 'react-native-vector-image';
import Welcome from './src/onboarding/Welcome'

import InfoNavigator from './src/info/InfoNavigator'

const Tab = createBottomTabNavigator();

/** Recursive function to get the current active screen state through nested navigators */
const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}

/**
 * RotateView component. Toggle rotation based on passed in prop values.
 *
 * @prop {number | string} spinValue If spinValue is a string, no animation is rendered.
 * Otherwise, spinValue is either 1 to rotate forward 45deg or 0 to rotate back to 0deg.
 */
const RotateView = (props) => {
  const rotateDeg = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (typeof props.spinValue === 'number') {
      Animated.timing(
        rotateDeg,
        {
          toValue: props.spinValue,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start();
    }
  }, [props.spinValue]);

  const spin = rotateDeg.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  });

  const animateRotationStyle =
    typeof props.spinValue === 'number'
      ? { transform: [
          { rotate: spin },     // Bind rotate to animated value
          { perspective: 1000 }
        ]}
      : { transform: [
          { rotate: '0deg' },   // Set calendar icon to 0deg
          { perspective: 1000 }
        ]};

  return (
    <Animated.View style={[ props.style, animateRotationStyle ]} >
      {props.children}
    </Animated.View>
  );
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

  const [rotate, setRotation] = useState(0);

  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow
        }}
        onPress={() => {
          if (calendarShowing && !overlayVisible) {
            setRotation(1);
            navigation.navigate('MiddleButton', { screen: 'SelectLogOption' })
          } else {
            setRotation(0);
            navigation.navigate('MiddleButton', { screen: 'Calendar' })
          }
        }}
    >

      <RotateView
        style={[ styles.middleButton, { backgroundColor: bgColor } ]}
        // disable rotation with string if focus switches to a non-calendar screen OR
        // rotate back to 0 if overlay closes from gestures that aren't from the tab bar
        spinValue={ !calendarShowing ? '0degIcon' : (!overlayVisible ? 0 : rotate) }
      >
        {icon}
      </RotateView>

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

export function MainPage() {
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator initialRouteName='MiddleButton'>
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

export default function App() {
  return (
    // <Welcome></Welcome>
    <MainPage></MainPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
