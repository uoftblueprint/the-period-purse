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
      <Button
        title = "Clear Calendar"
        onPress={() => {
          CycleService.ClearCalendar();
        }}/>
      <Button
        title = "get symptoms"
        onPress={() => {
          // months are zero index
          CycleService.getSymptomsForDate(14, 1, 2022).then(data => console.log(data));
        }}/>
      <Button
        title = "get period day"
        onPress={() => {
          CycleService.GetPeriodDay().then(data => console.log(data));
        }}
        />
      <Button
        title="Get most recent period start day"
        onPress={() => {
          CycleService.GetMostRecentPeriodStartDay().then(data => console.log(data));
        }}/>

    </View>
  )

}
