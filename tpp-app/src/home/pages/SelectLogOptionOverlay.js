import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { OptionButton } from "../components/LoggingOptionButton";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TabBarMiddleButton } from '../components/TabBarMiddleButton'
import BloodDrop from '../../../ios/tppapp/Images.xcassets/icons/blood_drop';
import Calendar from '../../../ios/tppapp/Images.xcassets/icons/calendar_icon_multiple_dates';


export default function SelectLogOptionOverlay({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
        <View style={styles.overlay}>
          <View style={[ styles.buttonContainer, { marginBottom: tabBarHeight } ]}>

            <OptionButton
              title={"Log daily symptoms"}
              icon={<BloodDrop/>}
              onPress={() => {
                navigation.goBack(); // dismiss this overlay first
                navigation.navigate('LogSymptoms');
              }}
            />

            <OptionButton
              title={"Log multiple period dates"}
              icon={<Calendar />}
              onPress={() => {
                navigation.goBack();
                navigation.navigate('LogMultipleDates');
              }}
            />

          </View>
          <TabBarMiddleButton
            style={{
              position: 'absolute',
              bottom: tabBarHeight - 40,
              transform: [{ rotate: "45deg" }]
            }}
            inOverlay={true}
          />
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
