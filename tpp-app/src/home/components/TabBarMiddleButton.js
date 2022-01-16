import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import VectorImage from 'react-native-vector-image';


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


/** Recursive function to get the current active screen state through nested navigators */
const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}


export const TabBarMiddleButton = ({ onPress }) => {
  const navigation = useNavigation();
  const calendarShowing = useIsFocused();
  const [rotate, setRotation] = useState(0); // see RotateView for more info

  // set icon and background color based on if the calendar screen is focused
  let icon = calendarShowing
    ? <VectorImage source={require('../../../ios/tppapp/Images.xcassets/icons/plus_sign.svg')}/>
    : <VectorImage source={require('../../../ios/tppapp/Images.xcassets/icons/calendar_icon.svg')} />;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';

  // check if the SelectLogOption overlay is visible
  const activeRoute = getActiveRouteState(navigation.getState());
  let overlayVisible = activeRoute?.state?.routes?.some((screen) => screen["name"] === "SelectLogOption");

  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center'
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

const styles = StyleSheet.create({
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
