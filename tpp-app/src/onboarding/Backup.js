import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { WideButton } from './components/ButtonComponents';
import { BodyText, TitleText } from './components/TextComponents';
import { BackButtonContainer } from './components/ContainerComponents';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";

export default function Backup ({ navigation }) {
  return (
    <ImageBackground  source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES)}}/>
      </BackButtonContainer>
      <BackgroundShape style={{ top: -10, position: 'absolute' }}/>
      <TitleText style={{ top: 60 }}>
        Would you like to {'\n'} back up your data?
      </TitleText>
      <BodyText style={{ top: 60 }}>
        Your data will be lost if you {'\n'} switch devices
      </BodyText>

      <View style={{ marginTop: 20, top: 60 }}>
        <WideButton title="Register" color="#B31F20" onPress={() => navigation.navigate(STACK_SCREENS.REGISTRATION)}/>
        <WideButton title="Continue as guest" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS.CONFIRMATION)}/>
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
