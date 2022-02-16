import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import CycleService from './CycleService';
import Testing from './Testing';


export default function DummyTest() {
  const [donutPercent, setDonutPercent] = useState(0.3)
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
          Testing.PostAveragePeriodLength();
        }}/>
      <Button
        title="Post average Cycle length"
        onPress={() => {
          Testing.PostAverageCycleLength();
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
        title = "Post calendar off period today"
        onPress={() => {
          Testing.PostDummyCalendarCalendarOffPeriodToday();
        }}
        />
      <Button
        title = "Post calendar on period today"
        onPress={() => {
          Testing.PostDummyCalendarOnPeriod();
        }}
        />
      <Button
        title = "Clear Calendar"
        onPress={() => {
          Testing.ClearCalendar();
        }}/>
      <Button
        title = "Clear Cycle Donut"
        onPress={() => {
          Testing.ClearCycleDonut();
        }}/>
      <Button
        title = "get symptoms"
        onPress={() => {
          // months are zero index
          let date = new Date()
          CycleService.getSymptomsForDate(date.getDate(), date.getMonth(), date.getFullYear()).then(data => console.log(data));
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

      <Button
        title = "get cycle donut percent"
        onPress={() => {
          CycleService.GetCycleDonutPercent().then(data => console.log(data));
        }}
        />

    </View>
  )

}
