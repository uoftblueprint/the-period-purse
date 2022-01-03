import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS, CustomStartButton } from './Welcome';
import { BackButtonContainer } from './PeriodStart';
import { BackButton } from '../home/components/BackButtonComponent';

export default function Password ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>

    <BackButtonContainer>
        <BackButton onPress={() => {navigation.navigate(STACK_SCREENS["Registration"])}}/>
        <View style={{width: 320, height: 40}}>
          <Text style={styles.pageTitle}>Registration</Text>
        </View>
      </BackButtonContainer>

      <View style={styles.labelBorder}>
        <Text style={styles.labelText}>PASSWORD</Text>
        <TextInput style={styles.input} placeholder="At least 6 characters" autoCapitalize="none" secureTextEntry={true}/>
      </View>

      <KeyboardAvoidingView 
        style={{flex: 1}} 
        enabled behavior={ Platform.OS === 'ios'? 'padding': null}
        keyboardVerticalOffset={30}
      >
        <View style={{height: "80%"}}></View>
        <CustomStartButton title="Continue" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Success"])}/>
      </KeyboardAvoidingView>

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  input: {
    fontFamily: "Avenir", 
    fontSize: 14,
    height: 35
  },
  pageTitle: {
    fontFamily: "Avenir", 
    fontSize: 20,
    fontWeight: "800",
    alignSelf: "center",
    color: "#181818",
  }, 
  labelText: {
    fontFamily: "Avenir", 
    fontSize: 12,
    fontWeight: "900",
    color: "#5F5F5F",
  },
  labelBorder: {
    alignSelf: "center",
    width: "90%",
    height: 80,
    borderWidth: 2,
    borderColor: "#5A9F93",
    borderRadius: 10,
    padding: 18, 
    marginTop: 200
  }
});