import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS, CustomStartButton } from './Welcome';
import { BackButtonContainer } from './PeriodStart';
import { BackButton } from '../home/components/BackButtonComponent';
import Paddy from '../../ios/tppapp/Images.xcassets/icons/paddy.png'

export const UnderlineButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 7}}>
        <Text style={styles.underlineButtonText}>{title}</Text>
    </TouchableOpacity>
)

export default function Success ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>

      <BackButtonContainer>
      <BackButton onPress={() => {navigation.navigate(STACK_SCREENS["Password"])}}/>
      <View style={{width: 320, height: 40}}>
        <Text style={styles.pageTitle}>Registration</Text>
      </View>
      </BackButtonContainer>
      
      <Image source={Paddy} style={{alignSelf: "center"}}></Image>
      <Text style={styles.success}>Success!</Text> 
      <Text style={styles.text}>Email confirmation sent. Click link {'\n'} in email to confirm registration.</Text> 

      <View style={{flexDirection: "row", alignSelf: "center", bottom: "-45%"}}>
        <Text style={styles.smallText}>Didn't get email? </Text> 
        <UnderlineButton title="Resend email"></UnderlineButton>
      </View>
      <View style={{bottom: "-23%"}}>
        <CustomStartButton title="OK" color="#5A9F93" onPress={() => navigation.navigate(STACK_SCREENS["Main Page"])}/>
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
  underlineButtonText: {
    color: "#5A9F93",
    textAlign: 'center', 
    textDecorationLine: 'underline', 
    fontWeight: '800', 
    fontSize: 15, 
    fontFamily: 'Avenir'
  }, 
});