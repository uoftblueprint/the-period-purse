import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton, DatePickerButton } from './components/ButtonComponents';
import { TitleText, BodyText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodStart, GetInitialPeriodLength } from '../services/OnboardingService';
import { DatePickerModal } from 'react-native-paper-dates';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import PeriodStartIcon from "../../ios/tppapp/Images.xcassets/icons/last_period_date.svg";

let periodLength;
export default function PeriodStart ({ navigation }) {
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

  GetInitialPeriodLength().then((value) => {
    periodLength = value;
  })

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS["Period Length"])}}/>
        </BackButtonContainer>
        
        <BackgroundShape style={{ top: -10, position: 'absolute' }}/>
        {/* <PeriodStartIcon style={{ alignSelf: 'center', top: -10 }}/> */}
        <TitleText>
          When did your {'\n'} period last start?
        </TitleText>
        <BodyText>
          Record your last period or {'\n'} skip if you don’t know
        </BodyText>

        <InputContainer>
          <DatePickerButton 
            title={range.startDate ? range.startDate.toISOString().split('T')[0] : "Choose date"} 
            onPress={() => setOpen(true)}>
          </DatePickerButton>
        </InputContainer>
        <DatePickerModal 
          backgroundColor="#000000"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.startDate ? new Date(range.startDate.getTime() + ((periodLength-1)*24*60*60*1000)) : undefined}
          onConfirm={onConfirm}
          onChange={onChange} 
          validRange={{
            // startDate: new Date(2021, 1, 2),  // optional
            endDate: new Date(new Date().getTime() - ((periodLength-1)*24*60*60*1000)), // optional
            // disabledDates: [new Date()] // optional
          }}
          saveLabel="Done" // optional
          uppercase={false} // optional, default is true
          label="Select Start Date" // optional
          startLabel="From" // optional
          endLabel="To" // optional
          animationType="slide" // optional, default is slide on ios/android and none on web
        />

        <TwoButtonContainer>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS["Symptoms Choices"])}/>
          <NextButton title="Next" onPress={() => 
            {
              PostInitialPeriodStart(range.startDate);
              navigation.navigate(STACK_SCREENS["Symptoms Choices"]);
            }}/>
        </TwoButtonContainer>
      </ImageBackground>
    </PaperProvider>
  );
}

// https://callstack.github.io/react-native-paper/theming.html
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#5A9F93',
  }
};

const fontConfig = {
  default: {
      regular: {
          fontFamily: 'Avenir',
          fontWeight: 'normal',
      },
      medium: {
          fontFamily: 'Avenir',
          fontWeight: 'normal',
      },
      light: {
          fontFamily: 'Avenir',
          fontWeight: 'normal',
      },
      thin: {
          fontFamily: 'Avenir',
          fontWeight: 'normal',
      },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
