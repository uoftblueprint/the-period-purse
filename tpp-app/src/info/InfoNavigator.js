import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoPage from '../info/Info.js'
import PeriodUnderwearsPage from '../pages/PeriodUnderwearInfo.js'
import PadsPage from '../pages/PadInfo.js'
import MenstrualCupsPage from '../pages/MenstrualCupsInfo.js'
import ClothPadsPage from '../pages/ClothPadsInfo.js'
import TamponsPage from "../pages/TamponInfo.js"
import DYKPage from "../pages/DYKInfo.js"
import MenstrualDiscPage from "../pages/MenstrualDiscInfo.js"
import DidYouKnow from "../pages/DYKInfo";

const Stack = createNativeStackNavigator();

export const STACK_SCREENS = {
    INFO_HOME : "InfoHome",
    PERIOD_UNDERWEARS: "Period Underwears",
    PADS: "Pads",
    CLOTH_PADS: "Cloth Pads",
    MENSTRUAL_CUPS: "Menstrual Cups",
    TAMPONS: "Tampons",
    DISC: "Menstrual Disc",
    FUN_FACT: "Fun Fact"
};

export default function InfoNavigator() {
    return(
        <Stack.Navigator intialRouteName={STACK_SCREENS.INFO_HOME} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={STACK_SCREENS.INFO_HOME} component={InfoPage} />
            <Stack.Screen name={STACK_SCREENS.PERIOD_UNDERWEARS} component={PeriodUnderwearsPage} />
            <Stack.Screen name={STACK_SCREENS.PADS} component={PadsPage} />
            <Stack.Screen name={STACK_SCREENS.CLOTH_PADS} component={ClothPadsPage} />
            <Stack.Screen name={STACK_SCREENS.MENSTRUAL_CUPS} component={MenstrualCupsPage} />
            <Stack.Screen name={STACK_SCREENS.TAMPONS} component={TamponsPage} />
            <Stack.Screen name={STACK_SCREENS.DISC} component={MenstrualDiscPage} />
            <Stack.Screen name={STACK_SCREENS.FUN_FACT} component={DidYouKnow} />
        </Stack.Navigator>
    )
}
