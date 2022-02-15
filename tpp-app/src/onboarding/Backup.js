import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { WideButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { BackButtonContainer } from './components/ContainerComponents';

export default function Backup ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Symptoms Choices"])}}/>
      </BackButtonContainer>
      <TitleText>
        Would you like to {'\n'} back up your data?
      </TitleText>
      <BodyText>
        Your data will be lost if you {'\n'} switch devices
      </BodyText>

      <View style={{marginTop: 20}}>
        <WideButton title="Register" color="#B31F20" onPress={() => navigation.navigate(STACK_SCREENS["Registration"])}/>
        <WideButton title="Continue as guest" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Confirmation"])}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
