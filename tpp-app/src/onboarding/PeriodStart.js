import React, { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import { STACK_SCREENS } from './Confirmation';
import { BackButton } from '../home/components/BackButtonComponent';
import { NextButton, SkipButton, DatePickerButton } from './components/ButtonComponents';
import { TitleText, BodyText } from './components/TextComponents';
import { TwoButtonContainer, BackButtonContainer, InputContainer } from './components/ContainerComponents';
import { PostInitialPeriodStart, PostInitialPeriodLength } from '../services/OnboardingService';
import { DatePickerModal } from 'react-native-paper-dates';
import BackgroundShape from "../../ios/tppapp/Images.xcassets/icons/background_shape.svg";
import PeriodStartIcon from "../../ios/tppapp/Images.xcassets/icons/last_period_date.svg";
import BarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_bar2.svg";
import CalendarIcon from "../../ios/tppapp/Images.xcassets/icons/onboard_calendar.svg";

const MILLISECPERDAY = 24*60*60*1000;
export default function PeriodStart ({ route, navigation }) {
  const { periodLength } = route.params;
  let newPeriodLength = periodLength; 
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

  function CalendarIconPref() {
    if(range.startDate)
      return (null);
    else
      return (<CalendarIcon style={styles.icon}/>);
  }

  /**
   * Computes the end date based on the period length user entered previously 
   * and the range.startDate that user chose in the date picker modal. 
   * @returns computed end date or today's date, whichever is earlier in time
   */
  function getEndDate() {
    let endDate = new Date(range.startDate.getTime() + ((periodLength-1)*MILLISECPERDAY))
    if(endDate > new Date())  // the calculated endDate goes beyond the current date 
      return new Date()
    else
      return endDate
  }

  /**
   * Returns the date paramater as a string. 
   * @param {Date} date date object to be translated into a string
   * @returns string version of date, formatted as "YYYY-MM-DD"
   */
  function getCustomDateString(date) {
    var month = date.getMonth() + 1  // month starts at 0
    var day = date.getDate()
    return [date.getFullYear(), (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('-') 
  }

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={OnboardingBackground} style={styles.container}>
        <BackButtonContainer>
          <BackButton title="" onPress={() => {navigation.navigate(STACK_SCREENS.PERIOD_LENGTH)}}/>
        </BackButtonContainer>

        <SafeAreaView pointerEvents="box-none" style={{ alignItems: 'center' }}>
          <BackgroundShape style={{ top: 10 }}/>
          <PeriodStartIcon width='130' height='130' style={{ bottom: "38%" }}/>
          <BarIcon style={{ bottom: "30%" }}/>

          <TitleText style={{ bottom: "28%" }}>
            When did your {'\n'} period last start?
          </TitleText>
          <BodyText style={{ bottom: "28%" }}>
            Record your last period or {'\n'} skip if you don’t know
          </BodyText>

          <InputContainer style={{ bottom: "25%" }}>
            <DatePickerButton 
              title={range.startDate ? getCustomDateString(range.startDate) : "Choose date"} 
              onPress={() => setOpen(true)}
              inputted={range.startDate}>
            </DatePickerButton>
            <CalendarIconPref/>
          </InputContainer>
          <DatePickerModal 
            backgroundColor="#000000"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            // calculates endDate if user entered periodLength; asks user to pick endDate manually otherwise
            endDate={periodLength && range.startDate ? getEndDate() : range.endDate}
            onConfirm={onConfirm}
            onChange={onChange}
            validRange={{ endDate: new Date() }}
            saveLabel="Done" 
            uppercase={false}
            label="Select Start Date"
            startLabel="From"
            endLabel="To"
          />
        </SafeAreaView>
 
        <TwoButtonContainer>
          <SkipButton title="Skip" onPress={() => navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES, {
            periodLength: periodLength,
            periodStart: null,
            periodEnd: null
          })}/>
          <NextButton title="Next" onPress={() => 
            {
              if(periodLength == null) {
                // user did not enter periodLength previously but manually selected a complete date range
                newPeriodLength = Math.round((range.endDate.getTime() - range.startDate.getTime()) / MILLISECPERDAY);
                PostInitialPeriodLength(newPeriodLength);
              }
              PostInitialPeriodStart(range.startDate, range.endDate);
              navigation.navigate(STACK_SCREENS.SYMPTOMS_CHOICES, {
                periodLength: newPeriodLength,
                // pass down the custom string version of the dates
                periodStart: getCustomDateString(range.startDate),
                periodEnd: getCustomDateString(range.endDate)
              });
            }}
            disabled={range.endDate && range.startDate ? false : true}/>
        </TwoButtonContainer>
      </ImageBackground>
    </PaperProvider>
  );
}

// styling for the date picker package
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
  },
  icon: {
    alignSelf: 'center',
    left: '30%',
    bottom: '38%'
  }
});