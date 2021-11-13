import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import MNationIcon from '../../ios/tppapp/Images.xcassets/AppIcon.appiconset/1024.png'
import LoadingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-100.png'

export default function LoadingScreen () {
  return (
    <ImageBackground  source={LoadingBackground} style={styles.container}>
        <Image style={styles.appIcon} source={MNationIcon}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }, 
  appIcon: {
    width: 131, 
    height: 131,
    alignSelf: 'center'
  },
});
