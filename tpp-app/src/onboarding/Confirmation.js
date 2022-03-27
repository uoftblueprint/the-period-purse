import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { CrossButton } from './components/ButtonComponents';
import { BackButtonContainer, HorizontalLine, SymptomIconContainer } from './components/ContainerComponents';
import PaddyIcon from "../../ios/tppapp/Images.xcassets/icons/paddy.svg";
import FlowIcon from "../../ios/tppapp/Images.xcassets/icons/flow.svg";
import SleepIcon from "../../ios/tppapp/Images.xcassets/icons/sleep.svg";

let onboardingBg = require('../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background-light.png')

export const STACK_SCREENS = {
  GET_STARTED : "Get Started",
  PERIOD_LENGTH : "Period Length",
  PERIOD_START :  "Period Start",
  SYMPTOMS_CHOICES : "Symptoms Choices",
  BACKUP : "Backup",
  MAIN_PAGE : "Main Page",
  REGISTRATION : "Registration",
  PASSWORD : "Password",
  SUCCESS : "Success",
  CONFIRMATION : "Confirmation"
};

export default function Confirmation ({ navigation }) {
  return (
    <ImageBackground source={onboardingBg} style={styles.backgroundImg}>
      <View style={styles.container}>
        <BackButtonContainer>
          <CrossButton onPress={() => {navigation.navigate(STACK_SCREENS.MAIN_PAGE)}}/>
        </BackButtonContainer>

        <PaddyIcon style={{alignSelf: "center"}}/>
        <Text style={styles.bigText}>You're all set!</Text>

        <View style={styles.row}>
          <Text style={styles.smallText}>Average period length</Text>
          <Text style={styles.text}>5 days</Text>
        </View>
        <HorizontalLine></HorizontalLine>

        <View style={styles.row}>
          <Text style={styles.smallText}>Last period</Text>
          <Text style={styles.text}>Nov 1-5, 2021</Text>
        </View>
        <HorizontalLine></HorizontalLine>

        <View style={styles.row}>
          <Text style={styles.smallText}>Symptoms to log</Text>
          <SymptomIconContainer>
              <FlowIcon style={styles.icon}/>
              <SleepIcon style={styles.icon}/>
          </SymptomIconContainer>
        </View>
        <HorizontalLine></HorizontalLine>
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
  bigText: {
    alignSelf: "center",
    fontFamily: "Avenir",
    fontSize: 34,
    fontWeight: "800",
    color: "#000000",
    marginTop: 13,
    marginBottom: 24
  },
  text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    marginTop: 4,
    marginBottom: 15
  },
  smallText: {
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "800",
    color: "#5A9F93",
    marginTop: 20
  },
  row: {
    textAlign: "left",
    marginLeft: 30
  },
  icon: {
    marginRight: 15,
    marginBottom: 15,
    marginTop: 4
  }
});
