import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Welcome';
import { BackButtonContainer } from './PeriodStart';
import Paddy from '../../ios/tppapp/Images.xcassets/icons/paddy.png'
import Icon from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-elements';
import FlowIcon from '../../ios/tppapp/Images.xcassets/icons/flow.png'
import SleepIcon from '../../ios/tppapp/Images.xcassets/icons/sleep.png'

export const CrossButton = ({ onPress, title }) => {
  return (
  <Button icon={<Icon name="cross" size={30} color="#000000"/>}
      titleStyle={styles.backButtonText}
      title={title}
      onPress={onPress}
      type="clear"
  />);
}

export const HorizontalLine = () => {
  return (
    <View
    style={{
      borderBottomColor: "#CFCFCF",
      borderBottomWidth: 1,
    }}
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

      <View style={styles.table}>
        <Text style={styles.smallText}>Average period length</Text>
        <Text style={styles.text}>5 days</Text>
      </View>

      <HorizontalLine></HorizontalLine>

      <View style={styles.table}>
        <Text style={styles.smallText}>Last period</Text>
        <Text style={styles.text}>Nov 1-5, 2021</Text>
      </View>

      <HorizontalLine></HorizontalLine>

      <View style={styles.table}>
        <Text style={styles.smallText}>Symptoms to log</Text>
        <View style={{
          marginTop: 4,
          flexDirection: "row"
        }}>
          <Image source={FlowIcon} style={{marginRight: 15, marginBottom: 15, marginTop: 4}}></Image>
          <Image source={SleepIcon} style={{marginRight: 15, marginBottom: 15, marginTop: 4}}></Image>
        </View>
      </View>

      <HorizontalLine></HorizontalLine>
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
  table: {
    textAlign: "left",
    marginLeft: 30
  },
});