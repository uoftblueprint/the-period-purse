import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import VectorImage from 'react-native-vector-image';

/**
 * Button component for different logging options
 */
const OptionButton = ({ title, icon, onPress }) =>
  (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.iconCircle}>
        {icon}
      </View>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  )

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
                navigation.goBack(); // dismiss this overlay first
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
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 21
  },
  optionText: {
    textAlign: 'center',
    maxWidth: 100,
    marginLeft: 15,
    fontSize: 14
  },
  iconCircle: {
    backgroundColor: '#fff',
    width: 54,
    height: 54,
    borderRadius: 54,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
