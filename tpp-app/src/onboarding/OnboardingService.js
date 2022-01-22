import { AsyncStorage } from 'react-native';

const OnboardingService = {
    // All APIs for Onboarding should be here

    PostInitialPeriodLength: async function(periodLength) {
        try {
            const v = await AsyncStorage.setItem('periodLength', periodLength);
            console.log(v);
            return v;
        } catch (e) {
            // There was an error
        }
    }


};

export default OnboardingService;