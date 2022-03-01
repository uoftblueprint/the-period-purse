import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/watercolor-background.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton, DatePickerButton } from './components/ButtonComponents';
import { TitleText, BodyText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodStart, GetInitialPeriodLength } from '../services/OnboardingService';
import { DatePickerModal } from 'react-native-paper-dates';

export default function PeriodStart ({ navigation }) {
  // const periodLength = GetInitialPeriodLength();
  // console.log(typeof(periodLength));
  // console.log(parseInt(periodLength));
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]);

  const onChange = React.useCallback(
    ({ startDate, endDate }) => {
      setRange({ startDate, endDate });
    },
    [setRange]);


  return (
    <ImageBackground source={OnboardingBackground} style={styles.container}>
      <BackButtonContainer>
        <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Period Length"])}}/>
      </BackButtonContainer>
      <TitleText>
        When did your {'\n'} period last start?
      </TitleText>
      <BodyText>
        Record your last period or {'\n'} skip if you don’t know
      </BodyText>

      <InputContainer>
        <DatePickerButton title="Choose date" onPress={() => setOpen(true)}></DatePickerButton>
      </InputContainer>
      <DatePickerModal
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.startDate ? new Date(range.startDate.getTime() + (5*24*60*60*1000)) : undefined}
        onConfirm={onConfirm}
        onChange={onChange} 
        // validRange={{
          // startDate: new Date(2021, 1, 2),  // optional
          // endDate: new Date(), // optional
          // disabledDates: [new Date()] // optional
        // }}
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
      />

      <TwoButtonContainer>
        <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>
        <NextButton title="Next" onPress={() => 
          {
            PostInitialPeriodStart(new Date(2011, 11, 30));
            navigation.navigate(STACK_SCREENS["Symptoms Choices"]);
          }}/>
      </TwoButtonContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
