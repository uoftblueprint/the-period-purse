import React from "react";
import { Button, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * Reusable log button component
 */
const LogButton = ({ title, icon, handlePress }) =>{
  return(
    <TouchableOpacity onPress={handlePress}>
        <View>
          {icon}
        </View>
      <Text style={styles.productText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function SelectLogOptionOverlay({ navigation }) {
  return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <Button
              title="Log daily symptoms"
              onPress={() => {
                navigation.goBack(); // dismiss this overlay first
                navigation.navigate('LogSymptoms');
              }}
            />
            <Button
              title="Log multiple period dates"
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
    bottom: 55,
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});
