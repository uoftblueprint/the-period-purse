import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoPage from '../info/Info.js'
import PeriodUnderwearsPage from '../pages/PeriodUnderwearInfo.js'
import PadsPage from '../pages/PadInfo.js'
import MenstrualCupsPage from '../pages/MenstrualCupsInfo.js'
import ClothPadsPage from '../pages/ClothPadsInfo.js'
import TamponsPage from "../pages/TamponInfo.js"

const Stack = createNativeStackNavigator();

export default function InfoNavigator() {
    return(
        <Stack.Navigator intialRouteName="InfoHome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"InfoHome"} component={InfoPage} />
            <Stack.Screen name={"Period Underwears"} component={PeriodUnderwearsPage} />
            <Stack.Screen name={"Pads"} component={PadsPage} />
            <Stack.Screen name={"Cloth Pads"} component={ClothPadsPage} />
            <Stack.Screen name={"Menstrual Cups"} component={MenstrualCupsPage} />
            <Stack.Screen name={"Tampons"} component={TamponsPage} />
        </Stack.Navigator>
    )
}
