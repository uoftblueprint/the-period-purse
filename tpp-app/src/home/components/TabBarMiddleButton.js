import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BloodDrop from './ios/tppapp/Images.xcassets/icons/blood_drop.svg';
import CalendarIcon from './ios/tppapp/Images.xcassets/icons/calendar_icon.svg';


/** Recursive function to get the current active screen state through nested navigators */
const getActiveRouteState = function (route) {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
}


export const TabBarMiddleButton = ({ style, inOverlay }) => {
  const navigation = useNavigation();
  const calendarShowing = useIsFocused();

  // set icon and background color based on if the calendar screen is focused
  let icon = calendarShowing ? <BloodDrop /> : <CalendarIcon />;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';

  // check if the SelectLogOption overlay is visible
  const activeRoute = getActiveRouteState(navigation.getState());
  let overlayVisible = activeRoute?.state?.routes?.some((screen) => screen["name"] === "SelectLogOption");

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: bgColor,
          justifyContent: 'center',
          alignItems: 'center'
        },
        styles.middleButton
      ]}
      onPress={() => {
        if (inOverlay) {
          navigation.navigate('MiddleButton', { screen: 'Calendar' })
        } else {
          calendarShowing && !overlayVisible
            ? navigation.navigate('MiddleButton', { screen: 'SelectLogOption' })
            : navigation.navigate('MiddleButton', { screen: 'Calendar' })
        }
      }}
    >
      {icon}
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
