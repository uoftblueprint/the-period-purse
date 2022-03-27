import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TextInput, View } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodLength } from '../services/OnboardingService';

let onboardingBg = require('../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background-light.png')

export default function PeriodLength ({ navigation }) {
  const [periodLength, setPeriodLength] = useState(0)
  return (
    <ImageBackground  source={onboardingBg} style={styles.backgroundImg}>
      <View style={styles.container}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.GET_STARTED)}}/>
        </BackButtonContainer>

        <TitleText>
          How long does your {'\n'} period usually last?
        </TitleText>
        <BodyText>
          This will help us make our {'\n'} reminders more accurate
        </BodyText>

        <InputContainer>
          <TextInput style={styles.input} 
          placeholder="Tap to input" 
          keyboardType="number-pad" 
          returnKeyType='done'
          onChangeText={(periodLength) => setPeriodLength(periodLength)}
          />
        </InputContainer>

        <TwoButtonContainer>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.PERIOD_START)}/>
          <NextButton title="Next" onPress={() => 
            {
              PostInitialPeriodLength(parseInt(periodLength));
              navigation.navigate(STACK_SCREENS.PERIOD_START);
            }}/>
        </TwoButtonContainer>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%', 
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  input: {
    fontFamily: "Avenir",
    fontSize: 17,
    height: 22,
    alignSelf: 'center',
    marginTop: '10%',
    color: "#6D6E71"
  }
});
