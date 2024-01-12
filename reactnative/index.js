/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import i18n from './src/assets/locales/services/i18next';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Aktuelim = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Aktuelim);
