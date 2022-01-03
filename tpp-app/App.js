import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './src/info/Info';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import VectorImage from 'react-native-vector-image';
import Welcome from './src/onboarding/Welcome'

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => {
  const calendarShowing = useIsFocused();

  let icon = calendarShowing ? <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/blood_drop.svg')}/> : <VectorImage source={require('./ios/tppapp/Images.xcassets/icons/calendar_icon.svg')} />;
  let bgColor = calendarShowing ? '#D32729' : '#5A9F93';
  const navigation = useNavigation();

  return (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow
        }}
        onPress={() => {
          if (calendarShowing) {
            navigation.navigate('MiddleButton', { screen: 'LogSymptoms' });
          } else {
            navigation.navigate('MiddleButton', { screen: 'Calendar' });
          }
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
        justifyContent: 'center'
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
    <Welcome></Welcome>
    // <MainPage></MainPage>
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
