import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import { TabBarMiddleButton } from './src/home/components/TabBarMiddleButton';
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
        <InfoIcon/>
    </View>
);

const SettingsIconStyled = ({tintColor}) => (
  <View style={{top: 3}}>
      <SettingsIcon/>
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
  const navigationRef = useNavigationContainerRef();

  // Requests for notification permissions and also creates a local notification listener
  // Does not handle remote notifications from a server.
  useEffect(() => {

    PushNotificationIOS.addEventListener('localNotification', ((notification) => {
      const isClicked = notification.getData().userInteraction === 1;

      // Write code to do something special if it is clicked
      if (isClicked) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0)
        navigationRef.navigate('MiddleButton', {screen: 'Calendar'})
      }
    }));

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      (data) => {
        console.log('PushNotificationsIOS.requestPermissions', data);
      },
      (data) => {
        console.log('PushNotificationsIOS.requestPermissions failed', data);
      }
    )
    return () => {
      PushNotificationIOS.removeEventListener('localNotification')
    }
  }, [])

  return (
      <NavigationContainer ref={navigationRef} independent={true}>
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
              <TabBarMiddleButton {...props} />
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
