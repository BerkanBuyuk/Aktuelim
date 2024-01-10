/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import i18n from './src/assets/locales/services/i18next';

AppRegistry.registerComponent(appName, () => App);
