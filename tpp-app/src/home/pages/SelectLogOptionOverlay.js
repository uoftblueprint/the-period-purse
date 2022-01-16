import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import VectorImage from 'react-native-vector-image';
import { OptionButton } from "../components/LoggingOptionButton";


export default function SelectLogOptionOverlay({ navigation }) {
  return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>

            <OptionButton
              title={"Log daily symptoms"}
              icon={<VectorImage source={require('../../../ios/tppapp/Images.xcassets/icons/red_blood_drop.svg')}/>}
              onPress={() => {
                navigation.goBack(); // dismiss this overlay first
                navigation.navigate('LogSymptoms');
              }}
            />

            <OptionButton
              title={"Log multiple period dates"}
              icon={<VectorImage source={require('../../../ios/tppapp/Images.xcassets/icons/red_calendar.svg')}/>}
              onPress={() => {
                navigation.goBack();
                navigation.navigate('LogMultipleDates');
              }}
            />

          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 45,
    justifyContent: 'center'
  }
});
