import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Welcome';
import { BackButtonContainer } from './PeriodStart';
import Paddy from '../../ios/tppapp/Images.xcassets/icons/paddy.png'
import Icon from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-elements';

export const CrossButton = ({ onPress, title }) => {
    return (
    <Button icon={<Icon name="cross" size={30} color="#000000"/>}
        titleStyle={styles.backButtonText}
        title={title}
        onPress={onPress}
        type="clear"
    />);
}

export default function Confirmation ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <CrossButton onPress={() => {navigation.navigate(STACK_SCREENS["Main Page"])}}/>
      </BackButtonContainer>
      
      <Image source={Paddy} style={{alignSelf: "center"}}></Image>
      <Text style={styles.success}>You're all set!</Text> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  pageTitle: {
    fontFamily: "Avenir", 
    fontSize: 20,
    fontWeight: "800",
    alignSelf: "center",
    color: "#181818",
  }, 
  success: {
    alignSelf: "center",
    fontFamily: "Avenir", 
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
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
  underlineButtonText: {
    color: "#5A9F93",
    textAlign: 'center', 
    textDecorationLine: 'underline', 
    fontWeight: '800', 
    fontSize: 15, 
    fontFamily: 'Avenir'
  }, 
});