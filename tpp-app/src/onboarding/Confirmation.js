import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/background.png'
import { STACK_SCREENS } from './Welcome';
import { CrossButton } from './components/ButtonComponents';
import { BackButtonContainer, HorizontalLine } from './components/ContainerComponents';
import VectorImage from 'react-native-vector-image';

export default function Confirmation ({ navigation }) {
  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <CrossButton onPress={() => {navigation.navigate(STACK_SCREENS["Main Page"])}}/>
      </BackButtonContainer>
      
      <VectorImage source={require('../../ios/tppapp/Images.xcassets/icons/paddy.svg')} style={{alignSelf: "center"}}/>
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
            <VectorImage source={require('../../ios/tppapp/Images.xcassets/icons/flow.svg')} style={styles.icon}/>
            <VectorImage source={require('../../ios/tppapp/Images.xcassets/icons/sleep.svg')} style={styles.icon}/>
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
  icon: {
    marginRight: 15, 
    marginBottom: 15, 
    marginTop: 4
  }
});