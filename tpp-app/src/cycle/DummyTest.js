import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import CycleService from './CycleService';


export default function DummyTest() {
  const [donutPercent, setDonutPercent] = useState(0.0)
  return (
    <View>
      <Text style={{height:50}}>
        BRUH
      </Text>
      <Button
        title="Post Cycle"
        onPress={() => {
          CycleService.PostCycleDonutPercent(donutPercent);
          // setDonutPercent(donutPercent + 0.1);
        }}/>
      <Button
        title="Post average Period length"
        onPress={() => {
          // CycleService.PostCycleDonutPercent(donutPercent);
          CycleService.PostAveragePeriodLength();
        }}/>
      <Button
        title="Post average Cycle length"
        onPress={() => {
          CycleService.PostAverageCycleLength();
        }}/>
      <Button
        title="average Period length"
        onPress={() => {
          CycleService.GetAveragePeriodLength();
        }}
        />
      <Button
        title="average Cycle length"
        onPress={() => {
          CycleService.GetAverageCycleLength();
        }}
        />
      <Button
        title = "Post calendar simple"
        onPress={() => {
          CycleService.PostDummyCalendarSimple();
        }}
        />

    </View>
  )

}
