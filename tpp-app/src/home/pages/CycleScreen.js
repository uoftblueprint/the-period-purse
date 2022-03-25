
import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import CycleCard from '../components/CycleCard';

export default function CycleScreen (){
  return (
    <CycleCard/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
})
