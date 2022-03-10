import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
import Welcome from '../tpp-app/src/onboarding/Welcome';
import ErrorFallback from './src/error/error-boundary';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
