import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-elements';

export const WideButton = ({ onPress, title, color }) => {
    return (
    <TouchableOpacity onPress={onPress} 
      style={{
        alignItems: 'stretch', 
        justifyContent: 'center',
        backgroundColor: color,
        borderRadius: 10,
        width: 330,
        height: 52,
        alignSelf: 'center',
        margin: 10
      }}>
      <Text style={styles.wideButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export const NextButton = ({ onPress, title }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.nextButtonContainer}>
      <Text style={styles.nextButtonText}>{title}</Text>
    </TouchableOpacity>);
}
  
export const SkipButton = ({ onPress, title }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.skipButtonContainer}>
        <Text style={styles.skipButtonText}>{title}</Text>
    </TouchableOpacity>);
}
  
export const CrossButton = ({ onPress }) => {
    return (
    <Button icon={<Icon name="cross" size={30} color="#000000"/>}
        onPress={onPress}
        type="clear"
    />);
}

export const UnderlineButton = ({ onPress, title }) => {
    return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 7 }}>
        <Text style={styles.underlineButtonText}>{title}</Text>
    </TouchableOpacity>);
}

export const DatePickerButton = ({ onPress, title }) => {
  return (
  <TouchableOpacity onPress={onPress} style={{ marginTop: 7 }}>
      <Text style={styles.datePickerButtonText}>{title}</Text>
  </TouchableOpacity>);
}

export const SymptomsChoicesButton = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: color }}>
      <Text style={styles.symptomsChoicesButtonText}>{title}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  wideButtonText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 18, 
    fontWeight: '800' 
  },
  nextButtonContainer: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    backgroundColor: "#5A9F93",
    borderRadius: 10,
    width: 149,
    height: 54,
    bottom: 10
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 15, 
    fontWeight: '800'
  }, 
  skipButtonContainer: {
    alignItems: 'stretch', 
    justifyContent: 'center',
    borderRadius: 10,
    width: 149,
    height: 54,
    bottom: 10
  },
  skipButtonText: {
    color: "#5A9F93", 
    fontSize: 15 
  },
  underlineButtonText: {
    color: "#5A9F93",
    textAlign: 'center', 
    textDecorationLine: 'underline', 
    fontWeight: '800', 
    fontSize: 15, 
    fontFamily: 'Avenir'
  }, 
  datePickerButtonText: {
    color: "#6D6E71", 
    fontFamily: 'Avenir', 
    fontSize: 17, 
    textAlign: 'center', 
    fontWeight: '400',
    marginTop: '7%'
  },
  symptomsChoicesButtonText: {
    color: "#000000",
    fontFamily: "System",
    fontWeight: '600',
    fontSize: 17, 
    marginLeft: 41,
    marginTop: 24,
  }
});