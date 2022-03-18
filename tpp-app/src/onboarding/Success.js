import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { WideButton, UnderlineButton } from './components/ButtonComponents';
import { BackButtonContainer, PageTitleContainer, TextButtonContainer } from './components/ContainerComponents';
import { PageTitle } from './components/TextComponents'
import PaddyIcon from '../../ios/tppapp/Images.xcassets/icons/paddy.svg';

export default function Success ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton onPress={() => {navigation.navigate(STACK_SCREENS.PASSWORD)}}/>
        <PageTitleContainer>
          <PageTitle>Registration</PageTitle>
        </PageTitleContainer>
      </BackButtonContainer>

      <PaddyIcon style={{alignSelf:"center"}}/>
      <Text style={styles.success}>Success!</Text>
      <Text style={styles.text}>Email confirmation sent. Click link {'\n'} in email to confirm registration.</Text>

      <TextButtonContainer>
        <Text style={styles.smallText}>Didn't get email? </Text>
        <UnderlineButton title="Resend email"></UnderlineButton>
      </TextButtonContainer>
      <View style={{ bottom: "-23%" }}>
        <WideButton title="OK" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS.MAIN_PAGE)}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  success: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 24,
    fontWeight: "800",
    color: "#5A9F93",
    marginTop: 35
  },
  text: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
    marginTop: 7
  },
  smallText: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    marginTop: 7
  },
});
