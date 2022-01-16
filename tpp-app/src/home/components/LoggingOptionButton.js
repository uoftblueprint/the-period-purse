import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


/**
 * Button component used in SelectLogOptionOverlay for different logging options
 */
export const OptionButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.iconCircle}>
        {icon}
      </View>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
