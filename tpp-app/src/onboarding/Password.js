import React from 'react';
import { StyleSheet, View, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { WideButton } from './components/ButtonComponents';
import { BackButtonContainer, InputBorderContainer, PageTitleContainer } from './components/ContainerComponents';
import { PageTitle, InputLabel } from './components/TextComponents'

export default function Password ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton onPress={() => {navigation.navigate(STACK_SCREENS["Registration"])}}/>
        <PageTitleContainer>
          <PageTitle>Registration</PageTitle>
        </PageTitleContainer>
      </BackButtonContainer>

      <InputBorderContainer>
        <InputLabel>PASSWORD</InputLabel>
        <TextInput style={styles.input} placeholder="At least 6 characters" autoCapitalize="none" secureTextEntry={true}/>
      </InputBorderContainer>

      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled behavior={ Platform.OS === 'ios'? 'padding': null}
        keyboardVerticalOffset={30}>
        <View style={{height: "80%"}}></View>
        <WideButton title="Continue" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Success"])}/>
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
  }
});
