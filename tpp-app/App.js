import React from 'react';
import { View } from 'react-native';
import VectorImage from 'react-native-vector-image';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfoNavigator from './src/info/InfoNavigator';
import Settings from './src/settings/Settings';
import CalendarNavigator from './src/home/CalendarNavigator';
import { TabBarMiddleButton } from './src/home/components/TabBarMiddleButton';
import Welcome from './src/onboarding/Welcome';


const Tab = createBottomTabNavigator();

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

export function MainPage() {
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator initialRouteName='MiddleButton'>
          <Tab.Screen name="Info" component={InfoNavigator} options={{
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
