import React, { useState, useRef } from 'react';
import { StyleSheet, ImageBackground, TextInput, Text, SafeAreaView, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer } from './components/ContainerComponents';
import { POSTInitialPeriodLength } from '../services/OnboardingService';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import PeriodLengthIcon from "../../ios/tppapp/Images.xcassets/icons/last_period_length.svg";
import BarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_bar1.svg";
import KeyboardIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_keyboard.svg";
import ErrorFallback from "../error/error-boundary";

export default function PeriodLength ({ navigation }) {
  const [periodLength, setPeriodLength] = useState(null)
  const textInputRef = useRef();

  function KeyboardIconPref() {
    if(periodLength)
      return (<Text style={styles.dayText}>days</Text>);
    else
      return (<KeyboardIcon/>);
  }

  return (
  <ErrorFallback>
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.GET_STARTED)}}/>
        </BackButtonContainer>

        <SafeAreaView pointerEvents="box-none" style={{ alignItems: 'center' }}>
          <BackgroundShape style={{ top: 40 }}/>
          <PeriodLengthIcon width='130' height='130' style={{ bottom: '32%' }}/>
          <BarIcon style={{ bottom: '25%'}}/>

          <TitleText style={{ bottom: '23%' }}>
            How long does your {'\n'} period usually last?
          </TitleText>
          <BodyText style={{ bottom: "23%" }}>
            This will help us make our {'\n'} reminders more accurate
          </BodyText>

          <SafeAreaView style={styles.inputContainer}>
            <TouchableOpacity onPress={() => textInputRef.current.focus()} style={styles.coverContainer}>
              <TextInput
                ref={textInputRef}
                style={[styles.textinput, periodLength ? styles.output : styles.input]}
                placeholder='Tap to input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                placeholderTextColor='#6D6E71'
                keyboardType="number-pad"
                returnKeyType='done'
                onChangeText={(periodLength) => setPeriodLength(periodLength)}
              />
              <View style={styles.rightMargin}><KeyboardIconPref/></View>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>

        <TwoButtonContainer>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.PERIOD_START, { periodLength: null })}/>
          <NextButton title="Next" onPress={() =>
            {
              POSTInitialPeriodLength(parseInt(periodLength));
              navigation.navigate(STACK_SCREENS.PERIOD_START, { periodLength: periodLength });
            }}
            disabled={periodLength && periodLength > 0? false : true}/>
        </TwoButtonContainer>

      </KeyboardAvoidingView>
    </ImageBackground>
  </ErrorFallback>
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
    fontSize: 17,
  },
  dayText: {
    fontFamily: "System",
    fontSize: 18,
    color: "#000000",
  },
  output: {
    fontFamily: "System",
    fontSize: 30,
    fontWeight: '600',
  },
  textinput: {
    borderColor: "transparent",
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    height: "100%",
    textAlign: "center",
    marginRight: 5
  },
  inputContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    width: "50%",
    borderRadius: 10,
    height: "8%",
    bottom: "20%",
  },
  rightMargin: {
    height: 30,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
